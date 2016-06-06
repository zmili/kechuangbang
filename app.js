var koa = require('koa');
var serve = require('koa-static');
var app = koa();

app.use(serve(__dirname + '/'));

app.listen(7777);
