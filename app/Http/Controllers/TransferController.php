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

        $transferData = $request->transfer;

        $transfer = Transfer::find($transferData['id']);

        error_log($request->id);

        $transfer->name = $transferData['name'];
        $transfer->description = $transferData['description'];
        $transfer->money = $transferData['money'];
        $transfer->date = $transferData['date'];
        $transfer->save();

        $moneyAccountsController = new MoneyAccountsController();
        $moneyAccountsController->editBalance($transferData['fromId'], $request->newBalance['from']);
        $moneyAccountsController->editBalance($transferData['toId'], $request->newBalance['to']);

        //return $this->showOne($transfer->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transfer  $transfer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transfer $transfer)
    {
        //
    }
}
