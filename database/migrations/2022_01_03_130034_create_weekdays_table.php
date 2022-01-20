<?php

use App\Models\Weekday;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWeekdaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('weekdays', function (Blueprint $table) {
            $table->id();
            $table->string('weekday');
            $table->timestamps();
        });

        $this->insertInitialDataset('monday');
        $this->insertInitialDataset('tuesday');
        $this->insertInitialDataset('wednesday');
        $this->insertInitialDataset('thursday');
        $this->insertInitialDataset('friday');
        $this->insertInitialDataset('saturday');
        $this->insertInitialDataset('sunday');

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weekdays');
    }

    public function insertInitialDataset($wd) {

        $weekday = ( new Weekday );
        $weekday->weekday = $wd;
        $weekday->save();

    }

}
