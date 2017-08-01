const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.json());

app.use('/app', express.static('static'))

app.get('/bookmarks', (request, response) => {
    db.getBookmarks(bookmarks => {
        response.send(bookmarks);
    });
});

app.post('/bookmarks', (request, response) => {
    db.addBookmark(request.body.description, request.body.url, () => {
        response.send('OK');
    });
});

const start = () => {
    db.initialize();

    app.listen(3000, function () {
        console.log('Bookmark app listening on port 3000!');
    });
}

module.exports = {
    start,
}
