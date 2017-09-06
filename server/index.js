const send = require('koa-send');
const Koa = require('koa');
const Router = require('koa-router');
const userAgent = require('koa-useragent');
const path = require('path')
const swig = require('swig');
const bodyParser = require('koa-bodyparser');
const qiniu = require('qiniu')
// const qiniuConfig = require('./qiniuconfig');
const router = new Router();
const app = new Koa();

const templateRoot = path.join(__dirname, "../dist/templates")

app.use(userAgent);
app.use(bodyParser());

router.get('/admin', function(ctx, next){
    let template = swig.compileFile(path.resolve(templateRoot, "home.html"));
        ctx.body = template({})
});

// router.get('/admin/editor/:kind/:id', function(ctx, next){
// 	console.log(ctx.userAgent)
//     let template = swig.compileFile(path.resolve(templateRoot, "editor.html"));
//         ctx.body = template({})
// });

function upToQiniu (filePath, key) {
    const accessKey = '0bNiwJGpdwmvvuVAzLDjM6gnxj9MiwmSagVpIW81';
    const secretKey = 'zHA9w8PoSfL6D4dvWNwU2GF4XHUn9MalynbANE3_';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: guishengapp,
      };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken=putPolicy.uploadToken(mac);
    const config = new qiniu.conf.Config()
    const localFile = filePath
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()

    return new Promise((resolved, reject) => {
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
            if (respErr) {
                reject(respErr)
            }
            if (respInfo.statusCode == 200) {
                resolved(respBody)
            } else {
                resolved(respBody)
            }
        })
    })  
}


router.post('/upload',function(ctx, next){
    console.log(ctx.request)
    // const qiniu = await upToQiniu(imgPath, result.imgKey)
    ctx.body = ctx.request.body;
    // console.log(ctx.body)
})

router.get(/^\/admin\/static(?:\/|$)/, async (ctx) => {
    let filePath = ctx.path.replace(/admin\/static\//, "")
     await send(ctx, filePath, {
         root: path.join(__dirname, "../dist")
     });
})



app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080);
console.log('listening on port 8080');