const { getConnection } = require('../utils/database');

const UserProfile = function (userProfile) {
  this.id = userProfile.id;
  this.userName = userProfile.userName;
  this.age = userProfile.age;
  this.gender = userProfile.gender;
  this.height = userProfile.height;
  this.uuid = userProfile.uuid;
};

UserProfile.getAll = async () => {
  let conn;
  try {
    conn = await getConnection();

    // create a new query
    const query = `SELECT 
                    id,
                    user_name AS userName,
                    age,
                    gender,
                    height,
                    uuid
                  FROM user_profile;`;

    const rows = await conn.query(query);

    return rows;
  } finally {
    if (conn) await conn.release();
  }
};

UserProfile.findByUuid = async (uuid) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `SELECT
                    id,
                    user_name AS userName,
                    age,
                    gender,
                    height,
                    uuid
                  FROM user_profile
                  WHERE uuid = ?;`;

    const rows = await conn.query(query, [uuid]);
    const [userProfile] = rows;
    return userProfile;
  } finally {
    if (conn) await conn.release();
  }
};

UserProfile.findById = async (id) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `SELECT
                    id,
                    user_name AS userName,
                    age,
                    gender,
                    height,
                    uuid
                  FROM user_profile
                  WHERE id = ?;`;

    const rows = await conn.query(query, [id]);
    const [userProfile] = rows;
    return userProfile;
  } finally {
    if (conn) await conn.release();
  }
};

UserProfile.create = async (newUserProfile) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `INSERT INTO user_profile(user_name, age, gender, height, uuid)
                        value (?,?,?,?,?); `;

    const res = await conn.query(query, [
      newUserProfile.userName,
      newUserProfile.age,
      newUserProfile.gender,
      newUserProfile.height,
      newUserProfile.uuid,
    ]);

    const userProfileQuery = `SELECT id,
                          user_name AS userName,
                          age,
                          gender,
                          height,
                          uuid
                   FROM user_profile
                   WHERE id = ?;`;

    const rows = await conn.query(userProfileQuery, res.insertId);
    const [userProfile] = rows;
    return userProfile;
  } finally {
    if (conn) await conn.release();
  }
};

UserProfile.updateByUuid = async (updatedUserProfile) => {
  let conn;

  try {
    conn = await getConnection();
    const query = `UPDATE user_profile
                    SET
                      user_name = ?,
                      age = ?,
                      gender = ?,
                      height = ?
                    WHERE uuid = ?;`;

    await conn.query(query, [
      updatedUserProfile.userName,
      updatedUserProfile.age,
      updatedUserProfile.gender,
      updatedUserProfile.height,
      updatedUserProfile.uuid,
    ]);

    return updatedUserProfile;
  } finally {
    if (conn) await conn.release();
  }
};

module.exports = UserProfile;
