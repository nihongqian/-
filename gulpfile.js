
let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require("gulp-uglify");
let htmlmin = require("gulp-htmlmin");
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");

gulp.task("copy", ()=>{
	//读取所有文件，写入到dist目录下
	gulp.src("./src/**/*.*").pipe( gulp.dest("./dist") )
})

gulp.task("buildJS", ()=>{
	//只复制
	gulp.src("./src/scripts/libs/*.js").pipe( gulp.dest("./dist/scripts/libs") )
	
	//编译压缩再复制
    gulp.src("./src/scripts/*.js")
        .pipe(babel({
            presets: ['env']
        }))
        .pipe( uglify() )
        .pipe( gulp.dest("./dist/scripts") )
})
 
gulp.task("buildCSS", ()=>{
	gulp.src("./src/styles/*.css")
		.pipe( cleancss() )
		.pipe( gulp.dest("./dist/styles") )
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/pages/*.html")
		.pipe( htmlmin({ collapseWhitespace: true }) )
		.pipe( gulp.dest("./dist/pages") );
})

gulp.task("webserver", ()=>{
	gulp.src("src")
		.pipe(webserver({
			livereload: true,	//是否热部署
			https: true,
			open: true,
			port: 8848,
			proxies: [
				{
					source: "/listmore",
					target: "https://m.lagou.com/listmore.json"
				}
			]
		}))
})

gulp.task("build", ["buildJS","buildCSS","buildHTML"])
