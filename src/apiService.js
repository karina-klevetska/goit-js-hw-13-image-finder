import makeGalleryListMarkup from './index.js'

export default class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.KEY = '23128758-78bb9bd788fc6e2a491c41576';
    }

    fetchImages() {
        return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.KEY}`)
            .then(response => response.json()).then(data => data.hits)
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}