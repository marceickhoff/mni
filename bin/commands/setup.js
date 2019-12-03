const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const prompts = require('prompts');

const generator = require('../util/generator');

const projectRoot = path.resolve(__dirname, '../../');
const cwd = process.cwd();

module.exports = function (argv) {
	// Intro
	console.log(chalk.bgWhiteBright(chalk.black(" Welcome to mni! ")));
	console.log("This setup will create a boilerplate for you so you can start using mni immediately.");
	console.log("In order to do this, you need to make some decisions about your project structure:");
	console.log(chalk.gray(`(All paths relative to ${chalk.bold(path.resolve(cwd))})`));

	// Questions
	const questions = [
		{
			type: 'text',
			name: 'srcStyle',
			message: 'Desired location of source stylesheet (.scss or .sass):',
			initial: 'src/scss/main.scss'
		},
		{
			type: 'text',
			name: 'destStyle',
			message: 'Desired location of compiled stylesheet:',
			initial: 'dist/css/main.css'
		},
		{
			type: 'text',
			name: 'srcScript',
			message: 'Desired location of source script:',
			initial: 'src/js/main.js'
		},
		{
			type: 'text',
			name: 'destScript',
			message: 'Desired location of compiled script:',
			initial: 'dist/js/main.js'
		},
		{
			type: 'confirm',
			name: 'addScripts',
			message: 'Do you want to add the recommended Laravel Mix scripts to your package.json?',
			initial: true
		},
	];

	// Start questioning
	(async () => {
		const response = await prompts(questions);

		// Check if all prompts were answered
		['srcStyle', 'destStyle', 'srcScript', 'destScript', 'addScripts'].forEach(function (option) {
			if (!response.hasOwnProperty(option)) {
				console.log(chalk.bgYellow(chalk.black(" Setup canceled. ")));
				return process.exit();
			}
		});

		console.log(chalk.bgWhite(chalk.black(" That's all. Creating boilerplate now … ")));

		// Generate Laravel Mix config
		console.log(chalk.gray(`${chalk.bold('Creating')} ${cwd}/webpack.mix.js …`));
		fs.writeFileSync(`${cwd}/webpack.mix.js`, generator(response));

		// Create source stylesheet directory and entry point
		console.log(chalk.gray(`${chalk.bold('Creating')} ${cwd}/${response.srcStyle} …`));
		await fs.mkdir(path.dirname(`${cwd}/${response.srcStyle}`), { recursive: true }, (err) => {
			if (err) throw err;
			let content = fs.readFileSync(path.resolve(projectRoot, 'lib/scss/themes/_boilerplate.scss'), function (err) {
				console.log(err);
				if (err) throw err;
			}).toString();
			content = content.replace(/\.\./g, path.relative(path.dirname(`${cwd}/${response.srcStyle}`), projectRoot + '/lib/scss'));
			if (path.extname(response.srcStyle) === '.sass') {
				content = content.replace(/"(.*)";/g, '$1');
			}
			fs.writeFileSync(`${cwd}/${response.srcStyle}`, content);
		});

		// Create source script directory and entry point
		console.log(chalk.gray(`${chalk.bold('Creating')} ${cwd}/${response.srcScript} …`));
		await fs.mkdir(path.dirname(`${cwd}/${response.srcScript}`), { recursive: true }, (err) => {
			if (err) throw err;
			let content = fs.readFileSync(path.resolve(projectRoot, 'lib/js/main.js'), function (err) {
				console.log(err);
				if (err) throw err;
			}).toString();
			content = content.replace(/\.\//g, path.relative(path.dirname(`${cwd}/${response.srcScript}`), projectRoot + '/lib/js') + '/');
			fs.writeFileSync(`${cwd}/${response.srcScript}`, content);
		});

		// Copy utility config
		console.log(chalk.gray(`${chalk.bold('Creating')} ${cwd}/.browserslistrc …`));
		fs.copyFileSync(path.resolve(projectRoot, '.browserslistrc'), `${cwd}/.browserslistrc`);
		console.log(chalk.gray(`${chalk.bold('Creating')} ${cwd}/.modernizrrc …`));
		fs.copyFileSync(path.resolve(projectRoot, '.modernizrrc'), `${cwd}/.modernizrrc`);

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
				if (e.errno === -2) {
					console.log(chalk.yellow(chalk.bold('Warning:') + ' There seems to be no package.json file here! Please go to a npm project root and try again!'));
				}
				else {
					console.log(e);
					return;
				}
			}
		}

		// Done message
		console.log(chalk.bgGreen(chalk.black(" All done! ")) + " Thank you for using mni! Feel free to contact me if you have any issues: " + chalk.bold("mail@marceickhoff.com"));
	})();
};