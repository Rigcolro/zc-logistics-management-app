// role表相关sql语句
const ROLE_QUERY_SQL =
  "select * from role where userName=? and userPhone=? and userPwd=?";
const ROLE_QUERY_NAME_SQL = "select * from role where userName=?";
const ROLE_QUERY_PHONE_SQL = "select * from role where userPhone=?";
const ROLE_INSERT_SQL = `insert INTO role (userName,userPhone,userPwd,isAdministrator) values (?,?,?,1)`;
const ROLE_UPDATE_PHONE_SQL = `update role set userPhone=? where userName=?`;
const ROLE_DELETE_SQL = `delete FROM role WHERE id=?`;
// address表相关sql语句
const ADDRESS_QUERY_USER_INFO_SQL =
  "select subUserName,subUserPhone,subUserAddress from address where userName=?";
const ADDRESS_UPDATE_ADDRESS_SQL =
  "update address set subUserName=?,subUserPhone=?,subUserAddress=? where subUserName=? and subUserPhone=? and userName=?";
module.exports = {
  ROLE_QUERY_SQL,
  ROLE_QUERY_NAME_SQL,
  ROLE_QUERY_PHONE_SQL,
  ROLE_INSERT_SQL,
  ROLE_UPDATE_PHONE_SQL,
  ROLE_DELETE_SQL,
  ADDRESS_QUERY_USER_INFO_SQL,
  ADDRESS_UPDATE_ADDRESS_SQL,
};
