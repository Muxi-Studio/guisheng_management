const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const historyFallback = require('koa2-history-api-fallback')
const path = require('path')
const swig = require('swig');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/templates")

app.use(userAgent);

router.get('/admin', function(ctx, next){
	console.log(ctx.userAgent)
    let template = swig.compileFile(path.resolve(templateRoot, "home.html"));
        ctx.body = template({})
});

// router.get('/admin/editor/:kind/:id', function(ctx, next){
// 	console.log(ctx.userAgent)
//     let template = swig.compileFile(path.resolve(templateRoot, "editor.html"));
//         ctx.body = template({})
// });


router.get(/^\/admin\/static(?:\/|$)/, async (ctx) => {
    let filePath = ctx.path.replace(/admin\/static\//, "")
     await send(ctx, filePath, {
         root: path.join(__dirname, "../dist")
     });
})



app
    .use(historyFallback())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080);
console.log('listening on port 8080');