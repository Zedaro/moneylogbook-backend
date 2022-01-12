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

        $transfer->name = $request->name;
        $transfer->description = $request->description;
        $transfer->from_id = $request->fromId;
        $transfer->to_id = $request->toId;
        $transfer->money = $request->money;
        $transfer->date = $request->date;
        $transfer->save();

        //edit balance of affected account
        $moneyAccountsController = new MoneyAccountsController;
        $moneyAccountsController -> editBalance($request->fromId, $request->fromAccountNewBalance);
        $moneyAccountsController -> editBalance($request->toId, $request->toAccountNewBalance);

        //return created transfer
        return $this->showOne($transfer->id);
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
        $transfer = Transfer::find($request->id);

        error_log($request->id);

        $transfer->name = $request->name;
        $transfer->description = $request->description;
        $transfer->money = $request->money;
        $transfer->date = $request->date;
        $transfer->save();

        $moneyAccountsController = new MoneyAccountsController();
        $moneyAccountsController->editBalance($request->fromId, $request->newFromBalance);
        $moneyAccountsController->editBalance($request->toId, $request->newToBalance);

        return $this->showOne($transfer->id);
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
