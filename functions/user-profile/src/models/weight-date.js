const { getConnection } = require('../utils/database');

const WeightDate = function (weightDate) {
  this.id = weightDate.id;
  this.weight = weightDate.weight;
  this.dateTime = weightDate.dateTime;
  this.userProfileId = weightDate.userProfileId;
};

WeightDate.getAllByUserProfileId = async (userProfileId) => {
  let conn;
  try {
    conn = await getConnection();

    // create a new query
    const query = `SELECT 
                    id,
                    weight,
                    date_time AS dateTime,
                    user_profile_id AS userProfileId
                  FROM weight_date
                  WHERE user_profile_id = ?;`;

    const rows = await conn.query(query, [userProfileId]);

    return rows;
  } finally {
    if (conn) await conn.release();
  }
};

WeightDate.create = async (newWeightDate) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `INSERT INTO weight_date(weight, date_time, user_profile_id)
                        value (?,?,?); `;

    const res = await conn.query(query, [newWeightDate.weight, newWeightDate.dateTime, newWeightDate.userProfileId]);

    const weightDateQuery = `SELECT id,
                          weight,
                          date_time,
                          user_profile_id
                   FROM weight_date
                   WHERE id = ?;`;

    const rows = await conn.query(weightDateQuery, res.insertId);
    const [weightDate] = rows;
    return weightDate;
  } finally {
    if (conn) await conn.release();
  }
};

WeightDate.update = async (updatedWeightDate) => {
  let conn;

  try {
    conn = await getConnection();
    const query = `UPDATE weight_date
                    SET
                      weight = ?,
                      date_time = ?
                    WHERE id = ?;`;

    await conn.query(query, [updatedWeightDate.weight, updatedWeightDate.dateTime, updatedUserProfile.id]);

    return updatedUserProfile;
  } finally {
    if (conn) await conn.release();
  }
};

WeightDate.delete = async (id) => {
  let conn;
  try {
    conn = await getConnection();

    return await conn.query(`DELETE FROM weight_date WHERE id = ?;`, id);
  } finally {
    if (conn) await conn.release();
  }
};

module.exports = WeightDate;
