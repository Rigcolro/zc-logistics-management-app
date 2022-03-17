const url = require("url");
const querystring = require("querystring");
const fs = require("fs");
const router = require("koa-router")();
router.prefix("/profile");
const {
  ROLE_UPDATE_PHONE_SQL,
  ADDRESS_QUERY_USER_INFO_SQL,
  ADDRESS_UPDATE_ADDRESS_SQL,
} = require("../utils/sql");
const { query, update } = require("../utils/db");
router.post("/updatePhoneNumber", async (ctx, next) => {
  const res = ctx.request.body;
  const { userPhone, userName } = res;
  if (userName && userPhone) {
    const queryParams = [userPhone, userName];
    const data = await update(ROLE_UPDATE_PHONE_SQL, queryParams);
    console.log(data);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "更新成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "更新失败!",
      };
    }
  }
});
router.get("/getUserInfo", async (ctx, next) => {
  const requestUrl = ctx.request.url;
  const arg = url.parse(requestUrl).query;
  const params = querystring.parse(arg);
  const name = params.userName;
  const queryParams = [name];
  if (name) {
    const data = await query(ADDRESS_QUERY_USER_INFO_SQL, queryParams);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "获取数据成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "获取数据失败!",
      };
    }
  }
});
router.post("/updateAddress", async (ctx, next) => {
  const res = ctx.request.body;
  const {
    newUserName,
    newUserPhone,
    newUserAddress,
    oldUserName,
    oldUserPhone,
    userName,
  } = res;
  if (oldUserName && oldUserPhone && userName) {
    const queryParams = [
      newUserName,
      newUserPhone,
      newUserAddress,
      oldUserName,
      oldUserPhone,
      userName,
    ];
    const data = await update(ADDRESS_UPDATE_ADDRESS_SQL, queryParams);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "更新成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "更新失败!",
      };
    }
  }
});
router.post("/uploadImage", async (ctx) => {
  console.log(ctx.request.body);
  // const file = ctx.request.body.files.file; // 获取上传文件
  // const reader = fs.createReadStream(file.path); // 创建可读流
  // const ext = file.name.split(".").pop(); // 获取上传文件扩展名
  // const upStream = fs.createWriteStream(
  //   `upload/${Math.random().toString()}.${ext}`
  // ); // 创建可写流
  // reader.pipe(upStream); // 可读流通过管道写入可写流
  // return (ctx.body = "上传成功");
});
module.exports = router;
