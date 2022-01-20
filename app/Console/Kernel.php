<?php

namespace App\Console;

use App\Models\MoneyAccount;
use App\Models\RepeatingTransaction;
use App\Models\RepeatingTransactionWeekday;
use App\Models\Transaction;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

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
        // $schedule->command('inspire')->hourly();



        //Testen:
        //1. Task auf minütlich oder so stellen
        //2. Anstatt today() andere Dati nehmen
        //3. Beim Startdatum auch Dati vor heute ermöglichen (fürs Testen)


        // # Wochentage #




        $schedule->call(function() {


            $today = substr(today(), 0, 10);
            $testToday = '2021-08-16';


            //Geh jeden Dauerauftrag in der DB durch
            foreach( RepeatingTransaction::all() as $repTransaction ) {

                //Schaue, ob der Dauerauftrag noch gültig ist
                if($repTransaction->expired === 0 ) {

                    //Überprüfe, ob das auch wirklich stimmt
                    //Wenn es ein Enddatum gibt und das Enddatum vor heute liegt, dann schalte den Dauerauftrag auf "abgelaufen"
                    if( $repTransaction->ending_date != null  &&  $repTransaction->ending_date < $testToday ) {

                        //Wenn abgelaufen, speichere das in dem Datensatz ab und gehe zum nächsten Dauerauftrag
                        $repTransaction->expired = true;
                        $repTransaction->save();
                        continue;

                    }

                    //Wenn der Dauerauftrag tatsächlich gültig ist
                    //Und der Dauerauftrag bereits begonnen hat oder heute beginnt
                    if( $repTransaction->starting_date <= $testToday ) {

                        //Überprüfe, ob heute eine Transaktion anfällt
                        //Vergrößere dafür das Intervall solange, bis ein nächstes Datum größer oder gleich heute ist
                        //Beginne mit dem Startdatum
                        $nextDate = $repTransaction->starting_date;
                        //i wird benutzt, um das Intervall zu vergrößern (zB. 1 * 2 Monate, 2 * 2 Monate, 3 * 2 Monate, ...)
                        $i = 0;
                        while($nextDate <= $testToday) {

                            //Wenn Wochentage ausgewählt wurden -> Wenn heute Montag oder Donnerstag ist -> Weiter; sonst: brich die Schleife für diesen Dauerauftrag ab

                            $weekdays = [];

                            error_log($repTransaction->weekdays());

                            if($repTransaction->weekdays() != undefined) {

                                $repTransWeekdays = $repTransaction->weekdays();

                                foreach($repTransWeekdays as $repTransWeekday) {

                                    $weekdays[] = $repTransWeekday->weekday();

                                }

                            }

                            error_log($weekdays);

                            $intervalTypes = ['weeks', 'months', 'years'];

                            //z.B. 1 * 2 Monate, 2 * 2 Monate, 3 * 2 Monate, ...
                            $intervalString = "+" . $i * ($repTransaction->interval_number + 1) . " " . $intervalTypes[$repTransaction->interval_type];

                            //datetime(2.Argument): Startdatum + i * Intervall als Zahl. Wird umformatiert zu einem Datum im Format 'Y-m-d'
                            $nextDate = date('Y-m-d', strtotime( $repTransaction->starting_date . " " . $intervalString ));

                            var_dump($intervalString);
                            var_dump($nextDate);

                            //Wenn ein nächstes Datum des Dauerauftrags gleich heute ist,
                            if( $nextDate == $testToday ) {

                                //Erstelle eine neue Transaktion
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

                            }

                            //Erhöhe i um 1 -> Erhöhe das Intervall
                            $i++;

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
