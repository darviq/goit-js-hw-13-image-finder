import './styles/styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import debounce from 'lodash.debounce';
import { refs } from './js/refs.js';
import findPictures from './js/apiService.js';
import pictureCardsTemplate from './templates/pictureCardsTemplate.hbs'
import { searchOptions } from './js/searchOptions.js'

const valueHandler = () => {
    if (refs.input.value.length > 0) {
        searchOptions.query = refs.input.value;
        searchOptions.pageNumber = 1;
        findPictures()
            .then(data => pictureCardsTemplate(data))
            .then(templateString => {
                refs.gallery.innerHTML = templateString;
                refs.findMore.classList.remove('hidden');
            });
    }
}

const addMore = () => {
    if (refs.input.value.length > 0) {
        searchOptions.pageNumber += 1;
        findPictures()
            .then(data => pictureCardsTemplate(data))
            .then(templateString => {
                const height = document.documentElement.offsetHeight;
                refs.gallery.insertAdjacentHTML('beforeend', templateString);
                scrollTo({
                    top: height - 90,
                    behavior: 'smooth',
                });
            });
    }
}

refs.input.addEventListener('input', debounce(valueHandler, 1000));
refs.findMore.addEventListener('click', addMore);