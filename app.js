import Koa from "koa";
import bodyParser from "koa-bodyparser";
import path from "path";
// 静态资源访问
import serve from "koa-static";
import router from "./routes/index";

// 1.主页静态网页 把静态页统一放到public中管理
// __dirname 当前执行文件绝对路径
// 在浏览器里面输如 http://loacalhost:8080 默认获取加载public目录下的index.html文件
// 如果没有，那就在浏览器端口号后面拼接路径。比如 http://loacalhost:8080/index2.html。
const home = serve(path.join(`${__dirname}/public/`));

const app = new Koa();

app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  if (start > 1) {
    await next();
  } else {
    ctx.response.status = 403;
  }
  const ms = new Date().getTime() - start;
  console.log(`Time: ${ms}ms`);
});

// 解析post请求
app.use(bodyParser());

app.use(home);

// add router middleware
app.use(router.routes());

app.listen(8080);
console.log("app started at port 8080...");
