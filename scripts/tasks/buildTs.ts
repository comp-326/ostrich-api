import alias from 'gulp-ts-alias';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import ts from 'gulp-typescript';

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
