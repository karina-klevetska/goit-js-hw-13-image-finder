import * as basicLightbox from 'basiclightbox';
import "basiclightbox/dist/basicLightbox.min.css";
import galleryList from './templates/galleryList.hbs';
import ImagesApiService from './apiService';

const refs = {
    container: document.querySelector('.container'),
    form: document.querySelector('.search-form'),
    searchBtn: document.getElementById('search-btn'),
    loadMoreBtn: document.querySelector('.load-more'),
    input: document.getElementById('input'),
}

const imagesApiService = new ImagesApiService();

const onSearch = (event) => {
    event.preventDefault();
    clearContainer();

    imagesApiService.query = refs.input.value;

    imagesApiService.resetPage();
    imagesApiService.fetchImages().then(hits => makeGalleryListMarkup(hits));
    imagesApiService.incrementPage();
    
    refs.form.classList.add('scroll-up');

    onLoadMoreBtnVisible();
    
}

const onLoadMore = () => {
    imagesApiService.fetchImages().then(makeGalleryListMarkup);
    imagesApiService.incrementPage();
    scrollIntoView();
}

const onLoadMoreBtnVisible = () => {
    setTimeout(() => {
        refs.loadMoreBtn.classList.remove('is-hidden');
    }, 250)
}

const makeGalleryListMarkup = (images) => {
    const galleryListMarkup = galleryList(images);

    refs.container.insertAdjacentHTML('beforeend', galleryListMarkup)
}

const clearContainer = () => {
    refs.container.innerHTML = '';
}

const scrollIntoView = () => {
    setTimeout(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            left: 0,
            behavior: "smooth",
        });
    }, 500);
}

const onOpenModal = (event) => {
    const image = event.target.dataset.source;
    const instance = basicLightbox.create(`<img src="${image}">`);
    instance.show();
}

refs.searchBtn.addEventListener('click', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.container.addEventListener('click', onOpenModal)



