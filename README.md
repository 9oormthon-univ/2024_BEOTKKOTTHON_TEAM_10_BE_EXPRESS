# 🎓 CEN – 맞춤형 장학금 정보 제공 앱 (Express 백엔드)

> 소득분위·거주지·전공 기반 장학금 자동 추천 + D-day 알림 서비스의 Node.js API 서버

[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-Sequelize-blue)](https://sequelize.org)
[![PM2](https://img.shields.io/badge/PM2-Process%20Manager-brightgreen)](https://pm2.keymetrics.io)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

---

## 📌 프로젝트 소개

주변 학생들이 조건에 맞는 장학금 공고를 놓치는 경우를 자주 목격했습니다.
정보는 존재하지만 접근이 불편하고, 마감일을 인지하지 못해 혜택을 받지 못하는 경우가 많았습니다.

**CEN**은 학생 개인 정보(소득분위·거주지·전공·학점)를 기반으로 맞춤 장학금을 자동 추천하고,
마감 D-day를 앱 푸시로 알려주는 원스톱 장학금 정보 서비스입니다.

```
공공데이터 API → 장학금 DB 적재 → 사용자 조건 필터링 → 맞춤 추천 + 푸시 알림
```

> **2024 벚꽃톤 해커톤** 출품작 (팀원 6인 / Backend Developer 역할)

---

## ✨ 주요 기능

### 🔐 사용자 인증
- **회원가입 / 로그인** — bcrypt 해시 비밀번호 + JWT Access Token (7일 유효)
- **비밀번호 변경** — 이름 + 아이디 검증 후 재발급
- **JWT 미들웨어** — 모든 인증 필요 API에서 토큰 검증

### 🎯 온보딩 & 맞춤 추천
- 최초 로그인 시 소득분위·학점·거주지·전공 입력 (온보딩)
- 온보딩 완료 여부 체크 API 제공
- 해시태그(조건 필터) 조회 API

### 📅 장학금 캘린더
- 스크랩한 장학금의 마감일을 **월별 / 일별** 캘린더로 조회
- **D-day 자동 계산** (D-1, D-day, D+1 형식)
- 신청 상태(status) 함께 반환

### 🔔 iOS 푸시 알림 (APN)
- 10초마다 새 장학금 공고 감지
- 신규 공고 등록 시 등록된 모든 iOS 디바이스에 푸시 발송
- Apple Push Notification 서비스(APN) 연동

### 🔀 API Gateway (Spring Boot 프록시)
- Express + Spring Boot 혼재 환경에서 **인증 단일화**
- JWT 검증 후 Spring 백엔드로 요청 프록시
- 인증 복잡도를 Express Gateway에서 통합 처리

---

## 🏗️ 시스템 아키텍처

```
[iOS 앱 (Swift)]
       │
       ▼
[Express.js API Gateway :8001]
  ├── JWT 인증 미들웨어
  ├── 직접 처리 (User, Calendar, Scholarship)
  │       │
  │       ▼
  │   [MySQL DB]
  │   ├── users
  │   ├── scholarships
  │   ├── saves (스크랩)
  │   └── Userdevice (푸시 토큰)
  │
  └── 프록시 (Spring Boot :?)
          │
          ▼
      [Spring Boot API]
      (장학금 추천 로직, 상태관리 등)

[node-cron / setInterval]
  └── 10초마다 신규 장학금 감지 → APN 푸시
```

**핵심 설계 결정 — API Gateway 패턴:**
Express와 Spring Boot가 함께 사용되는 환경에서,
모든 요청을 Express가 먼저 받아 JWT를 검증한 뒤 Spring으로 프록시합니다.
→ 인증 로직 중복 제거, 개발 복잡도 감소, 배포 구조 명확화

---

## 🛠️ 기술 스택

| 분류 | 기술 |
|------|------|
| **Runtime** | Node.js |
| **Framework** | Express.js 4.18 |
| **Auth** | JWT (jsonwebtoken), bcrypt |
| **DB** | MySQL + Sequelize ORM |
| **Push** | Apple APNs (apn 라이브러리) |
| **Proxy** | express-http-proxy, http-proxy-middleware |
| **Scheduler** | node-cron, setInterval |
| **Process** | PM2 (프로세스 관리) |
| **Dev** | nodemon |

---

## 📁 프로젝트 구조

```
.
├── server.js                    # 진입점 (Express 앱 설정 + 푸시 스케줄러)
├── routes/
│   ├── user.js                  # 회원가입/로그인/온보딩/디바이스토큰
│   ├── scholarship.js           # 장학금 데이터 적재
│   ├── calendar.js              # 월별·일별 캘린더 조회
│   ├── count.js                 # 월별 마감일 카운트
│   └── proxy.js                 # Spring Boot 프록시 라우터
├── controller/
│   ├── user.js                  # 사용자 CRUD + JWT 발급
│   ├── scholarship.js           # 장학금 DB 생성
│   └── calendar.js              # 캘린더 로직 + D-day 계산
├── middleware/
│   └── auth.js                  # JWT verifyToken 미들웨어
├── proxy/
│   └── proxy.js                 # Spring 백엔드 프록시 함수
├── services/
│   └── notification.js          # APN 푸시 알림 서비스
├── models/
│   ├── user.js
│   ├── scholarship.js
│   ├── scrapped.js              # 스크랩 (saves 테이블)
│   ├── userdevice.js            # iOS 디바이스 토큰
│   └── count.js                 # 장학금 카운트 (신규 감지용)
├── migrations/                  # Sequelize 마이그레이션
└── config/
    └── config.json              # DB 연결 설정
```


---

## 🗄️ DB 스키마

```
users
├── userid (PK, STRING)
├── password (STRING, bcrypt 해시)
├── name (STRING)
├── ranking (STRING)        ← 소득분위
├── grade (STRING)          ← 학점
├── region_city_province (STRING)
├── region_city_country_district (STRING)
├── major (STRING)
└── onboard (BOOLEAN)

scholarships (scholarships 테이블)
├── id (PK, AUTO_INCREMENT)
├── title, provider
├── start_date, end_date
├── amount, amount2
├── support_ranking, support_grade, support_major
├── support_city_province
├── support_target, support_target2, support_target3
├── description ~ description4
├── required_documents
└── site

saves  (스크랩 = Scrapped 모델)
├── userid (STRING)
├── scholarship_id (INTEGER)
└── status (STRING)

Userdevice
├── userid (PK, STRING)
└── devicetoken (STRING)

CountScholarship  (Count 모델 — 신규 장학금 감지용)
├── id (PK, AUTO_INCREMENT)
└── count (INTEGER)
```

---

## 🔔 푸시 알림 동작 방식

```
[server.js] setInterval(sendPushNotification, 10 * 1000)
                │
                ▼
[services/notification.js]
  1. DB에서 전체 장학금 수(scholarships.length) 조회
  2. CountScholarship 테이블의 마지막 count와 비교
  3. 신규 장학금 있으면 → count 업데이트
  4. Userdevice 테이블에서 모든 iOS 디바이스 토큰 조회
  5. 각 사용자에게 APN 푸시 발송
     → "{name}님 새로운 공고가 올라왔습니다."
```

**APN 설정값 (`.env` 필요):**
- `APN_KEY_PATH` — Apple에서 발급한 `.p8` 키 파일 경로
- `APN_KEY_ID` — Key ID (10자리)
- `APN_TEAM_ID` — Apple Developer Team ID
- `APN_TOPIC` — 앱 Bundle ID (예: `com.yourcompany.CenApp`)

---

## 🔄 JWT 인증 흐름

```
클라이언트                    Express 서버
    │                             │
    │── POST /user/login ────────▶│
    │                             │ bcrypt.compare(password, hash)
    │                             │ jwt.sign({ name, userid }, SECRET, { expiresIn: '7d' })
    │◀── { accesstoken } ─────────│
    │                             │
    │── GET /user/hashtag ────────▶│
    │   Header: accesstoken: xxx  │ jwt.verify(token, SECRET)
    │                             │ → decoded.userid → req.headers.userid
    │◀── { ranking, grade, ... } ─│
```

---

## 🛠️ 트러블슈팅 — API Gateway 패턴으로 인증 복잡도 해결

### 문제
Express.js와 Spring Boot를 동시에 사용하는 팀 구성에서 **각 서버가 독립적으로 JWT 인증을 처리**해야 하는 상황이 발생했습니다.
→ 인증 로직 중복, 코드 복잡도 증가, 토큰 불일치 오류 빈발

### 원인
서로 다른 기술 스택(Node.js vs Java)에서 JWT 발급·검증 로직을 각자 구현하다 보니 표준이 달라졌습니다.

### 해결
**Express를 API Gateway로 지정**, 모든 요청을 Express가 먼저 수신하여 JWT를 검증한 후 Spring으로 프록시하는 구조를 채택했습니다.

```
Before:
  클라이언트 → Express (JWT 검증) → Express API
  클라이언트 → Spring (JWT 검증) → Spring API

After:
  클라이언트 → Express (JWT 검증 1회) → Express API
                                      → Spring API (프록시)
```

### 결과
- 인증 로직 **단일화** → 중복 코드 제거
- JWT 관련 오류 감소
- 배포 구조 명확화 → 팀 개발 속도 향상

---

## 👨‍💻 개발자

| | |
|---|---|
| **이름** | 장성원 |
| **이메일** | jjang6251@gmail.com |
| **GitHub** | [github.com/jjang6251](https://github.com/jjang6251) |
| **기간** | 2024.03 (해커톤) |
| **역할** | Backend Developer (6인 팀) |

**담당 구현:**
- `middleware/auth.js` — JWT Access/Refresh Token 설계 및 미들웨어
- `proxy/proxy.js` + `routes/proxy.js` — API Gateway 패턴 구현
- `services/notification.js` — APN 푸시 알림 서비스
- DB 스키마 설계 및 Sequelize 마이그레이션
- GCP 인프라 구성 및 배포

---

## 📄 라이선스

ISC License