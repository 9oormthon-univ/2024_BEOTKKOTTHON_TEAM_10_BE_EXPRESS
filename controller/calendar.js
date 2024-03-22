const models = require('../models');
const scholarship = require('../models/scholarship');
const { Op } = require('sequelize');

const yearDateCalendarApi = (req, res) => {
    const userid = req.headers.userid;
    const year = req.params.year;
    const month = req.params.month;

    models.Scrapped.findAll({
        where: {
            user_id: userid
        }
    })
        .then(findAllData => {
            if (findAllData) {
                const ids = findAllData.map(item => item.scholarship_id);

                models.Scholarship.findAll({
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                })
                    .then(findScAllData => {
                        if (findScAllData) {
                            const findCalendar = findScAllData.filter(scholarship => {
                                const endDate = scholarship.end_date;
                                if (endDate) {
                                    const dateArray = endDate.split(".");
                                    const scholarshipYear = parseInt(dateArray[0]);
                                    const scholarshipMonth = parseInt(dateArray[1]);
                                    const scholarshipDay = parseInt(dateArray[2]);

                                    const currentDate = new Date(); // 현재 서버의 날짜와 시간을 가져옴
                                    const currentYear = currentDate.getFullYear();
                                    const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
                                    const currentDay = currentDate.getDate();


                                    if (scholarshipYear === parseInt(year) && scholarshipMonth === parseInt(month)) {
                                        // 현재 년, 월과 일치하는 경우에만 비교하여 d_day 필드를 추가함
                                        const diffInMilliseconds = new Date(year, month - 1, scholarshipDay) - currentDate;
                                        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 밀리초를 일로 변환

                                        if (diffInDays < 0) {
                                            scholarship.d_day = `D+${Math.abs(diffInDays) - 1}`;
                                        } else if (diffInDays > 0) {
                                            scholarship.d_day = `D-${diffInDays + 1}`;
                                        } else {
                                            scholarship.d_day = `D-day`;
                                        }
                                        return true;
                                    } else {
                                        return false; // 현재 년, 월과 일치하지 않는 경우 해당 스칼라쉽은 필터링하지 않음
                                    }
                                } else {
                                    return false; // end_date가 없는 경우 해당 스칼라쉽은 필터링하지 않음
                                }

                            });
                            if(findCalendar.length === 0){
                                return res.status(404).json({message : "No Announcement"}) //날짜에 해당하는 공고 없음
                            } else {
                                return res.json(findCalendar);
                            }
                        } else {
                            res.json({ message: "Unscrapped" });
                        }

                    });

            } else {
                return res.status(404).json({ message: "Unscrapped" });
            }

        })
};

const yearDateDayCalendarApi = (req, res) => {
    const userid = req.headers.userid;
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    console.log(userid);

    models.Scrapped.findAll({
        where: {
            user_id: userid
        }
    })
        .then(findAllData => {
            if (findAllData) {
                const ids = findAllData.map(item => item.scholarship_id);

                models.Scholarship.findAll({
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                })
                    .then(findScAllData => {
                        if (findScAllData) {
                            const findCalendar = findScAllData.filter(scholarship => {
                                const endDate = scholarship.end_date;
                                if (endDate) {
                                    const dateArray = endDate.split(".");
                                    const scholarshipYear = parseInt(dateArray[0]);
                                    const scholarshipMonth = parseInt(dateArray[1]);
                                    const scholarshipDay = parseInt(dateArray[2]);

                                    const currentDate = new Date(); // 현재 서버의 날짜와 시간을 가져옴
                                    const currentYear = currentDate.getFullYear();
                                    const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
                                    const currentDay = currentDate.getDate();


                                    if (scholarshipYear === parseInt(year) && scholarshipMonth === parseInt(month) && scholarshipDay === parseInt(day)) {
                                        // 현재 년, 월과 일치하는 경우에만 비교하여 d_day 필드를 추가함
                                        const diffInMilliseconds = new Date(year, month - 1, scholarshipDay) - currentDate;
                                        const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)); // 밀리초를 일로 변환

                                        if (diffInDays < 0) {
                                            scholarship.d_day = `D+${Math.abs(diffInDays) - 1}`;
                                        } else if (diffInDays > 0) {
                                            scholarship.d_day = `D-${diffInDays + 1}`;
                                        } else {
                                            scholarship.d_day = `D-day`;
                                        }
                                        return true;
                                    } else {
                                        return false; // 현재 년, 월과 일치하지 않는 경우 해당 스칼라쉽은 필터링하지 않음
                                    }
                                } else {
                                    return false; // end_date가 없는 경우 해당 스칼라쉽은 필터링하지 않음
                                }

                            });
                            if(findCalendar.length === 0){
                                return res.json({message : "No Announcement"}) //날짜에 해당하는 공고 없음
                            } else {
                                return res.json(findCalendar);
                            }
                        } else {
                            res.json({ message: "Unscrapped" });
                        }

                    });

            } else {
                return res.json({ message: "Unscrapped" }); //scrapp 안함
            }

        })

}

module.exports = { yearDateCalendarApi, yearDateDayCalendarApi }