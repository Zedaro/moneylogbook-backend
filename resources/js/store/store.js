import Vuex from "vuex"
import Vue from "vue";
import { i18n } from "../languages/lang";
import axios from "axios";
Vue.use(Vuex)


export const store = new Vuex.Store({
    state: {
        loading: true,
        drawer: false,

        initialLocalStorage: ( () => {
            let obj = {
                languages: {
                    de: 'Deutsch',
                    "en-US": 'English (US)'
                },
                toolbarTitle: 'Übersicht',
                moneyAccounts: [
                    {
                        name: 'Sparkasse',
                        money: 1010.0,
                        color: "#EA0A8E"
                    },
                    {
                        name: 'ING DiBa',
                        money: 2000.0,
                        color: "#FF6600"
                    },
                    {
                        name: 'Bank 3000',
                        money: 3000.0,
                        color: "#00FFFB"
                    }
                ],
                transactions: [
                    {
                        //color: '#EA0A8E',
                        name: 'Robux',
                        description: 'Sophia ist süchtig...',
                        moneyAccount: 0,//'Sparkasse',
                        money: 10.0,
                        date: '2021-11-05'
                    }
                ],
                repeatingTransactions: [
                    {
                        color: '#EA0A8E',
                        name: 'Schweigegeld',
                        description: '...',
                        moneyAccount: 'Sparkasse',
                        money: 50.0,
                        startingDate: '2021-11-20',
                        endingDate: '2021-12-20',
                        rhythmNumber: 1,
                        rhythmType: 1,
                        weekdays: null,
                        rhythmText: 'Jeden Monat'
                    }
                ],
                transfers: [
                    {
                        colorFrom: '#FF6600',
                        colorTo: '#EA0A8E',
                        name: 'Umbuchung 1',
                        description: 'Test',
                        from: 'ING DiBa',
                        to: 'Sparkasse',
                        money: 10.0,
                        date: '2021-11-05'
                    }
                ]
            };
            obj.totalMoney = obj.moneyAccounts[0].money + obj.moneyAccounts[1].money;

            return obj;
        }),
        initialLocalStorageLaravel: ( (data) => {
            let obj = {
                languages: {
                    de: 'Deutsch',
                    "en-US": 'English (US)'
                },
                toolbarTitle: 'Übersicht',
                moneyAccounts: [
                    // {
                    //     name: 'Sparkasse',
                    //     money: 1010.0,
                    //     color: "#EA0A8E"
                    // },
                    // {
                    //     name: 'ING DiBa',
                    //     money: 2000.0,
                    //     color: "#FF6600"
                    // },
                    // {
                    //     name: 'Bank 3000',
                    //     money: 3000.0,
                    //     color: "#00FFFB"
                    // }
                    // {
                    //   name: data[0].name,
                    //   money: data[0].money,
                    //   color: data[0].color
                    // },
                    // {
                    //     name: data[1].name,
                    //     money: data[1].money,
                    //     color: data[1].color
                    // },
                    // {
                    //     name: data[2].name,
                    //     money: data[2].money,
                    //     color: data[2].color
                    // },

                ],
                transactions: [
                    // {
                    //     color: '#EA0A8E',
                    //     name: 'Robux',
                    //     description: 'Sophia ist süchtig...',
                    //     moneyAccount: 'Sparkasse',
                    //     money: 10.0,
                    //     date: '2021-11-05'
                    // }
                ],
                repeatingTransactions: [
                    {
                        color: '#EA0A8E',
                        name: 'Schweigegeld',
                        description: '...',
                        moneyAccount: 'Sparkasse',
                        money: 50.0,
                        startingDate: '2021-11-20',
                        endingDate: '2021-12-20',
                        rhythmNumber: 1,
                        rhythmType: 1,
                        weekdays: null,
                        rhythmText: 'Jeden Monat'
                    }
                ],
                transfers: [
                    {
                        colorFrom: '#FF6600',
                        colorTo: '#EA0A8E',
                        name: 'Umbuchung 1',
                        description: 'Test',
                        from: 'ING DiBa',
                        to: 'Sparkasse',
                        money: 10.0,
                        date: '2021-11-05'
                    }
                ]
            };

            obj.totalMoney = null;
            data.moneyAccounts.forEach(moneyAccount => {
                obj.moneyAccounts.push(moneyAccount);
                obj.totalMoney += moneyAccount.money;
            });
            data.transactions.forEach(transaction => {
                obj.transactions.push(transaction);
            });

            return obj;
        } ),
        localStorage: null,
        // {
        //     languages: {},
        //     toolbarTitle: '',
        //     moneyAccounts: [],
        //     transactions: [],
        //     repeatingTransactions: [],
        //     transfers: []
        // },

        languages: null,
        toolbarTitle: null,

        moneyAccounts: null,
        transactions: null,
        repeatingTransactions: null,
        transfers: null,
        totalMoney: null
    },

    /*
    {
        drawer: false,
        toolbarTitle: 'Übersicht',
        moneyAccounts: [
            {
                name: 'Sparkasse',
                money: 1000,
                color: "#EA0A8E"
            },
            {
                name: 'ING DiBa',
                money: 2000,
                color: "#FF6600"
            }
        ]
    },
*/
    getters: {

        getMoneyAccount(state) {
            return (accountName) => state.localStorage.moneyAccounts.find(account => account.name === accountName);
        },
        getMoneyAccountById(state) {
            return (id) => state.localStorage.moneyAccounts.find(account => account.id === id);
        },
        getMoneyAccountByIndex(state) {
            return (index) => state.localStorage.moneyAccounts[index];
        },
        getTransaction(state) {
            return (index) => state.localStorage.transactions[index];
        },
        getTransactionById(state) {
            return (id) => state.localStorage.transactions.find(transaction => transaction.id == id);
        },
        getRepeatingTransaction(state) {
            return (index) => state.localStorage.repeatingTransactions[index];
        },
        getTransfer(state) {
            return (index) => state.localStorage.transfers[index];
        },
        getColor(state, getters) {
            return (id) => getters.getMoneyAccountById(id).color;
        },



        getLocalStorage() {
            return JSON.parse(localStorage.getItem('state'));
        },
        getState(state) {
            return state;
        },
        getDrawer: state => {
            return state.drawer;
        },
        getDrawerListItems(state) {
            return state.drawerListItems;
        },
        getToolbarTitle(state) {
            return state.localStorage.toolbarTitle;
        },
        getMoneyAccounts(state) {
            return state.localStorage.moneyAccounts; //state.moneyAccounts;
        },
        getMoney(state) {
            const unformattedMoney = state.localStorage.moneyAccounts[this.$route.params.item].money;
            const formattedMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(unformattedMoney).replace('€');
            return formattedMoney;
        },
        getTotalMoney(state) {
            return state.localStorage.totalMoney;
        },

        getMoneyAccountNames(state) {
            let names = [];
            state.localStorage.moneyAccounts.forEach( (account) => names.push(account.name) );
            return names;
        },
        getMoneyAccountSelectionItems(state) {
            let selectionItems = [];

            state.localStorage.moneyAccounts.forEach( moneyAccount => {
                selectionItems.push({
                    text: moneyAccount.name,
                    value: moneyAccount.id,
                    disabled: false
                })
            })

            return selectionItems;
        },
        getTransactions(state) {
            return state.localStorage.transactions;
        },
        getRepeatingTransactions(state) {
            return state.localStorage.repeatingTransactions;
        },
        getTransfers(state) {
            return state.localStorage.transfers;
        }
    },
    actions: {

        updateLocalStorage(context) {

            localStorage.setItem('state', JSON.stringify(context.state.localStorage));

        },
        async setLocalStorage(context, reset) {

            let data = null;

            await axios.get('/getData')
                .then(function(response) {
                    console.log('getData response:', response);

                    data = response.data
                });

            // await axios.post('/testMoneyAccountsController', { moneyAccountId: 2, newBalance: 5000.00 })
            //     .then((response) => {
            //        console.log('test:');
            //        console.log(response.data);
            //     });

            if(reset) {
                localStorage.clear();

                localStorage.setItem('state', JSON.stringify(context.state.initialLocalStorageLaravel(data)));
                console.log("state.localStorage after reset:", context.state.localStorage);
                window.location.reload();
            }

            context.commit('setLocalStorage', data);
        },

        getAllData(context) {
            axios.get('/getData')
        },



        setState(context) {
            context.commit('setState');
        },
        setDrawer(context) {
            context.commit("setDrawer");
        },
        setTitle(context, title) {
            context.commit('setTitle', title);
        },
        updateTotalMoney(context) {
            let totalMoney = 0;
            const moneyAccounts = context.state.localStorage.moneyAccounts;
            moneyAccounts.forEach(account => totalMoney += account.money);
            context.commit('updateTotalMoney', parseFloat( totalMoney.toFixed(2) ));
        },

        async saveMoneyAccount(context, data) {
            //New MoneyAccount
            if(data.item === 'new') {

                await axios.post('/saveNewMoneyAccount', data)
                    .then( (response) => {
                        console.log('response saveNewMoneyAccount:');
                        console.log(response.data);
                        return response.data;
                    } )
                    .then( function(response) {
                        context.commit('saveNewMoneyAccount', response);
                    } );

                //context.commit('saveNewMoneyAccount', data);

            }
            //Edit MoneyAccount
            else {

                data.id = context.getters.getMoneyAccountByIndex(data.item).id;

                console.log('updateMoneyAccount: posted data:');
                console.log(data);

                await axios.post('/updateMoneyAccount', data)
                    .then((response) => {
                        console.log('updateMoneyAccount response:');
                        console.log(response);
                        context.commit('saveEditedMoneyAccount', { moneyAccountIndex: data.item , updatedData: response.data } );
                    });

            }



            //update localStorage
            context.dispatch('updateLocalStorage');
            console.log('localStorage updated');
        },
        async deleteMoneyAccount(context, data) {

            await axios.delete('/deleteMoneyAccount', { data: { id: data.id } })
                .then(() => {

                    context.commit('deleteMoneyAccount', { index: data.index });

                    //update localStorage
                    context.dispatch('updateLocalStorage');
                });

        },

        async saveTransaction(context, data) {
            //New Transaction
            if(data.item === 'new') {
                const balance = data.moneyAccount.money;
                const newBalance = parseFloat( ( balance + data.money ).toFixed(2) )

                if(newBalance < 0) {
                    return i18n.t('form.errorMessages.new.transaction');
                }
                else {
                    data.newBalance = newBalance;

                    await axios.post('/saveNewTransaction', data)
                        .then((response) => context.commit('saveNewTransaction', { transaction: response.data, moneyAccount: data.moneyAccount, newBalance: data.newBalance }));

                }
            }
            //Edit Transaction
            else {
                //hol dir alte und neue Transaktion. Vergleiche im if statement, ob sie den gleichen moneyAccount haben
                data.oldTransaction = context.getters.getTransaction(data.item);

                //Edit Transaction without new moneyAccount, i.e. with the same moneyAccount as before
                if(data.oldTransaction.moneyAccountId === data.moneyAccountId) {

                    const balance = data.moneyAccount.money;
                    const newBalance = parseFloat( ( balance + (data.money - data.oldTransaction.money) ).toFixed(2) )

                    if(newBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transaction.sameMoneyAccount');
                    }
                    else {
                        data.newBalance = newBalance;
                        data.id = context.state.localStorage.transactions[data.item].id;

                        await axios.post('/updateTransaction', data /*{ transaction: data, moneyAccount: { moneyAccountId: data.moneyAccountId, newBalance: newBalance }}*/ )
                            .then((response) => {
                                console.log('response saveTransaction:', response);

                                context.commit('saveEditedTransaction', { transaction: response.data, transactionIndex: data.item, moneyAccountIndex: context.state.localStorage.moneyAccounts.findIndex(account => account.id == data.moneyAccountId), newBalance: newBalance });
                            });

                    }
                }
                //Edit transaction with new moneyAccount
                else {

                    data.oldAccount = context.getters.getMoneyAccountById(data.oldTransaction.moneyAccountId); //context.state.localStorage.moneyAccounts.find(account => account.id === data.oldTransaction.moneyAccountId); //context.getters.getMoneyAccount(data.oldTransaction.moneyAccount); //context.state.localStorage.moneyAccounts.find(account => account.name === data.oldTransaction.moneyAccount);

                    const newTransaction = data.money;


                    //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
                    const oldAccount_newBalance = parseFloat( ( data.oldAccount.money - data.oldTransaction.money ).toFixed(2) );

                    //Neuen Betrag auf neues Konto anrechnen
                    const newAccount = data.moneyAccount //context.state.localStorage.moneyAccounts[data.moneyAccount];
                    const newAccount_newBalance =  parseFloat( ( newAccount.money + newTransaction ).toFixed(2) );

                    console.log("newAccount:", newAccount);

                    if(oldAccount_newBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transaction.differentMoneyAccount.oldMoneyAccountNegative');
                    }
                    else if(newAccount_newBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transaction.differentMoneyAccount.newMoneyAccountNegative');
                    }
                    else {
                        data.oldAccount_newBalance = oldAccount_newBalance;
                        data.newAccount_newBalance = newAccount_newBalance;

                        data.id = context.state.localStorage.transactions[data.item].id;

                        await axios.post("/updateTransaction", data)
                            .then((response) => {
                               console.log("saveTransaction - with new money account - response:", response);

                                context.commit('saveEditedTransactionWithNewMoneyAccount', { data: data, transaction: response.data });
                            });

                    }
                }
            }

            //update localStorage
            context.dispatch('updateLocalStorage');
        },
        async deleteTransaction(context, data) {
            data.transactionToDelete = context.getters.getTransaction(data.item); //context.state.localStorage.transactions[data.item];
            data.account = context.getters.getMoneyAccountById(data.transactionToDelete.moneyAccountId);  //context.getters.getMoneyAccount(data.transactionToDelete.moneyAccount); //context.state.localStorage.moneyAccounts.find(account => account.name === data.transactionToDelete.moneyAccount);

            const balance = data.account.money;
            const newBalance = parseFloat( ( balance - data.transactionToDelete.money ).toFixed(2) )

            if(newBalance < 0) {
                return i18n.t('form.errorMessages.delete.transaction');
            }
            else {
                data.newBalance = newBalance;

                await axios.delete("/deleteTransaction", { data: { transactionId: data.transactionToDelete.id, moneyAccountId: data.account.id, newBalance: newBalance } })
                    .then(() => {
                        //console.log("deleteTransaction response:", response);

                        context.commit('deleteTransaction', data);

                    });

            }

            //update localStorage
            context.dispatch('updateLocalStorage');
        },

        saveRepeatingTransaction(context, data) {
            data.accountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.moneyAccount);

            if(data.item === 'new') {
                context.commit('saveNewRepeatingTransaction', data);
            } else {
                //hol dir alte und neue Transaktion. Vergleiche die moneyAccount Einträge
                /*
                const oldTransaction = context.state.localStorage.transactions[data.item];
                data.oldTransaction = oldTransaction;
                if(oldTransaction.moneyAccount === data.moneyAccount) {
                    context.commit('saveEditedTransaction', data);
                } else {
                    data.oldAccountIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === oldTransaction.moneyAccount);
                    context.commit('saveEditedTransactionWithNewMoneyAccount', data);
                }
                */
                context.commit('saveEditedRepeatingTransaction', data);
            }

            //update localStorage
            context.dispatch('updateLocalStorage');
        },
        deleteRepeatingTransaction(context, data) {
            context.commit('deleteRepeatingTransaction', data);

            //update localStorage
            context.dispatch('updateLocalStorage');
        },

        saveTransfer(context, data) {
            data.fromAccount = context.state.localStorage.moneyAccounts.find(account => account.name === data.from);
            data.toAccount = context.state.localStorage.moneyAccounts.find(account => account.name === data.to);

            //Neue Umbuchung
            if(data.item === 'new') {
                const newFromBalance = parseFloat( (data.fromAccount.money - data.money).toFixed(2) );
                if(newFromBalance < 0) {
                    return i18n.t('form.errorMessages.new.transfer');
                }
                context.commit('saveNewTransfer', data);
            }
            //Umbuchung bearbeiten
            else {
                //Save old transfer in data
                data.oldTransfer = context.state.localStorage.transfers[data.item];

                const oldTransfer = data.oldTransfer.money;
                const newTransfer = data.money;

                //Umbuchung bearbeiten - ohne Kontoänderung
                if(data.oldTransfer.from === data.from  &&  data.oldTransfer.to === data.to) {
                    //if newBalance would be negative, return dialog text
                    const newFromBalance = parseFloat( ( data.fromAccount.money - (newTransfer - oldTransfer) ).toFixed(2) );
                    if(newFromBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transfer.sameMoneyAccounts');
                    }
                    //else saveEditedTransfer
                    context.commit('saveEditedTransfer', data);
                }
                //Umbuchung bearbeiten - mit Kontoänderung
                else {
                    //save indexes of the from and to accounts of the oldTransfer
                    data.oldTransfer.fromIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.oldTransfer.from);
                    data.oldTransfer.toIndex = context.state.localStorage.moneyAccounts.findIndex(account => account.name === data.oldTransfer.to);

                    //save the from and to account of the oldTransaction
                    data.oldFromAccount = context.state.localStorage.moneyAccounts[data.oldTransfer.fromIndex];
                    data.oldToAccount = context.state.localStorage.moneyAccounts[data.oldTransfer.toIndex];

                    //from und to haben sich geändert
                    if(data.oldTransfer.from !== data.from  &&  data.oldTransfer.to !== data.to) {

                        //if newFromBalance negative, return dialog text
                        const newFromBalance = parseFloat( (data.fromAccount.money - data.money).toFixed(2) );
                        if(newFromBalance < 0) {
                            return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.newFromNegative');
                        }

                        //if balance of the old to account would be negative, return dialog text
                        const toBalance = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
                        if(toBalance < 0) {
                            return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.oldToNegative');
                        }

                        //if both isn't the case, saveEditedTransferWithNewFromTo
                        context.commit('saveEditedTransferWithNewFromTo', data);
                    }
                    //from hat sich geändert
                    else if(data.oldTransfer.from !== data.from) {
                        //if newFromBalance negative, return dialog text
                        const newFromBalance = parseFloat( (data.fromAccount.money - data.money).toFixed(2) );
                        if(newFromBalance < 0) {
                            return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.newFromNegative');
                        }
                        //else saveEditedTransferWithNewFrom
                        context.commit('saveEditedTransferWithNewFrom', data);
                    }
                    //to hat sich geändert
                    else {

                        //if balance of the old to account would be negative, return dialog text
                        const toBalance = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
                        if(toBalance < 0) {
                            return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.oldToNegative');
                        }
                        //else saveEditedTransferWithNewTo
                        context.commit('saveEditedTransferWithNewTo', data);
                    }
                }
            }

            //update localStorage
            context.dispatch('updateLocalStorage');
        },
        deleteTransfer(context, data) {
            data.transferToDelete = context.state.localStorage.transfers[data.item];

            data.fromAccount = context.state.localStorage.moneyAccounts.find(account => account.name === data.transferToDelete.from);
            data.toAccount = context.state.localStorage.moneyAccounts.find(account => account.name === data.transferToDelete.to);

            //data.fromAccount = context.state.localStorage.moneyAccounts[fromIndex];
            //data.toAccount = context.state.localStorage.moneyAccounts[toIndex];

            //if balance of the to account would get negative, return dialog text
            const toBalance = parseFloat( ( data.toAccount.money - data.transferToDelete.money ).toFixed(2) );
            if(toBalance < 0) {
                return i18n.t('form.errorMessages.delete.transfer');
            }
            //else deleteTransfer
            context.commit('deleteTransfer', data);


            //update localStorage
            context.dispatch('updateLocalStorage');
        },

        // eslint-disable-next-line no-unused-vars
        test(context, data) {
            return "Hello World";
        }
    },
    mutations: {
        /*
        updateLocalStorage(state) {
            localStorage.setItem('state', JSON.stringify(state));
        },
        setState(state) {
            state.moneyAccounts = JSON.parse(localStorage.getItem('state')).moneyAccounts;
        },
        */
        setLocalStorage(state, data) {
            state.localStorage = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : state.initialLocalStorageLaravel(data);

            state.moneyAccounts = data.moneyAccounts;
            state.transactions = data.transactions;
            console.log('Money Accounts from DB:', state.moneyAccounts);

            state.loading = false;

            // axios.get('/getData')
            //     .then( function(response) {
            //         state.moneyAccounts = response.data.moneyAccounts;
            //         state.transactions = response.data.transactions;
            //         console.log('Money Accounts from DB:');
            //         console.log(state.moneyAccounts);
            //     } );
        },
        setDrawer(state) {
            state.drawer = !state.drawer;
        },
        setTitle(state, title) {
            state.localStorage.toolbarTitle = title;
        },
        updateTotalMoney(state, updatedTotalMoney) {
            //update totalMoney entry in state
            state.localStorage.totalMoney = updatedTotalMoney;

            //update localStorage
            localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewMoneyAccount(state, moneyAccount) {
            //save moneyAccount in state
            state.localStorage.moneyAccounts.push(moneyAccount);

            console.log('committed');

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedMoneyAccount(state, { moneyAccountIndex, updatedData }) {
            //update moneyAccount entry in state
            //state.localStorage.moneyAccounts[data.item] = { name: data.name, money: data.money, color: data.color };
            state.localStorage.moneyAccounts[moneyAccountIndex] = updatedData;


            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteMoneyAccount(state, { index }) {
            //delete moneyAccount in state
            state.localStorage.moneyAccounts.splice(index, 1);

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewTransaction(state, {transaction, moneyAccount, newBalance}) {
            //state.localStorage.moneyAccounts[data.accountIndex].money += data.money;
            //const floatFormat = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2,});
            //const oldBalance = state.localStorage.moneyAccounts[data.accountIndex].money;
            //const newBalance = parseFloat(floatFormat.format(oldBalance + data.money));
            //state.localStorage.moneyAccounts[data.accountIndex].money = newBalance;

            //save transaction entry in state
            state.localStorage.transactions.push( transaction /*{ name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccountId, date: data.date }*/);

            //update account balance
            moneyAccount.money = newBalance;

            //save moneyAccount as variable
            //const account = state.localStorage.moneyAccounts[data.accountIndex];


            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransaction(state, { transaction, transactionIndex, moneyAccountIndex, newBalance }) {
            //const newTransaction = data.money;
            //const oldTransaction = data.oldTransaction.money;
            //const account = state.localStorage.moneyAccounts[data.accountIndex];

            //update account balance
            state.localStorage.moneyAccounts[moneyAccountIndex].money = newBalance;
            //update transaction entry in state

            console.log("saveEditedTransaction - transactionIndex:", transactionIndex);
            console.log("saveEditedTransaction - transactions[transactionIndex before store entry is edited:]", state.localStorage.transactions[transactionIndex]);

            state.localStorage.transactions[transactionIndex] = transaction; /*color: data.color,*/ //name: transaction.name, description: transaction.description, money: transaction.money, moneyAccount: transaction.moneyAccountId, date: transaction.date };

            console.log("saveEditedTransaction - transactions[transactionIndex after store entry is edited:]", state.localStorage.transactions[transactionIndex]);

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransactionWithNewMoneyAccount(state, { data, transaction }) {
            //const newTransaction = data.money;
            //const oldTransaction = data.oldTransaction.money;

            //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
            //const oldAccount = state.localStorage.moneyAccounts[data.oldAccountIndex];
            data.oldAccount.money = data.oldAccount_newBalance;

            //Neuen Betrag auf neues Konto anrechnen
            //const newAccount = state.localStorage.moneyAccounts[data.accountIndex]
            data.moneyAccount.money =  data.newAccount_newBalance;

            //update transaction entry in state
            state.localStorage.transactions[data.item] = transaction; /*name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccountId, date: data.date*/

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteTransaction(state, data) {
            //undo transaction
            data.account.money =  data.newBalance;
            //delete transaction entry in state
            state.localStorage.transactions.splice(data.item, 1);

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewRepeatingTransaction(state, data) {
            //save repeatingTransaction entry
            state.localStorage.repeatingTransactions.push({ color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, startingDate: data.startingDate, endingDate: data.endingDate, rhythmNumber: data.rhythmNumber, rhythmType: data.rhythmType, weekdays: data.weekdays, rhythmText: data.rhythmText });
            //state.localStorage.moneyAccounts[data.accountIndex].money += data.money;

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
            //console.log(state.localStorage.repeatingTransactions);
        },
        saveEditedRepeatingTransaction(state, data) {
            console.log('Hi');

            //update repTransaction entry
            state.localStorage.repeatingTransactions[data.item] = { color: data.color, name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccount, startingDate: data.startingDate, endingDate: data.endingDate, rhythmNumber: data.rhythmNumber, rhythmType: data.rhythmType, weekdays: data.weekdays, rhythmText: data.rhythmText };

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        deleteRepeatingTransaction(state, data) {
            //delete repTransaction entry
            state.localStorage.repeatingTransactions.splice(data.item, 1);

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },

        saveNewTransfer(state, data) {
            //save transfer entry
            state.localStorage.transfers.push({ colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date });

            //update balances of from and to
            data.fromAccount.money = parseFloat( ( data.fromAccount.money - data.money ).toFixed(2) );
            data.toAccount.money = parseFloat( ( data.toAccount.money + data.money ).toFixed(2) );

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransfer(state, data) {
            const oldTransfer = data.oldTransfer.money;
            const newTransfer = data.money;

            //update balances of from and to
            data.fromAccount.money = parseFloat( ( data.fromAccount.money - (newTransfer - oldTransfer) ).toFixed(2) );
            data.toAccount.money = parseFloat( ( data.toAccount.money + (newTransfer - oldTransfer) ).toFixed(2) ) ;

            //update transfer entry and localStorage
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransferWithNewFromTo(state, data) {
            const oldTransfer = data.oldTransfer.money;
            const newTransfer = data.money;
            //Geld beim alten from wiederherstellen
            data.oldFromAccount.money = parseFloat( ( data.oldFromAccount.money + oldTransfer ).toFixed(2) );
            //Umbuchung vom neuen from abrechnen
            data.fromAccount.money = parseFloat( ( data.fromAccount.money - newTransfer ).toFixed(2) );
            //Geld vom alten to wieder abziehen
            data.oldToAccount.money = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
            //Umbuchung auf das neue to rechnen
            data.toAccount.money = parseFloat( ( data.toAccount.money + newTransfer ).toFixed(2) );

            //update transfer entry and localStorage
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        },
        saveEditedTransferWithNewFrom(state, data) {
            const oldTransfer = data.oldTransfer.money;
            const newTransfer = data.money;

            //Geld beim alten from wiederherstellen
            data.oldFromAccount.money = parseFloat( ( data.oldFromAccount.money + oldTransfer ).toFixed(2) );
            //Umbuchung vom neuen from abrechnen
            data.fromAccount.money = parseFloat( ( data.fromAccount.money - newTransfer ).toFixed(2) );
            //to updaten
            data.toAccount.money = parseFloat( ( data.toAccount.money + (newTransfer - oldTransfer) ).toFixed(2) );

            //update transfer entry and localStorage
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            //localStorage.setItem('state', JSON.stringify(state.localStorage));


        },
        saveEditedTransferWithNewTo(state, data) {
            const oldTransfer = data.oldTransfer.money;
            const newTransfer = data.money;

            //Geld vom alten to wieder abziehen
            data.oldToAccount.money = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
            //Umbuchung auf das neue to rechnen
            data.toAccount.money = parseFloat( ( data.toAccount.money + newTransfer ).toFixed(2) );
            //from updaten
            data.fromAccount.money = parseFloat( ( data.fromAccount.money - (newTransfer - oldTransfer) ).toFixed(2) );

            //update transfer entry and localStorage
            state.localStorage.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
            //localStorage.setItem('state', JSON.stringify(state.localStorage));

        },
        deleteTransfer(state, data) {
            //Undo transfer in from and to
            data.fromAccount.money += data.transferToDelete.money;
            data.toAccount.money -= data.transferToDelete.money;

            //delete transfer entry
            state.localStorage.transfers.splice(data.item, 1);

            //update localStorage
            //localStorage.setItem('state', JSON.stringify(state.localStorage));
        }
    }
});

//parseFloat( (  ).toFixed(2) )
