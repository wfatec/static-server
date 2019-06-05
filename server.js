const Koa = require('koa');
const serve = require('koa-static');
const app = new Koa();

app.use(serve(__dirname + '/public/Lanai-ui'));

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(3000, () => {
    console.log("server is listening in port: 3000")
});