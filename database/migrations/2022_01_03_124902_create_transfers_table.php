<?php

use App\Models\Transfer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransfersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description') -> nullable();
            $table->integer('from_id');
            $table->integer('to_id');
            $table->float('money');
            $table->date('date');
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
        Schema::dropIfExists('transfers');
    }

    public function insertInitialDatasets() {

        $transfer = new Transfer();

        $transfer->name = 'Das Blu- Ich meine, das Geld meiner Feinde!';
        $transfer->description = 'Ich bin nun reich. Reich an Ehre und Geld!';
        $transfer->from_id = 2;
        $transfer->to_id = 1;
        $transfer->money = 10.0;
        $transfer->date = '2021-11-05';
        $transfer->save();



        $transfer = new Transfer();

        $transfer->name = 'Test1';
        $transfer->description = '';
        $transfer->from_id = 3;
        $transfer->to_id = 2;
        $transfer->money = 100.0;
        $transfer->date = '2021-11-05';
        $transfer->save();

    }
}
