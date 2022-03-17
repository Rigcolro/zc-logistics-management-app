const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const koaBody = require("koa-body");

const index = require("./routes/index");
const login = require("./routes/login");
const profile = require("./routes/profile");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(cors());
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(profile.routes(), profile.allowedMethods());
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 2000 * 1024 * 1024, // 设置上传文件大小最大限制，默认20M
      uploadDir: "public/images",
      onFileBegin: (name, file) => {
        // 文件存储之前对文件进行重命名处理
        const fileFormat = file.name.split(".");
        file.name = `${Date.now()}.${fileFormat[fileFormat.length - 1]}`;
        file.path = `/${file.name}`;
      },
    },
  })
);

app.listen(8080, () => {
  console.log("server has started listening at port 8080!");
});
// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});
module.exports = app;
