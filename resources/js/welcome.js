//import axios from "axios";
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

});





/*let de = document.getElementById('de');
let en = document.getElementById('en');*/

/*de.onclick = function() {
    window.location.href = "http://localhost:3000/welcome/de";
}
en.onclick = function() {
    window.location.href = "http://localhost:3000/welcome/en";
}*/


function changeLanguage(locale) {

    window.location.href = `http://localhost:3000/welcome/${locale}`;
    //console.log('changeLanguage/' + locale);

}

window.changeLanguage = changeLanguage;
