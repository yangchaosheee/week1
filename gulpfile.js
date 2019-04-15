const gulp = require("gulp");
const webserver = require("gulp-webserver");
const Sass = require("gulp-sass");
const mincss = require("gulp-clean-css");
const myminjs = require("gulp-uglify");

const url = require("url");
console.log(minjs)
gulp.task("mymincss",()=>{
    return gulp.src("./public/css/**/*.css")
    .pipe(mincss())
    .pipe(gulp.dest("./public/dist/newcss"))
})

gulp.task("changejs",()=>{
    return gulp.src("./public/js/*.js")
    .pipe(myminjs())
    .pipe(gulp.dest("./public/newjs"))
})



let data = require("./public/data/data.json");

gulp.task("mysass",()=>{
    return gulp.src("./public/scss/**/*scss")
    .pipe(Sass())
    .pipe(gulp.dest("./public/css"))
})

gulp.task("watch",()=>{
    return gulp.watch("./public/scss/**/*scss",gulp.series("mysass"))
})

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
                res.end(JSON.stringify(data))
            }
        }
    }))
})

gulp.task("default",gulp.series("mysass","publicWeb","backWeb","watch"))