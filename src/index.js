import galleryList from './templates/galleryList.hbs';
import ImagesApiService from './apiService';

const refs = {
    container: document.querySelector('.container'),
    searchBtn: document.getElementById('search-btn'),
    loadMoreBtn: document.querySelector('.load-more'),
    input: document.getElementById('input')
}

const imagesApiService = new ImagesApiService();

const onSearch = (event) => {
    event.preventDefault();
    clearContainer();

    imagesApiService.query = refs.input.value;
    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(hits => makeGalleryListMarkup(hits));
    imagesApiService.incrementPage();

    
}

const onLoadMore = () => {
    imagesApiService.fetchImages().then(makeGalleryListMarkup);
}

const makeGalleryListMarkup = (images) => {
    const galleryListMarkup = galleryList(images);

    refs.container.insertAdjacentHTML('beforeend', galleryListMarkup)
}

const clearContainer = () => {
    refs.container.innerHTML = '';
}

refs.searchBtn.addEventListener('click', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore)


