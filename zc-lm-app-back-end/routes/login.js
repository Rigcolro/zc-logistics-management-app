const router = require("koa-router")();
router.prefix("/login");
const { ROLE_QUERY_SQL } = require("../utils/sql");
const { query } = require("../utils/query");
router.post("/loginQuery", async (ctx, next) => {
  const res = ctx.request.body;
  const { userPhone, userPwd } = res;
  if (userPhone && userPwd) {
    const queryParams = [
      userPhone,
      userPwd,
    ];
    if (userPhone.length === 11) {
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
    } else {
      ctx.body = {
        msg: "请检查参数!",
      };
    }
  }
});
module.exports = router;
