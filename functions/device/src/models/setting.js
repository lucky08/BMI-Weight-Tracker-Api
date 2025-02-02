const { getConnection } = require("../utils/database");

const Setting = function (setting) {
  this.id = setting.id;
  this.unit = setting.unit;
  this.darkMode = setting.darkMode;
  this.uuid = setting.uuid;
};

Setting.findByUuid = async (uuid) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `SELECT
                    id,
                    unit,
                    dark_mode AS darkMode,
                    uuid
                  FROM setting
                  WHERE uuid = ?;`;

    const rows = await conn.query(query, [uuid]);
    const [setting] = rows;
    return setting;
  } finally {
    if (conn) await conn.release();
  }
};

Setting.create = async (newSetting) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `INSERT INTO setting(unit, dark_mode, uuid)
                        value (?,?,?); `;

    const res = await conn.query(query, [
      newSetting.unit,
      newSetting.darkMode,
      newSetting.uuid,
    ]);

    const settingQuery = `SELECT
                            id,
                            unit,
                            dark_mode AS darkMode,
                            uuid
                          FROM setting
                          WHERE id = ?;`;

    const rows = await conn.query(settingQuery, res.insertId);
    const [setting] = rows;
    return setting;
  } finally {
    if (conn) await conn.release();
  }
};

Setting.updateByUuid = async (updatedSetting) => {
  let conn;

  try {
    conn = await getConnection();
    const query = `UPDATE setting
                    SET
                      unit = ?,
                      dark_mode = ?,
                    WHERE uuid = ?;`;

    await conn.query(query, [
      updatedSetting.unit,
      updatedSetting.darkMode,
      updatedSetting.uuid,
    ]);

    return updatedSetting;
  } finally {
    if (conn) await conn.release();
  }
};

module.exports = Setting;
