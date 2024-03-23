const models = require('../models');
const scholarship = require('../models/scholarship');

const createScholarshipApi = (req, res) => {
    const receivedData = req.body;
    const promises = [];

    for (let i = 0; i < receivedData.length; i++) {
        const currentArray = receivedData[i];

        promises.push(models.Scholarship.create({
            provider: currentArray.provider,
            title: currentArray.title,
            support_ranking: currentArray.support_ranking,
            support_grade: currentArray.support_grade,
            support_major: currentArray.support_major,
            support_city_province: currentArray.support_city_province,
            amount: currentArray.amount,
            start_date: currentArray.start_date,
            end_date: currentArray.end_date,
            support_target: currentArray.support_target,
            support_target2: currentArray.support_target2,
            support_target3: currentArray.support_target3,
            amount2: currentArray.amount2,
            required_documents: currentArray.required_documents,
            description: currentArray.description,
            description2: currentArray.description2,
            description3: currentArray.description3,
            description4: currentArray.description4,
            site: currentArray.site
        }));
    }

    Promise.all(promises)
        .then(() => {
            res.json({ message: "success" });
        })
        .catch(error => {
            console.error("Error creating scholarships:", error);
            res.status(500).json({ message: "An error occurred while creating scholarships" });
        });
};



module.exports = { createScholarshipApi }