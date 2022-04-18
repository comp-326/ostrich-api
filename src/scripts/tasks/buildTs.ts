import gulp from 'gulp';
import ts from 'gulp-typescript';
import alias from 'gulp-ts-alias';
import sourcemaps from 'gulp-sourcemaps';

const tsProject = ts.createProject('tsconfig.json');
const buildTS = () => {
	const compiled = gulp
		.src('src/**/*.ts')
		.pipe(alias(tsProject.config.compilerOptions))
		.pipe(sourcemaps.init())
		.pipe(tsProject());
	return compiled.js.pipe(sourcemaps.write('.')).pipe(gulp.dest('./dist/src'));
};

gulp.task('buildTS', buildTS);
