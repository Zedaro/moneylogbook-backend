<?php

namespace App\Http\Controllers;

use App\Models\Transfer;
use Illuminate\Http\Request;

class TransferController extends Controller
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
        $transfer = new Transfer();

        $transferData = $request->transfer;

        $transfer->name = $transferData['name'];
        $transfer->description = $request->transfer['description'];
        $transfer->from_id = $request->transfer['fromId'];
        $transfer->to_id = $request->transfer['toId'];
        $transfer->money = $request->transfer['money'];
        $transfer->date = $request->transfer['date'];
        $transfer->save();

        //edit balance of affected account
        $moneyAccountsController = new MoneyAccountsController;
        $moneyAccountsController -> editBalance($request->transfer['fromId'], $request->newBalance['from']);
        $moneyAccountsController -> editBalance($request->transfer['toId'], $request->newBalance['to']);

        //return created transfer
        //return $this->showOne($transfer->id);

        return $transfer->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $transfers = Transfer::all();

        $obj = [];

        foreach ($transfers as $transfer) {

            $obj[] = [

                'id' => $transfer->id,
                'name' => $transfer->name,
                'description' => $transfer->description,
                'fromId' => $transfer->from_id,
                'toId' => $transfer->to_id,
                'money' => $transfer->money,
                'date' => $transfer->date

            ];
        }

        return $obj;
    }

    public function showOne($id) {

        $transfer = Transfer::find($id);

        $obj = [

            'id' => $transfer->id,
            'name' => $transfer->name,
            'description' => $transfer->description,
            'fromId' => $transfer->from_id,
            'toId' => $transfer->to_id,
            'money' => $transfer->money,
            'date' => $transfer->date

        ];

        return $obj;

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function edit(Transfer $transfer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //Save transfer data, current from&to accounts, old from&to accounts in a variable each -> for easier access
        $transferData = $request->transfer;
        $current = $request->current;
        $old = $request->old;

        //Find the transfer in the DB
        $transfer = Transfer::find($transferData['id']);

        //Update the transfer in the DB
        $transfer->name = $transferData['name'];
        $transfer->description = $transferData['description'];
        $transfer->from_id = $transferData['fromId'];
        $transfer->to_id = $transferData['toId'];
        $transfer->money = $transferData['money'];
        $transfer->date = $transferData['date'];
        $transfer->save();



//        switch($transferData['changedMoneyAccounts']) {
//
//            case 'none':
//
//            case 'both':
//
//            case 'from':
//
//            case 'to':
//
//
//        }


        //Create MoneyAccountsController, then update balances of the from and to accounts (current and old)
        $moneyAccountsController = new MoneyAccountsController();
        $moneyAccountsController->editBalance($current['fromAccount']['id'], $current['fromAccount']['balance']);
        $moneyAccountsController->editBalance($old['fromAccount']['id'], $old['fromAccount']['balance']);
        $moneyAccountsController->editBalance($current['toAccount']['id'], $current['toAccount']['balance']);
        $moneyAccountsController->editBalance($old['toAccount']['id'], $old['toAccount']['balance']);


//        $moneyAccountsController->updateWithObject($current['fromAccount']);
//        $moneyAccountsController->updateWithObject($current['toAccount']);
//        $moneyAccountsController->updateWithObject($old['fromAccount']);
//        $moneyAccountsController->updateWithObject($old['toAccount']);

        //return $this->showOne($transfer->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {

        //Delete the transfer entry
        Transfer::find($request->id)->delete();

        //Update - or rather change back - balances of the from and to account
        $moneyAccountsController = new MoneyAccountsController;
        $moneyAccountsController->editBalance($request->fromAccount['id'], $request->fromAccount['balance']);
        $moneyAccountsController->editBalance($request->toAccount['id'], $request->toAccount['balance']);

    }
}
