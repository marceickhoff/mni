const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');

const generator = require('../util/generator');

const projectRoot = path.resolve(__dirname.replace('\\', '/'), '../../');
const cwd = process.cwd();

function backup(file) {
	let backupFile = `${file}.${Date.now() / 1000 | 0}.backup`;
	console.log(chalk.gray(`${chalk.bold('Creating backup')} ${backupFile} …`));
	fs.copyFileSync(file, backupFile);
}

module.exports = function (argv) {
	// Intro banner
	console.log(chalk.bgWhiteBright(chalk.black("\n              ")));
	console.log(chalk.bgWhiteBright(chalk.black("     mni.     ")));
	console.log(chalk.bgWhiteBright(chalk.black("              \n")));

	// Check if this is a Laravel project
	let isLaravel = false;
	let composerFile = `${cwd}/composer.json`;
	if (fs.existsSync(composerFile)) {
		let composerJSON = JSON.parse(fs.readFileSync(composerFile).toString());
		if (composerJSON.require.hasOwnProperty('laravel/framework')) {
			//console.log(chalk.blueBright("Laravel detected!"));
			isLaravel = true;
		}
	}

	// Questions
	console.log(chalk.whiteBright(chalk.bold("Please choose locations for:")));
	let questions = [
		{
			type: 'text',
			name: 'srcStyle',
			message: 'Source Sass/SCSS:',
			initial: isLaravel ? 'resources/sass/app.scss' : 'src/scss/main.scss'
		},
		{
			type: 'text',
			name: 'destStyle',
			message: 'Ouput CSS:',
			initial: isLaravel ? 'public/css/app.css' : 'dist/css/main.css'
		},
		{
			type: 'text',
			name: 'srcScript',
			message: 'Source JS:',
			initial: isLaravel ? 'resources/js/app.js' : 'src/js/main.js'
		},
		{
			type: 'text',
			name: 'destScript',
			message: 'Output JS:',
			initial: isLaravel ? 'public/js/app.js' : 'dist/js/main.js'
		},
	];

	if (!isLaravel && fs.existsSync(`${cwd}/package.json`)) {
		questions.push({
			type: 'confirm',
			name: 'addScripts',
			message: 'Do you want to add the recommended Laravel Mix scripts to your package.json?',
			initial: true
		});
	}

	// Start questioning
	(async () => {
		const response = await prompts(questions);

		// Check if all prompts were answered
		['srcStyle', 'destStyle', 'srcScript', 'destScript'].forEach(function (option) {
			if (!response.hasOwnProperty(option)) {
				console.log(chalk.bgYellow(chalk.black(" Setup canceled. ")));
				return process.exit();
			}
		});

		// Empty line for nice formatting
		console.log();

		// Create source stylesheet directory and entry point
		if (fs.existsSync(`${cwd}/${response.srcStyle}`) && !argv.noBackups) backup(`${cwd}/${response.srcStyle}`);
		console.log(chalk.gray(`${chalk.bold('Writing')} ${cwd}/${response.srcStyle} …`));
		await fs.mkdir(path.dirname(`${cwd}/${response.srcStyle}`), { recursive: true }, (err) => {
			if (err) throw err;
			let content = fs.readFileSync(path.resolve(projectRoot, 'lib/scss/themes/_boilerplate.scss'), function (err) {
				console.error(err);
				if (err) throw err;
			}).toString();
			content = content.replace(/\.\./g, '~mni/lib/scss');
			if (path.extname(response.srcStyle) === '.sass') {
				content = content.replace(/"(.*)";/g, '$1');
			}
			fs.writeFileSync(`${cwd}/${response.srcStyle}`, content);
		});

		// Create source script directory and entry point
		if (fs.existsSync(`${cwd}/${response.srcScript}`) && !argv.noBackups) backup(`${cwd}/${response.srcScript}`);
		console.log(chalk.gray(`${chalk.bold('Writing')} ${cwd}/${response.srcScript} …`));
		await fs.mkdir(path.dirname(`${cwd}/${response.srcScript}`), { recursive: true }, (err) => {
			if (err) throw err;
			let content = fs.readFileSync(path.resolve(projectRoot, 'lib/js/main.js'), function (err) {
				console.error(err);
				if (err) throw err;
			}).toString();
			content = content.replace(/\.\//g,  'mni/lib/js/');
			fs.writeFileSync(`${cwd}/${response.srcScript}`, content);
		});

		// Generate Laravel Mix config
		let mixTargetFile = `${cwd}/webpack.mix.js`;
		let mniMixConfig = generator(response);
		if (fs.existsSync(mixTargetFile) && !argv.noBackups) backup(mixTargetFile);
		console.log(chalk.gray(`${chalk.bold('Writing')} ${mixTargetFile} …`));
		fs.writeFileSync(mixTargetFile, mniMixConfig);

		// Copy utility config
		let browserslistTargetFile = `${cwd}/.browserslistrc`;
		if (!fs.existsSync(browserslistTargetFile)) {
			console.log(chalk.gray(`${chalk.bold('Writing')} ${browserslistTargetFile} …`));
			fs.copyFileSync(path.resolve(projectRoot, '.browserslistrc'), browserslistTargetFile);
		}
		let modernizrTargetFile = `${cwd}/.modernizrrc`;
		if (!fs.existsSync(modernizrTargetFile)) {
			console.log(chalk.gray(`${chalk.bold('Writing')} ${modernizrTargetFile} …`));
			fs.copyFileSync(path.resolve(projectRoot, '.browserslistrc'), modernizrTargetFile);
		}

		// Add scripts to package.json
		if (response.addScripts) {
			console.log(chalk.gray(`${chalk.bold('Updating')} ${cwd}/package.json …`));
			let packageJson = `${cwd}/package.json`;
			let pkg;
			try {
				pkg = JSON.parse(fs.readFileSync(packageJson, function (err) {
					console.log(err);
					if (err) throw err;
				}).toString());
				pkg.scripts.assign({
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

		// Done message
		console.log(chalk.bgGreen(chalk.black("\n               ")));
		console.log(chalk.bgGreen(chalk.black("     done.     ")));
		console.log(chalk.bgGreen(chalk.black("               \n")));
	})();
};
