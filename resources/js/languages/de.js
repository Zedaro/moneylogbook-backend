import validationDE from '../validation/de.json';

export default {

    headerTitle: {
        moneyAccounts: 'Übersicht',
        transactions: 'Transaktionen',
        repeatingTransactions: 'Daueraufträge',
        transfers: 'Umbuchungen',
        new: {
            moneyAccount: 'Neues Konto',
            transaction: 'Neue Transaktion',
            repeatingTransaction: 'Neuer Dauerauftrag',
            transfer: 'Neue Umbuchung'
        },
        edit: {
            moneyAccount: 'Konto bearbeiten',
            transaction: 'Transaktion bearbeiten',
            repeatingTransaction: 'Dauerauftrag bearbeiten',
            transfer: 'Umbuchung bearbeiten'
        }
    },
    navigationTitles: [ 'Übersicht', 'Transaktionen', 'Daueraufträge', 'Umbuchungen', 'Backend-Tests' ],
    /*
    formType: {
        moneyAccount: 'Konto-Formular',
        transaction: 'Transaktions-Formular',
        repeatingTransaction: 'Dauerauftrags-Formular',
        transfer: 'Umbuchungs-Formular'
    },
    */
    totalText: 'Gesamt',
    form: {
        name: 'Name',
        description: 'Beschreibung',
        balance: 'Geldstand',
        money: 'Betrag',
        moneyAccount: 'Konto',
        from: 'Von',
        to: 'Zu',
        date: 'Datum',
        startingDate: 'Erste Ausführung',
        endingDate: 'Letzte Ausführung / Enddatum',
        interval: 'Intervall',
        rhythmNumbers: (ctx) => {
            let every = "";

            if(ctx.named('rhythmTypeIndex') === 0) {
                every = "Jede ";
            } else if(ctx.named('rhythmTypeIndex') === 1) {
                every = "Jeden ";
            } else if(ctx.named('rhythmTypeIndex') === 2) {
                every = "Jedes ";
            }

            const rhythmNumbers = [every];
            for(let i = 2; i <= 12; i++) {
                rhythmNumbers.push("Alle " + i + ' ');
            }

            return rhythmNumbers;
        },
        rhythmTypes: (ctx) => {
            if(ctx.named('rhythmNumberIndex') === 0) {
                return [
                    "Woche",
                    "Monat",
                    "Jahr"
                ];
            } else {
                return [
                    "Wochen",
                    "Monate",
                    "Jahre"
                ];
            }
        },
        errorMessages: {
            title: 'Fehler',
            new: {
                transaction: 'Wenn Sie diese Transaktion durchführen würden, würde der Kontostand negativ werden. Bitte geben Sie einen anderen Geldbetrag an.',
                transfer: 'Würden Sie diese Umbuchung durchführen, würde der Kontostand des Kontos, von dem Sie umbuchen wollen, negativ werden. Bitte geben Sie einen anderen Geldbetrag an.'
            },
            edit: {
                transaction: {
                    sameMoneyAccount: 'Wenn Sie diese Transaktion durchführen würden, würde der Kontostand negativ werden. Bitte geben Sie einen anderen Geldbetrag an.',
                    differentMoneyAccount: {
                        oldMoneyAccountNegative: 'Wenn Sie diese Transaktion durchführen würden, würde der alte Kontostand negativ werden. Bitte geben Sie einen anderen Geldbetrag an.',
                        newMoneyAccountNegative: 'Wenn Sie diese Transaktion durchführen würden, würde der neue Kontostand negativ werden. Bitte geben Sie einen anderen Geldbetrag oder ein anderes Konto an.'
                    }
                },
                transfer: {
                    sameMoneyAccounts: 'Würden Sie diese Umbuchung durchführen, würde der Kontostand des Kontos, von dem Sie umbuchen wollen, negativ werden. Bitte geben Sie einen anderen Geldbetrag an.',
                    differentMoneyAccounts: {
                        newFromNegative: 'Würden Sie diese Umbuchung durchführen, würde der Kontostand des neuen Kontos, von dem Sie umbuchen wollen, negativ werden. Bitte geben Sie einen anderen Geldbetrag oder ein anderes Konto ("Von") an.',
                        oldToNegative: 'Würden Sie diese Umbuchung durchführen, würde der Kontostand des alten Kontos, auf das Sie umgebucht haben, negativ werden. Bitte geben Sie einen anderen Geldbetrag oder ein anderes Konto ("Zu") an.'
                    }
                }
            },
            delete: {
                transaction: 'Wenn Sie diese Transaktion löschen würden, würde der Kontostand negativ werden.',
                transfer: 'Würden Sie diese Umbuchung löschen, würde der Kontostand des Kontos, auf das Sie umgebucht haben, negativ werden.'
            }
        },
        weekdays: ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'],

    },
    authenticationForms: {
        loginLabel: 'Einloggen',
        signupLabel: 'Registrieren',
        name: 'Name',
        email: 'E-Mail',
        password: 'Passwort',
        confirmPassword: 'Passwort wiederholen'
    },
    logout: 'Ausloggen',
    moneyFormat: {
        monetaryUnit: '€',
        format: () => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
    },
    fields:{
        email: 'E-Mail',
        password: 'Passwort'
    },
    validation: validationDE,
    errors: {
        login: {
            wrongUserData: 'Ihr Benutzername oder Ihr Passwort ist falsch.',
            serverUnavailable: 'Der Server ist momentan nicht erreichbar. Bitte versuchen Sie es später noch einmal.',
        },
        signup: {
            userAlreadyExists: 'Der Nutzer mit dieser E-Mail Adresse existiert bereits.',
            serverUnavailable: 'Der Server ist momentan nicht erreichbar. Bitte versuchen Sie es später noch einmal.',
        },
    },
    flashMessage: {
        success: {
            saved: {
                moneyAccount: 'Konto wurde erfolgreich gespeichert',
                transaction: 'Transaktion wurde erfolgreich gespeichert',
                repeatingTransaction: 'Dauerauftrag wurde erfolgreich gespeichert',
                transfer: 'Umbuchung wurde erfolgreich gespeichert',
            },
            deleted: {
                moneyAccount: 'Konto wurde erfolgreich gelöscht',
                transaction: 'Transaktion wurde erfolgreich gelöscht',
                repeatingTransaction: 'Dauerauftrag wurde erfolgreich gelöscht',
                transfer: 'Umbuchung wurde erfolgreich gelöscht',
            }
        },
        error: 'Irgendetwas ist schiefgelaufen. Versuchen sie es später noch einmal.'
    },

};
