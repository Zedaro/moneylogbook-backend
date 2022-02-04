import Vuex from "vuex"
import Vue from "vue";
import { i18n } from "../languages/lang";
import axios from "axios";
Vue.use(Vuex)

// function editTransferBalance(moneyAccount, balance) {
//
//     console.log('function call works! moneyAccount:', moneyAccount, "balance:", balance);
//
// }
//initialLocalStorageLaravel
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
        initialUserData: ( (data) => {
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
                    // {
                    //     id: 1,
                    //     name: 'Schweigegeld',
                    //     description: '...',
                    //     moneyAccountId: 1,
                    //     money: 50.0,
                    //     startingDate: '2021-11-20',
                    //     endingDate: '2021-12-20',
                    //     rhythmNumber: 1,
                    //     rhythmType: 1,
                    //     weekdays: null
                    // }
                ],
                transfers: [
                    // {
                    //     colorFrom: '#FF6600',
                    //     colorTo: '#EA0A8E',
                    //     name: 'Umbuchung 1',
                    //     description: 'Test',
                    //     from: 'ING DiBa',
                    //     to: 'Sparkasse',
                    //     money: 10.0,
                    //     date: '2021-11-05'
                    // }
                ]
            };

            console.log("data.transfers:", data.transfers);

            obj.totalMoney = null;
            data.moneyAccounts.forEach(moneyAccount => {
                obj.moneyAccounts.push(moneyAccount);
                obj.totalMoney += moneyAccount.money;
            });
            data.transactions.forEach(transaction => {
                obj.transactions.push(transaction);
            });
            data.transfers.forEach(transfer => {
                obj.transfers.push(transfer);
            });
            data.repTransactions.forEach(repTransaction => {
                obj.repeatingTransactions.push(repTransaction);
            });

            return obj;
        } ),
        userData: null,
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
            return (accountName) => state.userData.moneyAccounts.find(account => account.name === accountName);
        },
        getMoneyAccounts(state) {
            return state.userData.moneyAccounts; //state.moneyAccounts;
        },
        getMoneyAccountById(state) {
            return (id) => state.userData.moneyAccounts.find(account => account.id === id);
        },
        getMoneyAccountByIndex(state) {
            return (index) => state.userData.moneyAccounts[index];
        },
        getMoneyAccountNames(state) {
            let names = [];
            state.userData.moneyAccounts.forEach( (account) => names.push(account.name) );
            return names;
        },
        getMoneyAccountSelectionItems(state) {
            let selectionItems = [];

            state.userData.moneyAccounts.forEach( moneyAccount => {
                selectionItems.push({
                    text: moneyAccount.name,
                    value: moneyAccount.id,
                    disabled: false
                })
            })

            return selectionItems;
        },

        getTransaction(state) {
            return (index) => state.userData.transactions[index];
        },
        getTransactions(state) {
            return state.userData.transactions;
        },
        getTransactionById(state) {
            return (id) => state.userData.transactions.find(transaction => transaction.id == id);
        },

        getRepeatingTransaction(state) {
            return (index) => state.userData.repeatingTransactions[index];
        },
        getRepeatingTransactions(state) {
            return state.userData.repeatingTransactions;
        },
        getRepeatingTransactionById(state) {
            return (id) => state.userData.repeatingTransactions.find(repTransaction => repTransaction.id == id);
        },

        getTransfer(state) {
            return (index) => state.userData.transfers[index];
        },
        getTransfers(state) {
            return state.userData.transfers;
        },
        getTransferByIndex(state) {
          return (index) => state.userData.transfers[index];
        },

        getMoney(state) {
            const unformattedMoney = state.userData.moneyAccounts[this.$route.params.item].money;
            const formattedMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(unformattedMoney).replace('€');
            return formattedMoney;
        },
        getTotalMoney(state) {
            return state.userData.totalMoney;
        },

        getState(state) {
            return state;
        },
        getColor(state, getters) {
            return (id) => getters.getMoneyAccountById(id).color;
        },
        getToolbarTitle(state) {
            return state.userData.toolbarTitle;
        },

        getDrawer: state => {
            return state.drawer;
        },
        getDrawerListItems(state) {
            return state.drawerListItems;
        },

    },
    actions: {

        async getUserData(context) {

            let data = null;

            await axios.get('/getData')
                .then(function(response) {
                    console.log('getData response:', response);

                    data = response.data
                });

            context.commit('setUserData', data);

        },
        async refreshDB(context) {

            await axios.get('/refreshDB')
                .then(() => {
                    window.location.reload();
                })

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
            const moneyAccounts = context.state.userData.moneyAccounts;
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

        },
        async deleteMoneyAccount(context, data) {

            await axios.delete('/deleteMoneyAccount', { data: { id: data.id } })
                .then(() => {

                    context.commit('deleteMoneyAccount', { index: data.index });

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
                        data.id = context.state.userData.transactions[data.item].id;

                        await axios.post('/updateTransaction', data /*{ transaction: data, moneyAccount: { moneyAccountId: data.moneyAccountId, newBalance: newBalance }}*/ )
                            .then((response) => {
                                console.log('response saveTransaction:', response);

                                context.commit('saveEditedTransaction', { transaction: response.data, transactionIndex: data.item, moneyAccountIndex: context.state.userData.moneyAccounts.findIndex(account => account.id == data.moneyAccountId), newBalance: newBalance });
                            });

                    }
                }
                //Edit transaction with new moneyAccount
                else {

                    data.oldAccount = context.getters.getMoneyAccountById(data.oldTransaction.moneyAccountId); //context.state.userData.moneyAccounts.find(account => account.id === data.oldTransaction.moneyAccountId); //context.getters.getMoneyAccount(data.oldTransaction.moneyAccount); //context.state.userData.moneyAccounts.find(account => account.name === data.oldTransaction.moneyAccount);

                    const newTransaction = data.money;


                    //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
                    const oldAccount_newBalance = parseFloat( ( data.oldAccount.money - data.oldTransaction.money ).toFixed(2) );

                    //Neuen Betrag auf neues Konto anrechnen
                    const newAccount = data.moneyAccount //context.state.userData.moneyAccounts[data.moneyAccount];
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

                        data.id = context.state.userData.transactions[data.item].id;

                        await axios.post("/updateTransaction", data)
                            .then((response) => {
                               console.log("saveTransaction - with new money account - response:", response);

                                context.commit('saveEditedTransactionWithNewMoneyAccount', { data: data, transaction: response.data });
                            });

                    }
                }
            }

        },
        async deleteTransaction(context, data) {

            data.transactionToDelete = context.getters.getTransaction(data.item); //context.state.userData.transactions[data.item];
            data.account = context.getters.getMoneyAccountById(data.transactionToDelete.moneyAccountId);  //context.getters.getMoneyAccount(data.transactionToDelete.moneyAccount); //context.state.userData.moneyAccounts.find(account => account.name === data.transactionToDelete.moneyAccount);

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

        },

        async createRepeatingTransaction(context, repTransaction) {

            //Send post request to server; create new repTransaction entry in DB
            await axios.post("/saveNewRepeatingTransaction", repTransaction)
                .then((response) => {

                    const today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

                    //If the starting date is today, create the first transaction of this repeating transaction
                    if(repTransaction.startingDate == today) {

                        //Create transaction object
                        let transaction = {
                            item: "new",
                            name: repTransaction.name,
                            description: repTransaction.description,
                            moneyAccount: context.getters.getMoneyAccountById(repTransaction.moneyAccountId),
                            moneyAccountId: repTransaction.moneyAccountId,
                            money: parseFloat(repTransaction.money.toFixed(2)),   //.replace(/\./g, ','),
                            date: repTransaction.startingDate
                        };

                        //save the transaction
                        context.dispatch("saveTransaction", transaction);

                    }

                    //Attach id to the repTransaction object, for saving it in the state via a mutation
                    repTransaction.id = response.data;
                    //commit the creation
                    context.commit('saveNewRepeatingTransaction', repTransaction);

                });

        },
        async editRepeatingTransaction(context, repTransaction) {

            //Send post request to server; edit repTransaction entry in DB
            await axios.post("/updateRepeatingTransaction", repTransaction)
                .then((response) => {

                    //commit changes
                    context.commit('saveEditedRepeatingTransaction', repTransaction);

                });

        },
        async deleteRepeatingTransaction(context, { id, index }) {

            //Send delete request to server; send with id used for deletion of the repTransaction entry in the DB
            await axios.delete("/deleteRepeatingTransaction/" + id);

            //commit deletion
            context.commit('deleteRepeatingTransaction', index);

        },

        /**
         * Get necessary data, calculate new balances for from and to, check if from would become negative. If everything is alright, send post request and commit.
         * @param context
         * @param {Object} transfer What the user has written in the transfer form
         * @returns {Promise<*>}
         */
        async createTransfer(context, transfer) {

            //Get from and to
            let from = context.getters.getMoneyAccountById(transfer.fromId);
            let to = context.getters.getMoneyAccountById(transfer.toId);

            //Calculate new balances
            let fromAccountNewBalance = parseFloat( (from.money - transfer.money).toFixed(2) );
            let toAccountNewBalance = parseFloat( ( to.money + transfer.money ).toFixed(2) );

            //Check if from would get negative; Return error string if true
            if(fromAccountNewBalance < 0) {
                return i18n.t('form.errorMessages.new.transfer');
            }

            //Send Post Request to create a new transfer entry in the DB with the provided transfer data
            await axios.post("/saveNewTransfer", { transfer: transfer, newBalance: { from: fromAccountNewBalance, to: toAccountNewBalance } })

                .then((response) => {

                    //Id is null. Attach the ID to the transfer object. Needed for saving it in state.userData when calling the mutation
                    transfer.id = response.data.id;
                    //Calling the mutation for saving the transfer and its effects on the from and to money accounts
                    context.commit('saveNewTransfer', { transfer: transfer, from: { moneyAccount: from, newBalance: fromAccountNewBalance }, to: { moneyAccount: to, newBalance: toAccountNewBalance } });

                });

        },
        async editTransfer(context, { transfer, transferIndex }) {

            //get from and to
            let fromAccount = context.state.userData.moneyAccounts.find(account => account.id === transfer.fromId);
            let toAccount = context.state.userData.moneyAccounts.find(account => account.id === transfer.toId);

            //Get old transfer (for checking if from or to changed; for calculating new balances,
            // for getting the old from and to money accounts)
            let oldTransfer = context.state.userData.transfers[transferIndex];


            //Edit transfer - SAME moneyAccounts
            if (oldTransfer.fromId === transfer.fromId && oldTransfer.toId === transfer.toId) {

                //Calculate from and to balances
                let newFromBalance = parseFloat( (fromAccount.money - (transfer.money - oldTransfer.money) ).toFixed(2));
                let newToBalance = parseFloat((toAccount.money + (transfer.money - oldTransfer.money)).toFixed(2));

                //If newBalance would be negative, return error text
                if (newFromBalance < 0) {
                    return i18n.t('form.errorMessages.edit.transfer.sameMoneyAccounts');
                }

                //Post request to update transfer entry in DB, then commit
                await axios.post("/updateTransfer", { transfer: transfer, newBalance: { from: newFromBalance, to: newToBalance } })
                    .then((response) => {
                        context.commit('saveEditedTransfer', {
                            changedMoneyAccounts: 'none',
                            transfer: transfer,
                            transferIndex: transferIndex,
                            current: {
                                fromAccount: {
                                    account: fromAccount,
                                    newBalance: newFromBalance
                                },
                                toAccount: {
                                    account: toAccount,
                                    newBalance: newToBalance
                                }
                            }
                        });
                    });

            }

            //Edit transfer - different moneyAccount(s)
            else {

                //save the from and to account of the oldTransaction
                let oldFromAccount = context.getters.getMoneyAccountById(oldTransfer.fromId); //context.state.userData.moneyAccounts.find(account => account.id === oldTransfer.fromId);  //context.state.userData.moneyAccounts[oldTransferFromIndex];
                let oldToAccount = context.getters.getMoneyAccountById(oldTransfer.toId);  //context.state.userData.moneyAccounts.find(account => account.id === oldTransfer.toId);  //context.state.userData.moneyAccounts[oldTransferToIndex];


                //--------------------------------------------------------------------

                //Version where I check which moneyAccounts changed just for error checking. Then I just update the transfer and the moneyAccounts by using all data.

                //Which moneyAccounts were changed? From, to, or both? -> Needed for error checking
                let changedMoneyAccounts = null;
                if (oldTransfer.fromId !== transfer.fromId && oldTransfer.toId !== transfer.toId)
                    changedMoneyAccounts = 'both';
                else if (oldTransfer.fromId !== transfer.fromId)
                    changedMoneyAccounts = 'from';
                else
                    changedMoneyAccounts = 'to';

                //Error checking for changed from or to accounts or both (-> would the moneyAccount(s) become negative?)
                if (changedMoneyAccounts === 'from') {

                    //if newFromBalance negative, return dialog text
                    const newFromBalance = parseFloat((fromAccount.money - transfer.money).toFixed(2));
                    if (newFromBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.newFromNegative');
                    }

                }
                if (changedMoneyAccounts === 'to') {

                    //if balance of the old to account would be negative, return dialog text
                    const oldToNewBalance = parseFloat((oldToAccount.money - oldTransfer.money).toFixed(2));
                    if (oldToNewBalance < 0) {
                        return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.oldToNegative');
                    }

                }


                //Commit: calculate balances of the accounts (old from & to, current from & to) + save transfer in state
                context.commit('saveEditedTransfer', {
                    changedMoneyAccounts: changedMoneyAccounts,
                    transfer: transfer,
                    transferIndex: transferIndex,
                    current: {
                        fromAccount: fromAccount,
                        toAccount: toAccount,
                    },
                    old: {
                        fromAccount: oldFromAccount,
                        toAccount: oldToAccount,
                        transfer: {
                            money: oldTransfer.money
                        }
                    }
                });

                //Send post request to server -> update transfer + affected moneyAccounts
                axios.post('/updateTransfer', {
                    changedMoneyAccounts: changedMoneyAccounts,
                    transfer: transfer,
                    // current: {
                    //     fromAccount: fromAccount,
                    //     toAccount: toAccount
                    // },
                    // old: {
                    //     fromAccount: oldFromAccount,
                    //     toAccount: oldToAccount
                    // }
                    current: {
                        fromAccount: {
                            id: fromAccount.id,
                            balance: fromAccount.money
                        },
                        toAccount: {
                            id: toAccount.id,
                            balance: toAccount.money
                        }
                    },
                    old: {
                        fromAccount: {
                            id: oldFromAccount.id,
                            balance: oldFromAccount.money
                        },
                        toAccount: {
                            id: oldToAccount.id,
                            balance: oldToAccount.money
                        }
                    }
                });


                //--------------------------------------------------------------------

                //version where I check which moneyAccounts changed, then did different (but very similar) things for each case

                // //if BOTH (from & to) changed
                // if (oldTransfer.fromId !== transfer.fromId && oldTransfer.toId !== transfer.toId) {
                //
                //     //if newFromBalance negative, return dialog text
                //     const newFromBalance = parseFloat((fromAccount.money - transfer.money).toFixed(2));
                //     if (newFromBalance < 0) {
                //         return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.newFromNegative');
                //     }
                //
                //     //if balance of the old to account would be negative, return dialog text
                //     const oldToNewBalance = parseFloat((oldToAccount.money - oldTransfer.money).toFixed(2));
                //     if (oldToNewBalance < 0) {
                //         return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.oldToNegative');
                //     }
                //
                //     //Commit: calculate balances of the accounts (old from & to, current from & to) + save transfer in state
                //     context.commit('saveEditedTransfer', {
                //         changedMoneyAccounts: 'both',
                //         transfer: transfer,
                //         transferIndex: transferIndex,
                //         current: {
                //             fromAccount: fromAccount,
                //             toAccount: toAccount,
                //         },
                //         old: {
                //             fromAccount: oldFromAccount,
                //             toAccount: oldToAccount,
                //             transfer: {
                //                 money: oldTransfer.money
                //             }
                //         }
                //     });
                //
                //     axios.post('/updateTransfer', {
                //         changedMoneyAccounts: 'both',
                //         transfer: transfer,
                //         // current: {
                //         //     fromAccount: fromAccount,
                //         //     toAccount: toAccount
                //         // },
                //         // old: {
                //         //     fromAccount: oldFromAccount,
                //         //     toAccount: oldToAccount
                //         // }
                //         current: {
                //             fromAccount: {
                //                 id: fromAccount.id,
                //                 balance: fromAccount.money
                //             },
                //             toAccount: {
                //                 id: toAccount.id,
                //                 balance: toAccount.money
                //             }
                //         },
                //         old: {
                //             fromAccount: {
                //                 id: oldFromAccount.id,
                //                 balance: oldFromAccount.money
                //             },
                //             toAccount: {
                //                 id: oldToAccount.id,
                //                 balance: oldToAccount.money
                //             }
                //         }
                //     });
                //
                // }
                //
                // //Only FROM changed
                // else if (oldTransfer.fromId !== transfer.fromId) {
                //
                //     //if newFromBalance negative, return dialog text
                //     const newFromBalance = parseFloat((fromAccount.money - transfer.money).toFixed(2));
                //     if (newFromBalance < 0) {
                //         return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.newFromNegative');
                //     }
                //
                //
                //     context.commit('saveEditedTransfer', {
                //         changedMoneyAccounts: 'from',
                //         transfer: transfer,
                //         transferIndex: transferIndex,
                //         current: {
                //             fromAccount: fromAccount,
                //             toAccount: toAccount,
                //         },
                //         old: {
                //             fromAccount: oldFromAccount,
                //             transfer: {
                //                 money: oldTransfer.money
                //             }
                //         },
                //     });
                // }
                //
                // //Only TO changed
                // else {
                //
                //     //if balance of the old to account would get negative, return dialog text
                //     const toBalance = parseFloat((oldToAccount.money - oldTransfer.money).toFixed(2));
                //     if (toBalance < 0) {
                //         return i18n.t('form.errorMessages.edit.transfer.differentMoneyAccounts.oldToNegative');
                //     }
                //
                //     //else saveEditedTransferWithNewTo
                //     //context.commit('saveEditedTransferWithNewTo', data);
                //     context.commit('saveEditedTransfer', {
                //         changedMoneyAccounts: 'to',
                //         transfer: transfer,
                //         transferIndex: transferIndex,
                //         current: {
                //             fromAccount: fromAccount,
                //             toAccount: toAccount,
                //         },
                //         old: {
                //             toAccount: oldToAccount,
                //             transfer: {
                //                 money: oldTransfer.money
                //             }
                //         },
                //     });
                // }

            }

        },
        /**
         *
         * @param context
         * @param transferId {Number}
         * @param transferIndex {Number}
         * @returns {Promise<*>}
         */
        async deleteTransfer(context, { transferId, transferIndex }) {

            //Get transfer object from state
            let transfer = context.state.userData.transfers[transferIndex];

            //Get from and to account
            let fromAccount = context.getters.getMoneyAccountById(transfer.fromId);
            let toAccount = context.getters.getMoneyAccountById(transfer.toId);

            //Error checking: if balance of the to account would get negative, return dialog text
            const toBalance = parseFloat( ( toAccount.money - transfer.money ).toFixed(2) );
            if(toBalance < 0) {
                return i18n.t('form.errorMessages.delete.transfer');
            }


            //Commit deletion
            context.commit('deleteTransfer', {
                transferMoney: transfer.money,
                transferIndex: transferIndex,
                fromAccount: fromAccount,
                toAccount: toAccount
            });

            //Send delete request to server -> transfer entry is deleted + from and to account balances are updated
            axios.delete('/deleteTransfer', {
                data: {
                    id: transferId,
                    fromAccount: {
                        id: transfer.fromId,
                        balance: fromAccount.money
                    },
                    toAccount: {
                        id: transfer.toId,
                        balance: toAccount.money
                    }
                }
            })

        },
    },
    mutations: {

        setUserData(state, data) {

            state.userData = state.initialUserData(data);

            state.loading = false;

            //state.userData = localStorage.getItem('state') ? JSON.parse(localStorage.getItem('state')) : state.initialUserData(data);

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
            state.userData.toolbarTitle = title;
        },
        updateTotalMoney(state, updatedTotalMoney) {
            //update totalMoney entry in state
            state.userData.totalMoney = updatedTotalMoney;
        },

        saveNewMoneyAccount(state, moneyAccount) {

            //save moneyAccount in state
            state.userData.moneyAccounts.push(moneyAccount);

        },
        saveEditedMoneyAccount(state, { moneyAccountIndex, updatedData }) {

            //update moneyAccount entry in state
            //state.userData.moneyAccounts[data.item] = { name: data.name, money: data.money, color: data.color };
            state.userData.moneyAccounts[moneyAccountIndex] = updatedData;

        },
        deleteMoneyAccount(state, { index }) {

            //delete moneyAccount in state
            state.userData.moneyAccounts.splice(index, 1);

        },

        saveNewTransaction(state, {transaction, moneyAccount, newBalance}) {

            //save transaction entry in state
            state.userData.transactions.push( transaction /*{ name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccountId, date: data.date }*/);

            //update account balance
            moneyAccount.money = newBalance;

        },
        saveEditedTransaction(state, { transaction, transactionIndex, moneyAccountIndex, newBalance }) {
            //const newTransaction = data.money;
            //const oldTransaction = data.oldTransaction.money;
            //const account = state.userData.moneyAccounts[data.accountIndex];

            //update account balance
            state.userData.moneyAccounts[moneyAccountIndex].money = newBalance;
            //update transaction entry in state

            console.log("saveEditedTransaction - transactionIndex:", transactionIndex);
            console.log("saveEditedTransaction - transactions[transactionIndex before store entry is edited:]", state.userData.transactions[transactionIndex]);

            state.userData.transactions[transactionIndex] = transaction; /*color: data.color,*/ //name: transaction.name, description: transaction.description, money: transaction.money, moneyAccount: transaction.moneyAccountId, date: transaction.date };

            console.log("saveEditedTransaction - transactions[transactionIndex after store entry is edited:]", state.userData.transactions[transactionIndex]);

        },
        saveEditedTransactionWithNewMoneyAccount(state, { data, transaction }) {
            //const newTransaction = data.money;
            //const oldTransaction = data.oldTransaction.money;

            //Alten Betrag der vorherigen Transaktion von deren Konto abziehen / wieder drauf rechnen.
            //const oldAccount = state.userData.moneyAccounts[data.oldAccountIndex];
            data.oldAccount.money = data.oldAccount_newBalance;

            //Neuen Betrag auf neues Konto anrechnen
            //const newAccount = state.userData.moneyAccounts[data.accountIndex]
            data.moneyAccount.money =  data.newAccount_newBalance;

            //update transaction entry in state
            state.userData.transactions[data.item] = transaction; /*name: data.name, description: data.description, money: data.money, moneyAccount: data.moneyAccountId, date: data.date*/

        },
        deleteTransaction(state, data) {

            //undo transaction
            data.account.money =  data.newBalance;
            //delete transaction entry in state
            state.userData.transactions.splice(data.item, 1);

        },

        saveNewRepeatingTransaction(state, repTransaction) {

            //add the new repTransaction to state
            state.userData.repeatingTransactions.push(repTransaction);

        },
        saveEditedRepeatingTransaction(state, repTransaction) {

            //update the repeating transaction in state
            state.userData.repeatingTransactions[repTransaction.index] = repTransaction;

        },
        deleteRepeatingTransaction(state, index) {

            //delete the repTransaction in state
            state.userData.repeatingTransactions.splice(index, 1);

        },

        saveNewTransfer(state, { transfer, from, to }) {

            //save transfer in state.userData
            state.userData.transfers.push(transfer);

            //update balances of from and to in state.userData
            from.moneyAccount.money = from.newBalance;  //parseFloat( ( data.fromAccount.money - data.money ).toFixed(2) );
            to.moneyAccount.money = to.newBalance;      //parseFloat( ( data.toAccount.money + data.money ).toFixed(2) );

        },
        // old saveEditedTransfer(state, data) {
        //     const oldTransfer = data.oldTransfer.money;
        //     const newTransfer = data.money;
        //
        //     //update balances of from and to
        //     data.fromAccount.money = parseFloat( ( data.fromAccount.money - (newTransfer - oldTransfer) ).toFixed(2) );
        //     data.toAccount.money = parseFloat( ( data.toAccount.money + (newTransfer - oldTransfer) ).toFixed(2) ) ;
        //
        //     //update transfer entry and localStorage
        //     state.userData.transfers[data.item] = { id: data.id, name: data.name, description: data.description, money: data.money, fromId: data.fromId, toId: data.toId, date: data.date };
        //     //localStorage.setItem('state', JSON.stringify(state.userData));
        // },
        // saveEditedTransferWithNewFromTo(state, data) {
        //     const oldTransfer = data.oldTransfer.money;
        //     const newTransfer = data.money;
        //
        //     //Geld beim alten from wiederherstellen
        //     data.oldFromAccount.money = parseFloat( ( data.oldFromAccount.money + oldTransfer ).toFixed(2) );
        //
        //     //Umbuchung vom neuen from abrechnen
        //     data.fromAccount.money = parseFloat( ( data.fromAccount.money - newTransfer ).toFixed(2) );
        //
        //     //Geld vom alten to wieder abziehen
        //     data.oldToAccount.money = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
        //
        //     //Umbuchung auf das neue to rechnen
        //     data.toAccount.money = parseFloat( ( data.toAccount.money + newTransfer ).toFixed(2) );
        //
        //     //update transfer entry and localStorage
        //     state.userData.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
        //
        //     //localStorage.setItem('state', JSON.stringify(state.userData));
        // },
        // saveEditedTransferWithNewFrom(state, data) {
        //     const oldTransfer = data.oldTransfer.money;
        //     const newTransfer = data.money;
        //
        //     //Geld beim alten from wiederherstellen
        //     data.oldFromAccount.money = parseFloat( ( data.oldFromAccount.money + oldTransfer ).toFixed(2) );
        //     //Umbuchung vom neuen from abrechnen
        //     data.fromAccount.money = parseFloat( ( data.fromAccount.money - newTransfer ).toFixed(2) );
        //     //to updaten
        //     data.toAccount.money = parseFloat( ( data.toAccount.money + (newTransfer - oldTransfer) ).toFixed(2) );
        //
        //     //update transfer entry and localStorage
        //     state.userData.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
        //     //localStorage.setItem('state', JSON.stringify(state.userData));
        //
        //
        // },
        // saveEditedTransferWithNewTo(state, data) {
        //     const oldTransfer = data.oldTransfer.money;
        //     const newTransfer = data.money;
        //
        //     //Geld vom alten to wieder abziehen
        //     data.oldToAccount.money = parseFloat( ( data.oldToAccount.money - oldTransfer ).toFixed(2) );
        //     //Umbuchung auf das neue to rechnen
        //     data.toAccount.money = parseFloat( ( data.toAccount.money + newTransfer ).toFixed(2) );
        //     //from updaten
        //     data.fromAccount.money = parseFloat( ( data.fromAccount.money - (newTransfer - oldTransfer) ).toFixed(2) );
        //
        //     //update transfer entry and localStorage
        //     state.userData.transfers[data.item] = { colorFrom: data.colorFrom, colorTo: data.colorTo, name: data.name, description: data.description, money: data.money, from: data.from, to: data.to, date: data.date };
        //     //localStorage.setItem('state', JSON.stringify(state.userData));
        //
        // },
        /**
         *
         * @param state
         * @param changedMoneyAccounts {String} Shows if and which moneyAccounts changed (in comparison to the old transfer)
         * @param transfer {Object} Transfer Object, used for calculation and updating the entry in state.userData
         * @param transferIndex {Number} Used for finding the transfer entry in state.userData that will be updated
         * @param current {Object} As in "current transfer"
         * @property fromAccount {Object}
         * When called with 'none', has properties 'account' and 'newBalance
         * @property toAccount {Object}
         * @param old {Object}
         * @property fromAccount {Object}
         * @property toAccount {Object}
         * @property transfer {Object} Only has property money
         * @property money {Float} Money of oldTransfer
         */
        saveEditedTransfer(state, { changedMoneyAccounts, transfer, transferIndex, current, old }) {

            /*data:
                date: "2022-01-12"
                description: "rsjkbbkrg"
                editedMoneyAccounts: "to"
                fromAccount: {…}
                fromId: 3
                fromName: "Bank 3000"
                id: 2  ->  transfer id
                item: 1  ->  transfer index in state.userData
                money: 100
                name: "Test1"
                oldFromAccount: {…}
                oldToAccount: {…}
                oldTransfer: {…}
                toAccount: {…}
                toId: 2
                toName: "ING DiBa"
                [[Prototype]]: Object
             */

            //Which moneyAccounts changed? Options: none, from&to, only from, only to
            switch(changedMoneyAccounts) {

                case 'none':
                    //update balances of from and to
                    current.fromAccount.account.money = current.fromAccount.newBalance;
                    current.toAccount.account.money = current.toAccount.newBalance;

                    break;

                case 'both':

                    //Geld beim alten from wiederherstellen
                    old.fromAccount.money = parseFloat( ( old.fromAccount.money + old.transfer.money ).toFixed(2) );

                    //Umbuchung vom neuen from abrechnen
                    current.fromAccount.money = parseFloat( ( current.fromAccount.money - transfer.money ).toFixed(2) );

                    //Geld vom alten to wieder abziehen
                    old.toAccount.money = parseFloat( ( old.toAccount.money - old.transfer.money ).toFixed(2) );

                    //Umbuchung auf das neue to rechnen
                    current.toAccount.money = parseFloat( ( current.toAccount.money + transfer.money ).toFixed(2) );

                    break;

                case 'from':

                    //Geld beim alten from wiederherstellen
                    old.fromAccount.money = parseFloat( ( old.fromAccount.money + old.transfer.money ).toFixed(2) );

                    //Umbuchung vom neuen from abrechnen
                    current.fromAccount.money = parseFloat( ( current.fromAccount.money - transfer.money ).toFixed(2) );

                    //update current to
                    current.toAccount.money = parseFloat( ( current.toAccount.money + (transfer.money - old.transfer.money) ).toFixed(2) );

                    break;

                case 'to':

                    //Geld vom alten to wieder abziehen
                    old.toAccount.money = parseFloat( ( old.toAccount.money - old.transfer.money ).toFixed(2) );

                    //Umbuchung auf das neue to rechnen
                    current.toAccount.money = parseFloat( ( current.toAccount.money + transfer.money ).toFixed(2) );

                    //from updaten
                    current.fromAccount.money = parseFloat( ( current.fromAccount.money - (transfer.money - old.transfer.money) ).toFixed(2) );

                    break;

            }

            //Update transfer object in state.userData
            state.userData.transfers[transferIndex] = transfer;



            //state.userData.transfers[data.item] = transfer;

        },
        /**
         *
         * @param state
         * @param transferMoney
         * @param transferIndex {Number}
         * @param fromAccount {Object}  state object
         * @param toAccount {Object}    state object
         */
        deleteTransfer(state, { transferMoney, transferIndex, fromAccount, toAccount }) {

            //Undo transfer effects on the from and to account
            fromAccount.money += transferMoney;
            toAccount.money -= transferMoney;

            //delete transfer entry in state
            state.userData.transfers.splice(transferIndex, 1);

        }

    }
});

//parseFloat( (  ).toFixed(2) )
