<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\MoneyAccount;

class CreateMoneyAccounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('money_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->float('money');
            $table->string('color');
            $table->timestamps();
        });

        //$this->insertInitialDatasets();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('money_accounts');
    }

    private function insertInitialDatasets() {
        $moneyAccount = new MoneyAccount();
        $moneyAccount->name = 'Sparkasse';
        $moneyAccount->money = 1010.0;
        $moneyAccount->color = '#EA0A8E';
        $moneyAccount->save();

        $moneyAccount = new MoneyAccount();
        $moneyAccount->name = 'ING DiBa';
        $moneyAccount->money = 2000.0;
        $moneyAccount->color = '#FF6600';
        $moneyAccount->save();

        $moneyAccount = new MoneyAccount();
        $moneyAccount->name = 'Bank 3000';
        $moneyAccount->money = 3000.0;
        $moneyAccount->color = '#00FFFB';
        $moneyAccount->save();
    }
}
