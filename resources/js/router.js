import Vue from "vue";
import VueRouter from 'vue-router';

Vue.use(VueRouter)

import OverviewPage from "./components/OverviewPage";
import TransactionsPage from "./components/transactions/TransactionsPage";
import RepeatingTransactionsPage from "./components/repeatingTransactions/RepeatingTransactionsPage";
import MoneyAccountForm from "./components/moneyAccounts/form/MoneyAccountForm";
import TransactionForm from "./components/transactions/form/TransactionForm";
import RepeatingTransactionForm from "./components/repeatingTransactions/form/RepeatingTransactionForm";
import TransfersPage from "./components/transfer/TransfersPage";
import TransferForm from "./components/transfer/TransferForm";
import TestCSS from "./components/TestCSS";
import BackendTests from "./components/BackendTests";
import SignUp from "./components/signup/SignUp";


const routes = [
    {
        path: '/',
        redirect: 'overview'
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
        meta: { title: 'Sign Up' }
    },
    {
        path: '/testcss',
        name: 'testcss',
        component: TestCSS,
        meta: { title: 'testcss' }
    },
    {
      path: '/backend-tests',
      name: 'backend-tests',
      component: BackendTests,
      meta: { title: 'backend-tests' }
    },
    {
        path: '/overview',
        name: 'overview',
        component: OverviewPage,
        meta: { title: 'moneyAccounts'  }//.t('headerTitle.moneyAccounts') }
    },
    {
        path: '/moneyAccounts/:item',
        name: 'moneyAccountForm',
        component: MoneyAccountForm,
        meta: { formType: 'moneyAccount' }
        /*
        beforeEnter: (to) =>  {
          if(to.params.item == 'new') {
            this.$store.dispatch('setTitle', 'Neues Konto');
          }
          else {
            this.$store.dispatch('setTitle', 'Konto bearbeiten');
          }
        }
        */
    },
    {
        path: '/transactions',
        name: 'transactions',
        component: TransactionsPage,
        meta: { title: 'transactions' }
    },
    {
        path: '/transactions/:item',
        name: 'transactionForm',
        component: TransactionForm,
        meta: { formType: 'transaction' }
    },
    {
        path: '/repeatingTransactions',
        name: 'repeatingTransactions',
        component: RepeatingTransactionsPage,
        meta: { title: 'repeatingTransactions' }
    },
    {
        path: '/repeatingTransactions/:item',
        name: 'repeatingTransactionForm',
        component: RepeatingTransactionForm,
        meta: { formType: 'repeatingTransaction' }
    },
    {
        path: '/transfers',
        name: 'transfers',
        component: TransfersPage,
        meta: { title: 'transfers' }
    },
    {
        path: '/transfers/:item',
        name: 'transferForm',
        component: TransferForm,
        meta: { formType: 'transfer' }
    }
    /*
  {
    path: '/moneyAccounts/new',
    name: 'newMoneyAccount',
    component: NewMoneyAccount
  },
  {
    path: '/moneyAccounts/edit',
    name: 'editMoneyAccount',
    component: NewMoneyAccount
  },
    */
]

export const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

/*
router.afterEach( (to) => {
  const name = to.name;

  if(name === 'overview')
    store.dispatch('setTitle', 'Übersicht');
  else if(name === 'transactions')
    store.dispatch('setTitle', 'Transaktionen');
  else if(name === 'repeatingTransactions')
    store.dispatch('setTitle', 'Daueraufträge');
  else if(name === 'moneyAccounts')
    store.dispatch('setTitle', 'Konten');
  else if(name === 'moneyAccountForm') {
    if(to.params.item === 'new')
      store.dispatch('setTitle', 'Neues Konto');
    else
      store.dispatch('setTitle', 'Konto bearbeiten');
  }
} );

 */
