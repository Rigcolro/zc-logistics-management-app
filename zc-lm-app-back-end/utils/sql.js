const ROLE_QUERY_SQL =
  "select * from role where userName=? and userPhone=? and userPwd=?";
const ROLE_QUERY_NAME_SQL = "select * from role where userName=?";
const ROLE_QUERY_PHONE_SQL = "select * from role where userPhone=?";
const ROLE_INSERT_SQL = `INSERT INTO role (userName,userPhone,userPwd,isAdministrator) values (?,?,?,1)`;
const ROLE_UPDATE_SQL = `UPDATE role SET username=? WHERE id=?`;
const ROLE_DELETE_SQL = `DELETE FROM role WHERE id=?`;

module.exports = {
  ROLE_QUERY_SQL,
  ROLE_QUERY_NAME_SQL,
  ROLE_QUERY_PHONE_SQL,
  ROLE_INSERT_SQL,
  ROLE_UPDATE_SQL,
  ROLE_DELETE_SQL,
};
