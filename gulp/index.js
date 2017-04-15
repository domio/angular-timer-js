const fs = require('fs');

fs.readdirSync('./gulp/tasks').filter(function (file) {
    return (/\.(js)$/i).test(file);
}).map(function (file) {
    require('./tasks/' + file);
});
