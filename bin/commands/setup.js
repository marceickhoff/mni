const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');

const generator = require('../util/generator');

const projectRoot = path.resolve(__dirname.replace('\\', '/'), '../../');
const cwd = process.cwd();

const setup = {
	showIntroMessage: function () {
		console.log(chalk.bgWhiteBright(chalk.black("\n              ")));
		console.log(chalk.bgWhiteBright(chalk.black("     mni.     ")));
		console.log(chalk.bgWhiteBright(chalk.black("              \n")));
	},
	showDoneMessage: function () {
		console.log(chalk.bgGreen(chalk.black("\n               ")));
		console.log(chalk.bgGreen(chalk.black("     done.     ")));
		console.log(chalk.bgGreen(chalk.black("               \n")));
	},
	cancelSetup: function () {
		console.log("\n" + chalk.bgYellow(chalk.black(" Setup canceled. ")));
		process.exit();
	},
	generateMixConfig: function (response) {
		if (response.mixOverride === false) return;
		let mixTargetFile = `${cwd}/webpack.mix.js`;
		let mniMixConfig = generator(response);
		console.log(chalk.gray(`${chalk.bold('Writing')} ${mixTargetFile} …`));
		fs.writeFileSync(mixTargetFile, mniMixConfig);
	},
	copyUtility: function () {
		[
			'.browserslistrc',
			'.modernizrrc'
		].forEach(function (file) {
			let target = `${cwd}/${file}`;
			if (!fs.existsSync(target)) {
				console.log(chalk.gray(`${chalk.bold('Writing')} ${target} …`));
				fs.copyFileSync(path.resolve(projectRoot, file), target);
			}
		});
	},
	createSourceStyle: function (response) {
		if (response.srcScriptOverride === false) return;
		console.log(chalk.gray(`${chalk.bold('Writing')} ${cwd}/${response.srcStyle} …`));
		fs.mkdirSync(path.dirname(`${cwd}/${response.srcStyle}`), { recursive: true });
		let content = fs.readFileSync(path.resolve(projectRoot, 'lib/scss/themes/_boilerplate.scss'), function (err) {
			console.error(err);
			if (err) throw err;
		}).toString();
		content = content.replace(/\.\./g, '~mni/lib/scss');
		if (path.extname(response.srcStyle) === '.sass') {
			content = content.replace(/"(.*)";/g, '$1');
		}
		fs.writeFileSync(`${cwd}/${response.srcStyle}`, content);
	},
	createSourceScript: function (response) {
		if (response.srcScriptOverride === false) return;
		console.log(chalk.gray(`${chalk.bold('Writing')} ${cwd}/${response.srcScript} …`));
		fs.mkdirSync(path.dirname(`${cwd}/${response.srcScript}`), { recursive: true });
		let content = fs.readFileSync(path.resolve(projectRoot, 'lib/js/main.js')).toString();
		content = content.replace(/\.\//g,  'mni/lib/js/');
		fs.writeFileSync(`${cwd}/${response.srcScript}`, content);
	},
	addScriptsToPackageJSON: function (response) {
		if (response.addScripts) {
			console.log(chalk.gray(`${chalk.bold('Updating')} ${cwd}/package.json …`));
			let packageJson = `${cwd}/package.json`;
			let pkg;
			try {
				pkg = JSON.parse(fs.readFileSync(packageJson, function (err) {
					console.log(err);
					if (err) throw err;
				}).toString());
				Object.assign(pkg.scripts, {
					"dev": "npm run development",
					"development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
					"watch": "npm run development -- --watch",
					"hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
					"prod": "npm run production",
					"production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js"
				});
				fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2));
			}
			catch (e) {
				console.error(e);
				return;
			}
		}
	},
	isLaravel: function () {
		let isLaravel = false;
		let composerFile = `${cwd}/composer.json`;
		if (fs.existsSync(composerFile)) {
			let composerJSON = JSON.parse(fs.readFileSync(composerFile).toString());
			if (composerJSON.require.hasOwnProperty('laravel/framework')) {
				//console.log(chalk.blueBright("Laravel detected!"));
				isLaravel = true;
			}
		}
		return isLaravel;
	}()
};

module.exports = function (argv) {
	// Intro banner
	setup.showIntroMessage();

	// Questions
	console.log(chalk.whiteBright(chalk.bold("Please choose:")));
	let questions = [
		{
			type: fs.existsSync(`${cwd}/webpack.mix.js`) ? 'confirm' : null,
			name: 'mixOverride',
			message: `File ${chalk.yellow(`${cwd}/webpack.mix.js`)} exists. Override to proceed?`,
			initial: false,
			onState(state) {
				if (state.aborted || state.value === false) setup.cancelSetup();
			}
		},
		{
			type: 'text',
			name: 'publicPath',
			message: 'Public path (location of mix-manifest.json):',
			initial: setup.isLaravel ? 'public' : 'dist',
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: 'text',
			name: 'srcStyle',
			message: 'Source Sass/SCSS file:',
			initial: setup.isLaravel ? 'resources/sass/app.scss' : 'src/scss/main.scss',
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: prev => fs.existsSync(`${cwd}/${prev}`) ? 'confirm' : null,
			name: 'srcStyleOverride',
			message: prev => `File ${chalk.yellow(`${cwd}/${prev}`)} exists. Override?`,
			initial: false,
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: 'text',
			name: 'destStyle',
			message: 'Ouput CSS file or directory:',
			initial: setup.isLaravel ? 'public/css/app.css' : (prev, values) => `${values.publicPath}/css/main.css`,
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: 'text',
			name: 'srcScript',
			message: 'Source JS file:',
			initial: setup.isLaravel ? 'resources/js/app.js' : 'src/js/main.js',
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: prev => fs.existsSync(`${cwd}/${prev}`) ? 'confirm' : null,
			name: 'srcScriptOverride',
			message: prev => `File ${chalk.yellow(`${cwd}/${prev}`)} exists. Override?`,
			initial: false,
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: 'text',
			name: 'destScript',
			message: 'Output JS file or directory:',
			initial: setup.isLaravel ? 'public/js/app.js' : 'dist/js/main.js',
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
		{
			type: !setup.isLaravel && fs.existsSync(`${cwd}/package.json`) ? 'confirm' : null,
			name: 'addScripts',
			message: 'Do you want to add the recommended Laravel Mix scripts to your package.json?',
			initial: true,
			onState(state) {
				if (state.aborted) setup.cancelSetup();
			}
		},
	];

	// Start questioning
	(async () => {
		const response = await prompts(questions);
		console.log(); // Empty line between questions and status messages
		setup.createSourceStyle(response);
		setup.createSourceScript(response);
		setup.generateMixConfig(response);
		setup.copyUtility();
		setup.addScriptsToPackageJSON(response);
		setup.showDoneMessage();
	})();
};
