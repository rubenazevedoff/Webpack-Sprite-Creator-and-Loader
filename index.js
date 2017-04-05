var fs = require('fs');
var pathFS = require('path');

// Webpack Loader

function readDir(path) {
    return fs.readdirSync(path)
}

function readFiles(files, path) {
    var content = '';
    
    files.map(function(file) {
        content += "var " + pathFS.basename(file).slice(0, -4) + " = '" + fs.readFileSync(path + file) + "';";
    });

    return content;
}

function makeSpriteFile(content) {
    fs.writeFileSync('./sprite.js', content);

    return 'sprite.js';
}

// Webpack Plugin

/**
 * This could be helpful if we use a CDN to cache our static content files.
 * You might ask this may bug, because SVG and XML, and you cannot load from cross-side domains.
 * The sprite is made in .js for that case.
 */
function loadSprite(url) {
    // This could be an ajax request to the url, and get the file from CDN, for now
    // we will just read from the FS

    return fs.readFileSync(url);
}

/**
 * When we're making the sprite, we are saving each svg inside a variable, then, when appending to the DOM
 * you can access with it
 */
function appendSpriteOnDOM(sprite) {
    if (typeof document !== object) return;

    document.body.appendChild(sprite);
}

// Init (for now, we will not chain any function)

var pathToFiles = './src/';
var files = readDir(pathToFiles);
var contentOfFiles = readFiles(files, pathToFiles);
var outputedFile = makeSpriteFile(contentOfFiles);

//appendSpriteOnDOM(outputedFile);