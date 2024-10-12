const path = require('path');

module.exports = {
    entry: './src/index.js',  // Der Einstiegspunkt für dein Projekt
    output: {
        filename: 'bundle.js',  // Die gebündelte Datei
        path: path.resolve(__dirname, 'dist'),  // Der Ordner, in dem das Ergebnis gespeichert wird
    },
    module: {
        rules: [
            {
                test: /\.css$/,  // Lade CSS-Dateien
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,  // Für SCSS-Dateien
                use: ['style-loader', 'css-loader', 'sass-loader'],  // SCSS verarbeiten und einfügen
            }

        ],
    },
};
