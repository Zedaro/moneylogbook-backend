export default {

    headerTitle: {
        moneyAccounts: 'Overview',
        transactions: 'Transactions',
        repeatingTransactions: 'Repeating Transactions',
        transfers: 'Transfers',
        new: {
            moneyAccount: 'New Account',
            transaction: 'New Transaction',
            repeatingTransaction: 'New Repeating Transaction',
            transfer: 'New Transfer'
        },
        edit: {
            moneyAccount: 'Edit Account',
            transaction: 'Edit Transaction',
            repeatingTransaction: 'Edit Repeating Transaction',
            transfer: 'Edit Transfer'
        }
    },
    navigationTitles: [ 'Overview', 'Transactions', 'Repeating Transactions', 'Transfers', 'Backend-Tests' ],
    formType: {
        moneyAccount: 'Konto-Formular',
        transaction: 'Transaktions-Formular',
        repeatingTransaction: 'Dauerauftrags-Formular',
        transfer: 'Umbuchungs-Formular'
    },
    totalText: 'Total',
    form: {
        name: 'Name',
        description: 'Description',
        balance: 'Balance',
        money: 'Figure',
        moneyAccount: 'Account',
        from: 'From',
        to: 'To',
        date: 'Date',
        startingDate: 'First Execution / Starting Date',
        endingDate: 'Last Execution / Ending Date (optional)',
        interval: 'Interval',
        rhythmNumbers: () => {
            let every = "Every";

            const rhythmNumbers = [every];
            for(let i = 2; i <= 12; i++) {
                rhythmNumbers.push("Every " + i + ' ');
            }

            return rhythmNumbers;
        },
        rhythmTypes: (ctx) => {
            if(ctx.named('rhythmNumberIndex') === 0) {
                return [
                    "week",
                    "month",
                    "year"
                ];
            } else {
                return [
                    "weeks",
                    "months",
                    "years"
                ];
            }
        },
        weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        errorMessages: {
            title: 'Error',
            new: {
                transaction: 'If you would perform this transaction, the account balance would become negative. Please specify a different amount of money.',
                transfer: 'If you would make this transfer, the account balance of the account you want to transfer from would become negative. Please specify a different amount of money.'
            },
            edit: {
                transaction: {
                    sameMoneyAccount: 'If you would perform this transaction, the account balance would become negative. Please specify a different amount of money.',
                    differentMoneyAccount: {
                        oldMoneyAccountNegative: 'If you would perform this transaction, the old account balance would become negative. Please specify a different amount of money.',
                        newMoneyAccountNegative: 'If you would perform this transaction, the new account balance would become negative. Please specify a different amount of money or another account.'
                    }
                },
                transfer: {
                    sameMoneyAccounts: 'If you would make this transfer, the account balance of the account you want to transfer from would become negative. Please specify a different amount of money.',
                    differentMoneyAccounts: {
                        newFromNegative: 'If you would make this transfer, the account balance of the new account you want to transfer from would become negative. Please specify a different amount of money or another account ("From").',
                        oldToNegative: 'If you would make this transfer, the account balance of the old account you transferred to would become negative. Please specify a different amount of money or another account ("To").'
                    }
                }
            },
            delete: {
                transaction: 'Wenn Sie diese Transaktion löschen würden, würde der Kontostand negativ werden.',
                transfer: 'Würden Sie diese Umbuchung löschen, würde der Kontostand des Kontos, auf das Sie umgebucht haben, negativ werden.'
            }
        },
    },
    authenticationForms: {
        loginLabel: 'Login',
        signupLabel: 'Sign up',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Repeat Password'
    },
    logout: 'Logout',
    moneyFormat: {
        monetaryUnit: '$',
        format: () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    },
    errors: {
        login: {
            wrongUserData: 'Incorrect username or password.',
            serverUnavailable: 'The server is currently unavailable. Please try again later.'
        }
    },

};
