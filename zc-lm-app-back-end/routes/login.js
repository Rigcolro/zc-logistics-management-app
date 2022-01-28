const router = require("koa-router")();
router.prefix("/login");
const {
  ROLE_QUERY_SQL,
  ROLE_QUERY_NAME_SQL,
  ROLE_QUERY_PHONE_SQL,
  ROLE_INSERT_SQL,
} = require("../utils/sql");
const { query } = require("../utils/db");
router.post("/loginQuery", async (ctx, next) => {
  const res = ctx.request.body;
  const { userName, userPhone, userPwd } = res;
  if (userName && userPhone && userPwd) {
    const queryParams = [userName, userPhone, userPwd];
    const data = await query(ROLE_QUERY_SQL, queryParams);
    console.log(data);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "请求成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "请求出错!",
      };
    }
  }
});
router.post("/loginQueryName", async (ctx, next) => {
  const res = ctx.request.body;
  const { userName } = res;
  if (userName) {
    const queryParams = [userName];
    const data = await query(ROLE_QUERY_NAME_SQL, queryParams);
    console.log(data);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "请求成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "请求出错!",
      };
    }
  }
});
router.post("/loginQueryPhone", async (ctx, next) => {
  const res = ctx.request.body;
  const { userPhone } = res;
  if (userPhone) {
    const queryParams = [userPhone];
    const data = await query(ROLE_QUERY_PHONE_SQL, queryParams);
    console.log(data);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "请求成功!",
        data,
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "请求出错!",
      };
    }
  }
});
router.post("/loginInsert", async (ctx, next) => {
  const res = ctx.request.body;
  const { userName, userPhone, userPwd } = res;
  if (userName && userPhone && userPwd) {
    const queryParams = [userName, userPhone, userPwd];
    const data = await query(ROLE_INSERT_SQL, queryParams);
    console.log(data);
    if (data) {
      ctx.body = {
        status: 200,
        msg: "插入成功!",
      };
    } else {
      ctx.body = {
        status: 500,
        msg: "插入失败!",
      };
    }
  }
});
module.exports = router;
