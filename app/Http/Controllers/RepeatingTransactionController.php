<?php

namespace App\Http\Controllers;

use App\Models\RepeatingTransaction;
use App\Models\Transaction;
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
