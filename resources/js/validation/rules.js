import { extend, configure } from "vee-validate";
import { required, double, confirmed, email } from "vee-validate/dist/rules";
import { i18n } from '../languages_vuei18n/setup';


configure({
    defaultMessage: (field, values) => {
        return i18n.t(`validation.${values._rule_}`);
    }
})


extend('required', {
    ...required,
});

extend('double', {
    ...double
});

extend('regex', {
    validate(v) {
        const regex = /^[ A-Za-z0-9ÄÖÜßäöü.,:!?€$/()%!-]*$/;
        return v.match(regex);
    }
});

extend('confirmed', {
    ...confirmed
})

extend('email', {
    ...email
})

extend('not_zero', {
    validate(v) {
        return !!v;
    }
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

    }
});

extend('positiveFigure', {
    validate(v) {
        return v > 0;
    }
});

extend('zero_or_positive', {
    validate(v) {
        return v >= 0;
    }
})

extend('endingDateBiggerOrEqualToStartingDate', {
    validate() {
        const startingDateParts = this.startingDate.split('-');
        const endingDateParts = this.endingDate.split('-');
        if( endingDateParts[0] < startingDateParts[0]  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] < startingDateParts[1])  ||  (endingDateParts[0] == startingDateParts[0] && endingDateParts[1] == startingDateParts[1] && endingDateParts[2] < startingDateParts[2]) ) {
            return false;
        }
    }
})
