<?php

namespace App\Http\Controllers;

use App\Models\RepeatingTransaction;
use App\Models\RepeatingTransactionWeekday;
use App\Models\Transaction;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;

class RepeatingTransactionController extends Controller
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

        $repTransaction = new RepeatingTransaction;

        $repTransaction->name = $request->name;
        $repTransaction->description = $request->description;
        $repTransaction->money_account_id = $request->moneyAccountId;
        $repTransaction->money = $request->money;
        $repTransaction->starting_date = $request->startingDate;
        $repTransaction->ending_date = $request->endingDate;
        $repTransaction->interval_number = $request->rhythmNumber;
        $repTransaction->interval_type = $request->rhythmType;
        $repTransaction->save();

        //If user selected weekdays
        if($request->weekdays != null) {

            //Save each selected weekday in repeating_transactions_weekdays table
            foreach($request->weekdays as $weekdayIndex) {

                $repTransactionsWeekdays = new RepeatingTransactionWeekday;
                $repTransactionsWeekdays->repeating_transaction_id = $repTransaction->id;
                $repTransactionsWeekdays->weekday_id = $weekdayIndex + 1;
                $repTransactionsWeekdays->save();

            }

        }

//        $today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
//        if($repTransaction->starting_date == today) {
//
//            $transaction = new Transaction;
//
//            $transaction->name = $request->name;
//            $transaction->description = $request->description;
//            $transaction->moneyAccountId = $request->moneyAccountId;
//            $transaction->money = $request->money;
//            $transaction->date = $request->startingDate;
//            $transaction->save();
//
//        }

        return $repTransaction->id;

    }


    public function getAll()
    {

        $repTransactions = RepeatingTransaction::all();

        $obj = [];

        foreach ($repTransactions as $repTransaction) {

            $weekdays = null;

            if($repTransaction->weekdays->first() != null) {

                foreach($repTransaction->weekdays as $weekday) {

                    $weekdays[] = $weekday->weekday_id - 1;

                }

            }


            $obj[] = [

                'id' => $repTransaction->id,
                'name' => $repTransaction->name,
                'description' => $repTransaction->description,
                'moneyAccountId' => $repTransaction->money_account_id,
                'money' => $repTransaction->money,
                'rhythmNumber' => $repTransaction->interval_number,
                'rhythmType' => $repTransaction->interval_type,
                'startingDate' => $repTransaction->starting_date,
                'endingDate' => ($repTransaction->ending_date == null) ? '' : $repTransaction->ending_date,
                'weekdays' => $weekdays,
                'expired' => boolval($repTransaction->expired)

            ];
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

        $repTransaction = RepeatingTransaction::find($request->id);

        $repTransaction->name = $request->name;
        $repTransaction->description = $request->description;
        $repTransaction->money_account_id = $request->moneyAccountId;
        $repTransaction->money = $request->money;
        $repTransaction->starting_date = $request->startingDate;
        $repTransaction->ending_date = $request->endingDate;
        $repTransaction->interval_number = $request->rhythmNumber;
        $repTransaction->interval_type = $request->rhythmType;
        $repTransaction->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        RepeatingTransaction::find($id) -> delete();
    }
}
