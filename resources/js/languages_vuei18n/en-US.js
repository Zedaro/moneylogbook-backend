import validationEN from '../validation/en-US.json';

export default {

    headerTitle: {
        moneyAccounts: 'Overview',
        transactions: 'Transactions',
        repeatingTransactions: 'Repeating Transactions',
        transfers: 'Transfers',
        playground: 'Playground',
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
    navigationTitles: [ 'Overview', 'Transactions', 'Repeating Transactions', 'Transfers', 'Backend-Tests', 'Playground' ],
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
        permissionDialog: {
            delete: 'Do you really want to delete the entry?',
            yes: 'Yes',
            no: 'No'
        },
    },
    archived: {
        moneyAccount: ' (deleted)',
    },
    authenticationForms: {
        loginLabel: 'Login',
        signupLabel: 'Sign up',
        forgotPasswordLabel: 'Forgot password',
        resetPasswordLabel: 'Reset password',
        sendEmail: 'Send password reset email',
        name: 'Name',
        email: 'Email',
        password: 'Password',
        newPassword: 'New password',
        confirmPassword: 'Repeat Password',
        forgotPassword: 'Forgot password?',
    },
    logout: 'Logout',
    moneyFormat: {
        monetaryUnit: '$',
        format: () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    },
    fields:{
        email: 'E-mail',
        password: 'Password'
    },
    validation: validationEN,
    errors: {
        serverUnavailable: 'The server is currently unavailable. Please try again later.',
        login: {
            wrongUserData: 'Incorrect username or password.',
        },
        signup: {
            userAlreadyExists: 'A user with this email address already exists.',
        },
        forgotPassword: {
            unregisteredEmail: 'Please enter a registered email address',
        },
        resetPassword: {
            linkExpired: 'The reset link has expired or you have entered an incorrect email address',
        },
    },
    success: {
        passwordResetEmailSent: 'The email has been sent! Click the link in the email to reset your password.',
        passwordReset: 'Your password has been successfully reset! You can now log in with your new password.'
    },
    flashMessage: {
        success: {
            saved: {
                moneyAccount: 'Money account was saved successfully ',
                transaction: 'Transaction was saved successfully',
                repeatingTransaction: 'Repeating transaction was saved successfully',
                transfer: 'Transfer was saved successfully',
            },
            deleted: {
                moneyAccount: 'Money account was deleted successfully ',
                transaction: 'Transaction was deleted successfully ',
                repeatingTransaction: 'Repeating transaction was deleted successfully ',
                transfer: 'Transfer was deleted successfully ',
            }
        },
        error: 'Something went wrong. Please try again later.'
    },

};
