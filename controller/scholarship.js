const models = require('../models');

const createScholarshipApi = async (req, res) => {
  try {
    const receivedData = req.body;
    await Promise.all(
      receivedData.map((item) =>
        models.Scholarship.create({
          provider: item.provider,
          title: item.title,
          support_ranking: item.support_ranking,
          support_grade: item.support_grade,
          support_major: item.support_major,
          support_city_province: item.support_city_province,
          amount: item.amount,
          start_date: item.start_date,
          end_date: item.end_date,
          support_target: item.support_target,
          support_target2: item.support_target2,
          support_target3: item.support_target3,
          amount2: item.amount2,
          required_documents: item.required_documents,
          description: item.description,
          description2: item.description2,
          description3: item.description3,
          description4: item.description4,
          site: item.site,
        })
      )
    );
    res.json({ message: 'success' });
  } catch (error) {
    console.error('Error creating scholarships:', error);
    res.status(500).json({ message: 'An error occurred while creating scholarships' });
  }
};

module.exports = { createScholarshipApi };
