const models = require('../models');
const { Op } = require('sequelize');


const yearDateCalendarApi = (req, res) => {
    const userid = req.headers.userid;
    const year = req.params.year;
    const month = req.params.month;

    models.Scrapped.findAll({
        where: {
            userid: userid
        }
    })
    .then(findAllData => {
        if (findAllData) {
            const ids = findAllData.map(item => ({
                scholarship_id: item.scholarship_id,
                status: item.status
            }));

            const promises = ids.map(element => {
                return models.Scholarship.findOne({
                    where: {
                        id: element.scholarship_id
                    }
                })
                .then(findOneData => {
                    if (findOneData) {
                        endDate = findOneData.end_date;
                        const dateArray = endDate.split("-");
                        const scholarshipYear = parseInt(dateArray[0]);
                        const scholarshipMonth = parseInt(dateArray[1]);
                        const scholarshipDay = parseInt(dateArray[2]);

                        const currentDate = new Date();
                        if (scholarshipYear == parseInt(year) && scholarshipMonth == parseInt(month)) {
                            const diffInMilliseconds = new Date(year, month - 1, scholarshipDay) - currentDate;
                            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

                            if (diffInDays < 0) {
                                findOneData.d_day = `D+${Math.abs(diffInDays) - 1}`;
                            } else if (diffInDays > 0) {
                                findOneData.d_day = `D-${diffInDays + 1}`;
                            } else {
                                findOneData.d_day = `D-day`;
                            }
                            console.log(element.status);
                            findOneData.status = element.status;
                            return findOneData; // 수정된 부분
                        }
                    }
                });
            });

            Promise.all(promises)
            .then(result => {
                // result는 배열 형태로 각 findOneData의 결과를 담고 있습니다.
                // 필요한 처리를 해주세요.
                const filteredResult = result.filter(item => item !== undefined);
                res.json(filteredResult); // 필터링된 결과를 반환
            })
            .catch(err => {
                console.error("Error processing scholarships:", err);
                res.status(500).json({ error: "Internal server error" });
            });
        } else {
            res.json([]);
        }
    })
    .catch(err => {
        console.error("Error fetching scrapped data:", err);
        res.status(500).json({ error: "Internal server error" });
    });
};



const yearDateDayCalendarApi = (req, res) => {
    const userid = req.headers.userid;
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;

    models.Scrapped.findAll({
        where: {
            userid: userid
        }
    })
    .then(findAllData => {
        if (findAllData) {
            const ids = findAllData.map(item => ({
                scholarship_id: item.scholarship_id,
                status: item.status
            }));

            const promises = ids.map(element => {
                return models.Scholarship.findOne({
                    where: {
                        id: element.scholarship_id
                    }
                })
                .then(findOneData => {
                    if (findOneData) {
                        endDate = findOneData.end_date;
                        const dateArray = endDate.split("-");
                        const scholarshipYear = parseInt(dateArray[0]);
                        const scholarshipMonth = parseInt(dateArray[1]);
                        const scholarshipDay = parseInt(dateArray[2]);

                        const currentDate = new Date();
                        if (scholarshipYear == parseInt(year) && scholarshipMonth == parseInt(month) && scholarshipDay == parseInt(day)) {
                            const diffInMilliseconds = new Date(year, month - 1, scholarshipDay) - currentDate;
                            const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

                            if (diffInDays < 0) {
                                findOneData.d_day = `D+${Math.abs(diffInDays) - 1}`;
                            } else if (diffInDays > 0) {
                                findOneData.d_day = `D-${diffInDays + 1}`;
                            } else {
                                findOneData.d_day = `D-day`;
                            }
                            console.log(element.status);
                            findOneData.status = element.status;
                            return findOneData; // 수정된 부분
                        }
                    }
                });
            });

            Promise.all(promises)
            .then(result => {
                // result는 배열 형태로 각 findOneData의 결과를 담고 있습니다.
                // 필요한 처리를 해주세요.
                const filteredResult = result.filter(item => item !== undefined);
                res.json(filteredResult); // 필터링된 결과를 반환
            })
            .catch(err => {
                console.error("Error processing scholarships:", err);
                res.status(500).json({ error: "Internal server error" });
            });
        } else {
            res.json([]);
        }
    })
    .catch(err => {
        console.error("Error fetching scrapped data:", err);
        res.status(500).json({ error: "Internal server error" });
    });
};

const countDayCalendarApi = (req, res) => {
    const userid = req.headers.userid;
    const year = req.params.year;
    const month = req.params.month;

    console.log(userid);

    models.Scrapped.findAll({
        where: {
            userid: userid
        }
    })
    .then(findAllData => {
        if (findAllData) {
            const ids = findAllData.map(item => ({
                scholarship_id: item.scholarship_id,
                status: item.status
            }));

            const promises = ids.map(element => {
                return models.Scholarship.findOne({
                    where: {
                        id: element.scholarship_id
                    }
                })
                .then(findOneData => {
                    if (findOneData) {
                        endDate = findOneData.end_date;
                        const dateArray = endDate.split("-");
                        const scholarshipYear = parseInt(dateArray[0]);
                        const scholarshipMonth = parseInt(dateArray[1]);
                        if (scholarshipYear == parseInt(year) && scholarshipMonth == parseInt(month)) {
                            return findOneData.end_date; // 수정된 부분
                        }
                    }
                });
            });

            Promise.all(promises)
            .then(result => {
                // result는 배열 형태로 각 findOneData의 결과를 담고 있습니다.
                // 필요한 처리를 해주세요.
                const filteredResult = result.filter(item => item !== undefined);
                res.json(filteredResult); // 필터링된 결과를 반환
            })
            .catch(err => {
                console.error("Error processing scholarships:", err);
                res.status(500).json({ error: "Internal server error" });
            });
        } else {
            res.json({message : "none"});
        }
    })
    .catch(err => {
        console.error("Error fetching scrapped data:", err);
        res.status(500).json({ error: "Internal server error" });
    });
}

module.exports = { yearDateCalendarApi, yearDateDayCalendarApi, countDayCalendarApi }