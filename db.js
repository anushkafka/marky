const sqlite3 = require('sqlite3').verbose();

let db;

const initialize = () => {
    db = new sqlite3.Database('./bookmarks_db');
    db.run('CREATE TABLE IF NOT EXISTS bookmarks (id NUMBER, description TEXT, url TEXT)');
}

const addBookmark = (description, url, onComplete) => {
    const id = Date.now();
    
    db.exec(`INSERT INTO bookmarks VALUES (${id}, "${description}", "${url}")`, (err) => {
        if (err) {
            throw new Error(err);
        }

        onComplete();
    });
}

const getBookmarks = (onGet) => {
    db.all('SELECT id, description, url FROM bookmarks', (err, bookmarks) => {
        if (err) {
            throw new Error(err);
        }

        return onGet(bookmarks);
    });
}

const deleteBookmark = () => {

}

module.exports = {
    initialize,
    addBookmark,
    getBookmarks,
}
