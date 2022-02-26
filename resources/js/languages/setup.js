import Vue from "vue";
import VueI18n from "vue-i18n";
import de from "./de";
import en_US from "./en-US";

let messages = {
    de: de,
    'en-US': en_US
}

Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: 'de', // set locale
    fallbackLocale: 'de',
    messages, // set locale messages
})


/*const loadedLanguages = ['de'];

function setI18nLanguage (lang) {
    i18n.locale = lang
    return lang
}

export function loadLanguageAsync(lang) {
    // If the same language
    if (i18n.locale === lang) {
        return Promise.resolve(setI18nLanguage(lang))
    }

    // If the language was already loaded
    if (loadedLanguages.includes(lang)) {
        return Promise.resolve(setI18nLanguage(lang))
    }

    // If the language hasn't been loaded yet
    return import(/!* webpackChunkName: "lang-[request]" *!/ `./${lang}.js`).then(
        messages => {
            i18n.setLocaleMessage(lang, messages.default)
            loadedLanguages.push(lang)
            return setI18nLanguage(lang)
        }
    )
}*/
