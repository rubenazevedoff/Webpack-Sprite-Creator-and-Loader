var fs = require('fs');

// Webpack Loader

function readDir(path) {
    return fs.readdirSync(path)
}

function readFiles(files) {
    var content = null;

    files.map(function(file) {
        content += 'var ' + file + ' = ' + fs.readFileSync(file) + ';';
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

var files = readDir('./src');
var contentOfFiles = readFiles(files);
var outputedFile = makeSpriteFile(contentOfFiles);

appendSpriteOnDOM(outputedFile);