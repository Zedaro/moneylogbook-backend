<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Transaction;

class CreateTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description') -> nullable();
            $table->integer('money_account_id');
            $table->float('money');
            $table->date('date');
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
        Schema::dropIfExists('transactions');
    }

    public function insertInitialDatasets() {

        $transaction = new Transaction();

        $transaction->name = 'Robux';
        $transaction->description = 'Sophia ist süchtig, aber so was von ey...';
        $transaction->money_account_id = 1;
        $transaction->money = 10.0;
        $transaction->date = '2021-11-05';
        $transaction->save();

    }
}
