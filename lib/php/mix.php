<?php
if (! function_exists('mix')) {
	/**
	 * Get the path to a versioned Mix file.
	 *
	 * @param $publicFolder
	 * @param string $path
	 * @param string $manifestDirectory
	 * @return string
	 *
	 * @throws Exception
	 */
	function mix($publicFolder, $path, $manifestDirectory = '')
	{
		static $manifest;
		$rootPath = $_SERVER['DOCUMENT_ROOT'];
		$publicPath = $rootPath . $publicFolder;
		if ($manifestDirectory and substr($manifestDirectory, 0, 1) != '/') {
			$manifestDirectory = "/{$manifestDirectory}";
		}
		if (! $manifest) {
			if (! file_exists($manifestPath = ($rootPath . $manifestDirectory.'/mix-manifest.json') )) {
				throw new Exception('The Mix manifest does not exist.');
			}
			$manifest = json_decode(file_get_contents($manifestPath), true);
		}
		if (substr($path, 0, 1) != '/') {
			$path = "/{$path}";
		}
		$path = $publicFolder . $path;
		if (! array_key_exists($path, $manifest)) {
			throw new Exception(
				"Unable to locate Mix file: {$path}. Please check your ".
				'webpack.mix.js output paths and try again.'
			);
		}
		return file_exists($publicPath . ($manifestDirectory.'/hot'))
			? "http://localhost:8080{$manifest[$path]}"
			: $manifestDirectory.$manifest[$path];
	}
}