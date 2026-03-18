const models = require('../models');

function parseDateParts(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month, day };
}

function calculateDDay(year, month, day) {
  const currentDate = new Date();
  const diffMs = new Date(year, month - 1, day) - currentDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return `D+${Math.abs(diffDays) - 1}`;
  if (diffDays > 0) return `D-${diffDays + 1}`;
  return 'D-day';
}

async function getScrappedScholarships(userid) {
  const scrapped = await models.Scrapped.findAll({ where: { userid } });
  if (scrapped.length === 0) return [];

  const ids = scrapped.map((s) => s.scholarship_id);
  const scholarships = await models.Scholarship.findAll({ where: { id: ids } });
  const scholarshipMap = new Map(scholarships.map((s) => [s.id, s]));

  return scrapped
    .map((item) => {
      const scholarship = scholarshipMap.get(item.scholarship_id);
      return scholarship ? { scholarship, status: item.status } : null;
    })
    .filter(Boolean);
}

const yearDateCalendarApi = async (req, res) => {
  try {
    const { userid } = req.headers;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const entries = await getScrappedScholarships(userid);
    const result = entries
      .filter(({ scholarship }) => {
        const { year: y, month: m } = parseDateParts(scholarship.end_date);
        return y === year && m === month;
      })
      .map(({ scholarship, status }) => {
        const { day } = parseDateParts(scholarship.end_date);
        scholarship.d_day = calculateDDay(year, month, day);
        scholarship.status = status;
        return scholarship;
      });

    res.json(result);
  } catch (err) {
    console.error('Error in yearDateCalendarApi:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const yearDateDayCalendarApi = async (req, res) => {
  try {
    const { userid } = req.headers;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);
    const day = parseInt(req.params.day);

    const entries = await getScrappedScholarships(userid);
    const result = entries
      .filter(({ scholarship }) => {
        const { year: y, month: m, day: d } = parseDateParts(scholarship.end_date);
        return y === year && m === month && d === day;
      })
      .map(({ scholarship, status }) => {
        scholarship.d_day = calculateDDay(year, month, day);
        scholarship.status = status;
        return scholarship;
      });

    res.json(result);
  } catch (err) {
    console.error('Error in yearDateDayCalendarApi:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const countDayCalendarApi = async (req, res) => {
  try {
    const { userid } = req.headers;
    const year = parseInt(req.params.year);
    const month = parseInt(req.params.month);

    const entries = await getScrappedScholarships(userid);
    const result = entries
      .filter(({ scholarship }) => {
        const { year: y, month: m } = parseDateParts(scholarship.end_date);
        return y === year && m === month;
      })
      .map(({ scholarship }) => scholarship.end_date);

    res.json(result);
  } catch (err) {
    console.error('Error in countDayCalendarApi:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { yearDateCalendarApi, yearDateDayCalendarApi, countDayCalendarApi };
