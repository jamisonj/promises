const path = require('path');
const fs = require('fs');

exports.resolvedPath = function(directoryPath, fileName) {
	console.log(path.resolve(directoryPath, fileName));
	return path.resolve(directoryPath, fileName);
};

exports.readFile = function(filePath) {
	return new Promise(function(resolve, reject) {
		
		fs.readFile(filePath, 'utf-8', (err, data) => {
		  if (err) return reject(err);
		  resolve(data);
		});
    });
};

exports.readDir = function(directoryPath) {
	return new Promise(function(resolve, reject) {
		
		fs.readdir(directoryPath, (err, files) => {
		  if (err) return reject(err);
		  resolve(files);
		});
    });
};

exports.readDirFiles = function(directoryPath) {

	return exports.readDir(directoryPath)
		.then(function(files) {

			var promises = [];
			// console.log(files);

			for (let i = 0; i < files.length; i++) {
				var filePath = path.resolve(directoryPath, files[i]);
				promises.push(exports.readFile(filePath));
			}

			return Promise.all(promises);
		})
}

// exports.readFile('C:/Dev/it410/promises/index.js').then(function(result) {
// 	console.log(result);
// });

// exports.resolvedPath('/foo/bar', './baz');

// exports.readFile('../calling-planner/.gitignore').then(function(contents) {
// 	console.log(contents);
// });

// exports.readDir('C:/Users').then(function(contents) {
// 	console.log(contents);
// });

// exports.readDirFiles('C:/Users/justi/Documents/Work/Curb Painting').then(function(contents) {
// 	console.log(contents);
// })
// .catch(function(error) {
// 	console.log(error);
// });