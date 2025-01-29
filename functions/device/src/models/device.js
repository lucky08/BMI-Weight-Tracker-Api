const { getConnection } = require("../utils/database");

const Device = function (device) {
  this.id = device.id;
  this.uuid = device.uuid;
  this.isVirtual = device.isVirtual;
  this.model = device.model;
  this.operatingSystem = device.operatingSystem;
  this.osVersion = device.osVersion;
  this.platform = device.platform;
  this.webViewVersion = device.webViewVersion;
  this.manufacturer = device.manufacturer;
};

Device.getAll = async () => {
  let conn;
  try {
    conn = await getConnection();

    // create a new query
    const query = `SELECT 
                    id,
                    uuid,
                    is_virtual AS isVirtual,
                    model,
                    operating_system AS operatingSystem,
                    os_version AS osVersion,
                    platform,
                    web_view_version AS webViewVersion,
                    manufacturer
                  FROM device;`;

    const rows = await conn.query(query);

    return rows;
  } finally {
    if (conn) await conn.release();
  }
};

Device.findByUuid = async (uuid) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `SELECT
                    id,
                    uuid,
                    is_virtual AS isVirtual,
                    model,
                    operating_system AS operatingSystem,
                    os_version AS osVersion,
                    platform,
                    web_view_version AS webViewVersion,
                    manufacturer
                  FROM device
                  WHERE uuid = ?;`;

    const rows = await conn.query(query, [uuid]);
    const [device] = rows;
    return device;
  } finally {
    if (conn) await conn.release();
  }
};

Device.create = async (newDevice) => {
  let conn;
  try {
    conn = await getConnection();

    const query = `INSERT INTO device(uuid, is_virtual, model, operating_system, os_version, platform, web_view_version, manufacturer)
                        value (?,?,?,?,?,?,?,?); `;

    const res = await conn.query(query, [
      newDevice.uuid,
      newDevice.isVirtual,
      newDevice.model,
      newDevice.operatingSystem,
      newDevice.osVersion,
      newDevice.platform,
      newDevice.webViewVersion,
      newDevice.manufacturer,
    ]);

    const deviceQuery = `SELECT id,
                          uuid,
                          is_virtual AS isVirtual,
                          model model,
                          operating_system AS operatingSystem,
                          os_version AS osVersion,
                          platform,
                          web_view_version AS webViewVersion,
                          manufacturer
                   FROM device
                   WHERE id = ?;`;

    const rows = await conn.query(deviceQuery, res.insertId);
    const [device] = rows;
    return device;
  } finally {
    if (conn) await conn.release();
  }
};

module.exports = Device;
