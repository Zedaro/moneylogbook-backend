import './localization';

import { extend } from "vee-validate";
import { required, double, confirmed, email } from "vee-validate/dist/rules";



extend('required', required);

extend('double', {
    ...double,
    message: "Geben Sie bitte einen positiven Betrag an"
});

extend('regex', {
    validate(v) {
        const regex = /^[ A-Za-z0-9ÄÖÜßäöü.,:!?€$/()%!-]*$/;
        return v.match(regex);
    },
    message: "Legale Zeichen: Buchstaben, Zahlen und Folgende: . , : ! ? € $ / ( ) % ! - "
});

extend('confirmed', {
    ...confirmed,
    message: 'Die Passwörter stimmen nicht überein'
})

extend('email', {
    ...email,
    message: 'Geben Sie bitte eine gültige E-Mail an'
})

extend('not_zero', {
    validate(v) {
        return !!v;
    },
    message: "Geben Sie bitte einen Betrag an"
});

extend('twoDifferentMoneyAccounts', {
    params: ['target'],
    validate(v, { target }) {

        let valid = false;

        if (v !== '' && target !== '') {
            if(v !== target)
                valid = true;
        } else {
            valid = true;
        }

        return valid;

    },
    message: "Bitte geben Sie zwei verschiedene Konten an"
});

extend('positiveFigure', {
    validate(v) {
        return v > 0;
    },
    message: "Geben Sie bitte einen positiven Betrag an"
});

extend('zero_or_positive', {
    validate(v) {
        return v >= 0;
    },
    message: "Geben Sie bitte einen positiven Betrag an"
})

extend('endingDateBiggerOrEqualToStartingDate', {
    validate() {
        const startingDateParts = this.startingDate.split('-');
        const endingDateParts = this.endingDate.split('-');
        if( endingDateParts[0] < startingDateParts[0]  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] < startingDateParts[1])  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] == startingDateParts[1] && endingDateParts[2] < startingDateParts[2]) ) {
            return false;
        }
    },
    message: "Das Enddatum darf nicht kleiner sein als das Startdatum"
})
