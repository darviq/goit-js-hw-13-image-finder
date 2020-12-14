import './styles/styles.css';
import 'material-design-icons/iconfont/material-icons.css';
import debounce from 'lodash.debounce';
import { refs } from './js/refs.js';
import findPictures from './js/apiService.js';
import pictureCardsTemplate from './templates/pictureCardsTemplate.hbs'
import { searchOptions, supportData } from './js/data.js'

const valueHandler = async () => {
    if (refs.input.value.length > 0) {
        searchOptions.query = refs.input.value;
        searchOptions.pageNumber = 1;
        supportData.renderData = await findPictures();
        refs.gallery.innerHTML = pictureCardsTemplate(supportData.renderData);
        refs.findMore.classList.remove('hidden');
    }
}

const addMore = async () => {
    if (refs.input.value.length > 0) {
        searchOptions.pageNumber += 1;
        supportData.renderData = await findPictures();
        supportData.docHeight = document.documentElement.offsetHeight;
        refs.gallery.insertAdjacentHTML('beforeend', pictureCardsTemplate(supportData.renderData));
        scrollTo({top: supportData.docHeight - 90, behavior: 'smooth'});
    }
}

refs.input.addEventListener('input', debounce(valueHandler, 1000));
refs.findMore.addEventListener('click', addMore);