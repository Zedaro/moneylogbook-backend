import axios from "axios";
import Splide from '@splidejs/splide';

/*let langButtons = document.getElementsByClassName('lang');

console.log(langButtons);

langButtons[0].addEventListener('click', changeLang(langButtons[0].id));
langButtons[1].addEventListener('click', changeLang(langButtons[1].id));*/

/*for (let button of langButtons) {

    console.log('hi');
    console.log('changeLanguage/' + button.id);
    button.addEventListener('click', changeLang(button));

}*/

document.addEventListener('DOMContentLoaded', function(){

    new Splide( '.splide', {
        width: '300px',
        rewind: true,
    }).mount();

    if(sessionStorage.getItem('locale') === null) {
        sessionStorage.setItem('locale', navigator.language.substring(0, 2));
    }

});


function changeLanguage(locale) {

    axios.post('/changeLanguage', {lang: locale})
        .then(() => {
            sessionStorage.setItem('locale', locale);
            location.href = `http://localhost:3000/welcome/${locale}`;
        });

}

window.changeLanguage = changeLanguage;
