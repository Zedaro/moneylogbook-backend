<?php

namespace App\Http\Controllers;

use App\Models\MoneyAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;

class MoneyAccountsController extends Controller
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

        $moneyAccount = new MoneyAccount;

        //How to create an entry without writing every attribute
//        foreach(Schema::getColumnListing('money_accounts') as $key) {
//            /*Ausnahmen hinzufügen:
//              if ($key == 'derWertSollÜbersprungenWerden') continue;   ->   Wenn $key dieser Wert ist, mach weiter mit dem nächsten Durchlauf des loops
//            */
//
//            if($key == "created_at" || $key == "updated_at") continue;
//
//            $moneyAccount->$key = $request->$key;
//        }

        $moneyAccount->name = $request->name;
        $moneyAccount->money = $request->money;
        $moneyAccount->color = $request->color;
        $moneyAccount->save();

        return $moneyAccount;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show()//($id)
    {
        $obj = [];

        foreach(MoneyAccount::all() as $moneyAccount) {

            $obj[] = $moneyAccount;
//                 'name' => $moneyAccount->name,
//                 'money' => $moneyAccount->money,
//                 'color' => $moneyAccount->color

        }

        return $obj;
    }

    public function showOne($id) {

        return MoneyAccount::find($id);

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
        $moneyAccount = MoneyAccount::find($request->id);

        $moneyAccount->name = $request->name;
        $moneyAccount->money = $request->money;
        $moneyAccount->color = $request->color;
        $moneyAccount->save();

        return $moneyAccount;

    }

    public function updateWithObject($obj) {

        $moneyAccount = MoneyAccount::find($obj['id']);

        $moneyAccount->name = $obj['name'];
        $moneyAccount->money = $obj['money'];
        $moneyAccount->color = $obj['color'];
        $moneyAccount->save();

        return $moneyAccount;

    }

    public function editBalance($moneyAccountId, $newBalance) {
        $moneyAccount = MoneyAccount::find($moneyAccountId);
        $moneyAccount->money = $newBalance;
        $moneyAccount->save();

        //error_log($moneyAccount->money);
        //error_log('works here');

        return [
            'changedMoneyAccount' => $moneyAccount,
            'moneyAccountId' => $moneyAccountId,
            'newBalance' => $newBalance
        ];
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //MoneyAccount::find($request->id)->delete();
    }

    public function archive(Request $request)
    {
        $moneyAccount = MoneyAccount::find($request->id);
        $moneyAccount->archived = 1;
        $moneyAccount->save();
    }


    public function test(Request $request) {
        //$this->editBalance($request->moneyAccountId, $request->newBalance);
        //return $this->editBalance(5);
    }


}
