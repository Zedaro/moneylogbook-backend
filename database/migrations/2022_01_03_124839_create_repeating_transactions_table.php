<?php

use App\Models\RepeatingTransaction;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRepeatingTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('repeating_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description') -> nullable();
            $table->integer('money_account_id');
            $table->float('money');
            $table->date('starting_date');
            $table->date('ending_date') -> nullable();
            $table->integer('interval_number');
            $table->integer('interval_type');
            $table->boolean('expired') -> default(false);
            $table->timestamps();
        });

        $this->insertInitialDatasets();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repeating_transactions');
    }

    public function insertInitialDatasets() {

        $repTransaction = new RepeatingTransaction;

        $repTransaction->name = "Schweigegeld";
        $repTransaction->description = "...";
        $repTransaction->money_account_id = 1;
        $repTransaction->money = 500.0;
        $repTransaction->starting_date = "2021-07-16";
        $repTransaction->ending_date = null;
        //$repTransaction->starting_date = "2021-11-20";
        //$repTransaction->ending_date = "2021-12-20";
        $repTransaction->interval_number = 1;
        $repTransaction->interval_type = 1;
        $repTransaction->expired = false;
        $repTransaction->save();

    }
}
