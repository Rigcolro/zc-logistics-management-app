const ROLE_QUERY_SQL = "select * from role where userPhone=? and userPwd=?";
const ROLE_INSERT_SQL = `INSERT INTO role SET ?`;
const ROLE_UPDATE_SQL = `UPDATE role SET username=? WHERE id=?`;
const ROLE_DELETE_SQL = `DELETE FROM role WHERE id=?`;

module.exports = {
  ROLE_QUERY_SQL,
  ROLE_INSERT_SQL,
  ROLE_UPDATE_SQL,
  ROLE_DELETE_SQL,
};
