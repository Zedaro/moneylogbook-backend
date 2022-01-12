<?php

namespace App\Http\Controllers;

use App\Models\MoneyAccount;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use App\Http\Controllers\MoneyAccountsController;
use Illuminate\Support\Facades\Route;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transaction = new Transaction;

        //make new transaction entry in DB
        $transaction->name = $request->name;
        $transaction->description = $request->description;
        $transaction->money_account_id = $request->moneyAccountId;
        $transaction->money = $request->money;
        $transaction->date = $request->date;
        $transaction->save();

        //edit balance of affected account
        ( new MoneyAccountsController ) -> editBalance($request->moneyAccountId, $request->newBalance);

        //return created transaction
        return $this->showOne($transaction->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $obj = [];

        foreach(Transaction::all() as $transaction) {
            $obj[] = $this->showOne($transaction->id);
//            [
//                'name' => $transaction->name,
//                'description' => $transaction->description,
//                'moneyAccountId' => $transaction->money_account_id,
//                'money' => $transaction->money,
//                'date' => $transaction->date
//            ];
        }

        return $obj;
    }

    public function showOne($id) {

        $obj = [];

        $transaction = Transaction::find($id);

        foreach(Schema::getColumnListing('transactions') as $key) {

            if($key == 'money_account_id') {
                $obj['moneyAccountId'] = $transaction->$key;
                continue;
            }

            $obj[$key] = $transaction->$key;

        }

        return $obj;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        error_log($request->newBalance);
        error_log($request);


        if(isset($request->newBalance)) {

//            $transaction = Transaction::find($request->transaction['id']);
//            $transaction->name = $request->transaction['name'];
//            $transaction->description = $request->transaction['description'];
//            $transaction->money = $request->transaction['money'];
//            $transaction->date = $request->transaction['date'];
//            $transaction->save();

            error_log('true');

            $transaction = Transaction::find($request->id);
            $transaction->name = $request->name;
            $transaction->description = $request->description;
            $transaction->money = $request->money;
            $transaction->date = $request->date;
            $transaction->save();

            $moneyAccount = MoneyAccount::find($request->moneyAccountId);
            $moneyAccount->money = $request->newBalance;
            $moneyAccount->save();

            return $this->showOne($transaction->id);

        }
        else {

            error_log('false');

            $transaction = Transaction::find($request->id);
            $transaction->name = $request->name;
            $transaction->description = $request->description;
            $transaction->money = $request->money;
            $transaction->money_account_id = $request->moneyAccountId;
            $transaction->date = $request->date;
            $transaction->save();

            $oldMoneyAccount = MoneyAccount::find($request->oldAccount['id']);
            $oldMoneyAccount->money = $request->oldAccount_newBalance;
            $oldMoneyAccount->save();

            $newMoneyAccount = MoneyAccount::find($request->moneyAccountId);
            $newMoneyAccount->money = $request->newAccount_newBalance;
            $newMoneyAccount->save();

            return $this->showOne($transaction->id);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        Transaction::find($request->transactionId)->delete();

        $moneyAccount = MoneyAccount::find($request->moneyAccountId);
        $moneyAccount->money = $request->newBalance;
        $moneyAccount->save();

    }
}
