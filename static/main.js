const getBookmarks = () => {
    fetch('/bookmarks')
        .then(response => {
            return response.json();
        })
        .then(bookmarks => {
            document.getElementById('all-bookmarks').innerHTML = '';

            bookmarks.forEach(bookmark => {
                const bookmarkElement = createBookmarkElement(bookmark.id, bookmark.description, bookmark.url);
                document.getElementById('all-bookmarks').appendChild(bookmarkElement);
            });
        })
        .catch(err => {
            console.log({error: err});
        });
}

getBookmarks();

const createBookmarkElement = (id, description, url) => {
    const wrapperElement = document.createElement('li');
    wrapperElement.setAttribute('class', 'list-group-item');

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    const urlElement = document.createElement('a');
    urlElement.textContent = 'Click me!';
    urlElement.setAttribute('href', url);

    wrapperElement.appendChild(descriptionElement);
    wrapperElement.appendChild(urlElement);

    return wrapperElement;
}

const addBookmark = () => {
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;
    
    fetch('/bookmarks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            description,
            url,
        }),
    })
        .then(() => {
            document.getElementById('description').value = '';
            document.getElementById('url').value = '';
            getBookmarks();
        });
}
    