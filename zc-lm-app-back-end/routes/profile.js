const router = require("koa-router")();
router.prefix('/profile')
const { ROLE_UPDATE_PHONE_SQL } = require("../utils/sql");
const { update } = require("../utils/db");
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
module.exports = router;
