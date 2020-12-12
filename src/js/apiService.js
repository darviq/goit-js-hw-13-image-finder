import { searchOptions } from './searchOptions.js'

const findPictures = () => {
    return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchOptions.query}&page=${searchOptions.pageNumber}&per_page=12&key=${searchOptions.key}`)
        .then(response => response.json())
        .then(data => data.hits)
}

export default findPictures;