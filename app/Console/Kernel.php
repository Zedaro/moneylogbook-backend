<?php

namespace App\Console;

use App\Models\MoneyAccount;
use App\Models\RepeatingTransaction;
use App\Models\RepeatingTransactionWeekday;
use App\Models\Transaction;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        $schedule->call(function() {

            //Heutiges Datum im Format "YYYY-MM-DD"
            $today = substr(today(), 0, 10);
//            $today = '2021-08-16';


            //Geh jeden Dauerauftrag in der DB durch
            foreach( RepeatingTransaction::all() as $repTransaction ) {

                //Schaue, ob der Dauerauftrag noch gültig ist
                if($repTransaction->expired === 0 ) {

                    //Überprüfe, ob das auch wirklich stimmt
                    //Wenn es ein Enddatum gibt und das Enddatum vor heute liegt, dann schalte den Dauerauftrag auf "abgelaufen"
                    if( $repTransaction->ending_date != null  &&  $repTransaction->ending_date < $today ) {

                        //Wenn abgelaufen, speichere das in dem Datensatz ab und gehe zum nächsten Dauerauftrag
                        $repTransaction->expired = true;
                        $repTransaction->save();
                        continue;

                    }

                    //Kommt das Programm an diese Stelle, ist der Dauerauftrag tatsächlich noch gültig.
                    //Überprüfe, ob der Dauerauftrag bereits begonnen hat oder heute beginnt
                    if( $repTransaction->starting_date <= $today ) {

                        $selectedWeekdays = [];
                        //Hat der User Wochentage im Intervall ausgewählt?
                        if($repTransaction->weekdays->first() != null) {

                            //Hol dir die ausgewählten Wochentage. Speichere die id (1-7) und den String davon in $selectedWeekdays
                            $repTransWeekdays = $repTransaction->weekdays;
                            foreach ($repTransWeekdays as $repTransWeekday) {

                                $selectedWeekdays[] = [

                                    'id' => $repTransWeekday->weekday->id,
                                    'weekday' => $repTransWeekday->weekday->weekday

                                ];

                            }
                        }


                        //Überprüfe, ob heute eine Transaktion anfällt
                        //Beginne mit dem Startdatum.
                        //Dann vergrößere das Intervall solange, bis ein nächstes Datum größer oder gleich heute ist
                        $nextDate = $repTransaction->starting_date;
                        //i wird benutzt, um das Intervall zu vergrößern (zB. 1 * 2 Monate, 2 * 2 Monate, 3 * 2 Monate, ...)
                        $i = 0;


                        //Wenn User Wochentage ausgewählt hat
                        if( !empty($selectedWeekdays) ) {

                            //Heutiger Wochentag (z.B. Montag) als Zahl
                            $wDayToday = getdate(strtotime($today))['wday'];
                            //Mach SO = 0 zu SO = 7 (um 1 bis 7, beginnend mit Montag, zu haben)
                            if( $wDayToday == 0 ) $wDayToday = 7;

                            //Heutiger Wochentag als String (zB 'monday')
                            $wDayTodayString = null;
                            //Wenn heute einer der ausgewählten Wochentage ist, speichere ihn als englischen String (zB 'monday') in $wDayTodayString
                            foreach($selectedWeekdays as $weekday) {

                                if($weekday['id'] == $wDayToday) {

                                    $wDayTodayString = $weekday['weekday'];

                                }

                            }

                            //Wenn heute keiner der ausgewählten Wochentage ist, gehe zum nächsten Dauerauftrag
                            if( gettype($wDayTodayString) !== 'string' ) continue;


                            //Wochentag von startingDate (z.B. Montag) als Zahl
                            $wDayStartingDate = getdate(strtotime($repTransaction->starting_date))['wday'];
                            //Wenn $wday == 0, ist heute ein Sonntag -> setz wday auf 7 (damit ich damit arbeiten kann)
                            if( $wDayStartingDate == 0 ) $wDayStartingDate = 7;

                            $difference = abs($wDayToday - $wDayStartingDate);

                            while ($nextDate <= $today) {

                                $intervalString = "+" . $i * ($repTransaction->interval_number + 1) . " weeks - " . $difference . " days";
                                //datetime(2.Argument): Startdatum + i * Intervall als Zahl. Wird umformatiert zu einem Datum im Format 'Y-m-d'
                                $nextDate = date('Y-m-d', strtotime( $repTransaction->starting_date . " " . $intervalString ));


                                //Wenn ein nächstes Datum des Dauerauftrags gleich heute ist,
                                if( $nextDate == $today ) {

                                    //erstelle eine neue Transaktion
                                    $transaction = new Transaction;
                                    $transaction->name = $repTransaction->name;
                                    $transaction->description = $repTransaction->description;
                                    $transaction->money_account_id = $repTransaction->money_account_id;
                                    $transaction->money = $repTransaction->money;
                                    $transaction->date = $nextDate;
                                    $transaction->save();

                                    //Berechne den neuen Kontostand nach der Transaktion
                                    $moneyAccount = MoneyAccount::find($transaction->money_account_id);  //data.moneyAccount.money;
                                    $newBalance = floatval( number_format( ($moneyAccount->money + $transaction->money), 2, '.', '' ) );

                                    //Wenn der Kontostand durch die Transaktion größer als 0 bleibt, führe die Transaktion aus
                                    if( $newBalance > 0 ) {

                                        $moneyAccount->money = $newBalance;
                                        $moneyAccount->save();

                                    }

                                    //Gehe zum nächsten Dauerauftrag
                                    break;

                                }

                                //Erhöhe i um 1 -> Erhöhe das Intervall
                                $i++;

                            }

                        }
                        //Wenn User keine Wochentage ausgewählt hat
                        else {

                            while($nextDate <= $today) {

                                $intervalTypes = ['weeks', 'months', 'years'];

                                //z.B. 1 * 2 Monate, 2 * 2 Monate, 3 * 2 Monate, ...
                                $intervalString = "+" . $i * ($repTransaction->interval_number + 1) . " " . $intervalTypes[$repTransaction->interval_type];

                                //datetime(2.Argument): Startdatum + i * Intervall als Zahl. Wird umformatiert zu einem Datum im Format 'Y-m-d'
                                $nextDate = date('Y-m-d', strtotime( $repTransaction->starting_date . " " . $intervalString ));


                                //Wenn ein nächstes Datum des Dauerauftrags gleich heute ist,
                                if( $nextDate == $today ) {

                                    //erstelle eine neue Transaktion
                                    $transaction = new Transaction;
                                    $transaction->name = $repTransaction->name;
                                    $transaction->description = $repTransaction->description;
                                    $transaction->money_account_id = $repTransaction->money_account_id;
                                    $transaction->money = $repTransaction->money;
                                    $transaction->date = $nextDate;
                                    $transaction->save();

                                    //Berechne den neuen Kontostand nach der Transaktion
                                    $moneyAccount = MoneyAccount::find($transaction->money_account_id);  //data.moneyAccount.money;
                                    $newBalance = floatval( number_format( ($moneyAccount->money + $transaction->money), 2, '.', '' ) );

                                    //Wenn der Kontostand durch die Transaktion größer als 0 bleibt, führe die Transaktion aus
                                    if( $newBalance > 0 ) {

                                        $moneyAccount->money = $newBalance;
                                        $moneyAccount->save();

                                    }

                                    //Gehe zum nächsten Dauerauftrag
                                    break;

                                }

                                //Erhöhe i um 1 -> Erhöhe das Intervall
                                $i++;

                            }

                        }

                    }

                }

            }

        })->everyMinute();

    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
