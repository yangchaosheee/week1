const gulp = require("gulp");
const webserver = require("gulp-webserver");
const url = require("url");

gulp.task("publicWeb",()=>{
    return gulp.src("./public")
    .pipe(webserver({
        port:8080,
        open:true,
        livereload:true,
        proxies:[
            {source:"/getData",target:"http://localhost:3000/getData"}
        ]
    }))
})

gulp.task("backWeb",()=>{
    return gulp.src(".")
    .pipe(webserver({
        port:3000,
        middleware : (req,res,next)=>{
            let {pathname,query} = url.parse(req.url,true);
            res.setHeader("content-type","application/json");
            if(pathname == "/getData/"){
                res.end("lala")
            }
        }
    }))
})