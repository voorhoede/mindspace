// https://github.com/postcss/autoprefixer#browsers
var autoprefixBrowsers = ['> 1%', 'last 2 versions'];

var paths = {
	src: 'src/',
	srcComponents: 'src/components/',
	srcVendor: 'src/vendor/',
	srcViews: 'src/views/',
	dist: 'dist/',
	distAssets: 'dist/assets/',
	distComponents: 'dist/components/',
	distViews: 'dist/views/',
	amdConfig: './src/amd-config.json',
	karmaConfig:'./test/karma.conf.js',
	changelog:'CHANGELOG.md'
};
paths.assetFiles = [
		paths.src + 'assets/**/*.*',
		paths.srcComponents + '*/assets/**/*.*',
		paths.srcViews + '*/assets/**/*.*'
];
// source files are all files directly in module sub directories and core files,
// excluding abstract files/dirs starting with '_'.
paths.srcFiles = [
		paths.src + '*',
		paths.srcComponents + '*/*',
		paths.srcViews + '*/*',
		'!' + paths.src + '*/_template/*'
//		'!' + paths.src + '_*',
//		'!' + paths.srcComponents + '_*/*',
//		'!' + paths.srcViews + '_*/*'
];
paths.htmlFiles = paths.srcFiles.map(function(path){ return path + '.html'; });
paths.jsFiles   = paths.srcFiles.map(function(path){ return path + '.js'; });
paths.lessFiles = paths.srcFiles.map(function(path){ return path + '*/*.less'; });

module.exports = {
	autoprefixBrowsers: autoprefixBrowsers,
	paths: paths
};
