<?php

use App\Http\Controllers\RepeatingTransactionController;
use App\Http\Controllers\TransferController;
use App\Models\MoneyAccount;
use App\Models\RepeatingTransaction;
use App\Models\Transaction;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Models\Post;
use App\Models\Number;
use App\Http\Controllers\MoneyAccountsController;
use App\Http\Controllers\TransactionsController;
use App\Models\RepeatingTransactionWeekday;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/getData', function() {

    $data = [
        'moneyAccounts' => ( new MoneyAccountsController() ) -> show(),
        'transactions' => ( new TransactionsController() ) -> show(),
        'transfers' => ( new TransferController() ) -> show()
    ];

    return $data;

});

Route::post('/saveNewMoneyAccount', [MoneyAccountsController::class, 'store']);

Route::post('/updateMoneyAccount', [MoneyAccountsController::class, 'update']);

Route::delete('/deleteMoneyAccount', [MoneyAccountsController::class, 'destroy']);

Route::post('/testMoneyAccountsController', [MoneyAccountsController::class, 'test']);


Route::post('/saveNewTransaction', [TransactionsController::class, 'store']);

Route::post('/updateTransaction', [TransactionsController::class, 'update']);

Route::delete("/deleteTransaction", [TransactionsController::class, 'destroy']);


Route::post('/saveNewTransfer', [TransferController::class, 'store']);

Route::post('/updateTransfer', [TransferController::class, 'update']);

Route::delete("/deleteTransfer", [TransferController::class, 'destroy']);


Route::post('/saveNewRepeatingTransaction', [RepeatingTransactionController::class, 'store']);

Route::post('/updateRepeatingTransaction', [RepeatingTransactionController::class, 'update']);

Route::delete("/deleteRepeatingTransaction/{id}", function($id) {

    (new RepeatingTransactionController) -> destroy($id);

});


Route::get("/test", function() {

    //error_log('2022-01-25' > today());

    //return('2022-01-20' == substr(today(), 0, 10));

    //return substr(today(), 0, 10);

    //return strtotime("+1 month");

    //Was bekomme ich bei SELECT zurückgegeben?

    //Log::debug("Hello Worls! I'm Log::debug");

    //DebugBar::debug("Hello Worldo");


    //---------------------------------------------------



    $today = substr(today(), 0, 10);
    $testToday = '2021-08-16';


    //Geh jeden Dauerauftrag in der DB durch
    foreach( RepeatingTransaction::all() as $repTransaction ) {

//        $mAccount = MoneyAccount::find(2);
//        $transactions = $mAccount->transactions;
//        Debugbar::debug($transactions);
//        Debugbar::debug($transactions->first());
//
//        foreach($transactions as $transaction) {
//
//            Debugbar::debug($transaction);
//
//        }

        //Debugbar::debug($repTransaction);

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

                    //Sind Wochentage im Intervall ausgewählt?
                    if($repTransaction->weekdays->first() != null) {

                        //Hol dir die ausgewählten Wochentage und speichere sie in $weekdays
                        $repTransWeekdays = $repTransaction->weekdays;
                        foreach($repTransWeekdays as $repTransWeekday) {

                            $weekdays[] = [

                              'id' => $repTransWeekday->weekday->id,
                              'weekday' => $repTransWeekday->weekday->weekday

                            ];

                        }

//                        $repTransWeekdays = $repTransaction->weekdays();
//
//                        foreach($repTransWeekdays as $repTransWeekday) {
//
//                            $weekdays[] = $repTransWeekday->weekday();
//
//                        }

                        //Ist heute einer der ausgewählten Wochentage? -> Wenn nicht, continue;
                        //Wenn ja -> Welcher Wochentag ist heute?
                        //Intervall mit dem Wochentag durchgehen
                        //  -> Startdatum nehmen und dann von da aus den nächsten Wochentag (außer Startdatum == der Wochentag)
                        //  -> Von dem Datum aus das i * wöchentliche Intervall durchgehen

                        //Heutiger Wochentag (z.B. Montag) als Zahl
                        $wday = getdate()['wday'];
                        //Wenn $wday == 0, ist heute ein Sonntag -> setz wday auf 7 (damit ich damit arbeiten kann)
                        if( $wday == 0 ) $wday = 7;

                        //Überprüfen, ob heute einer der im Intrvall ausgewählten Wochentage ist (Bsp: Intervall beinhaltert Montag -> Ist heute ein Montag?)
                        foreach($weekdays as $weekday) {

                            if($weekday['id'] == $wday) {

                                //Wenn heute einer ausgewählten Wochentage ist, speichere, welcher es ist (als englischer String, zB "monday")
                                $wday = $weekday['weekday'];

                            }

                        }

                        //Wenn heute keiner der ausgewählten Wochentage ist, ist $wday noch ein int. Also sind im Intervall Wochentage, aber heute ist keiner der Wochentage. Also fällt heute keine Transaktion an. continue;
                        if( gettype($wday) == integer ) coninue;

                        //  -> Startdatum nehmen und dann von da aus den nächsten Wochentag (außer Startdatum == der Wochentag)
                        //  -> Von dem Datum aus das i * wöchentliche Intervall durchgehen

                    }



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






    //---------------------------------------------------


});




Route::get('/{any}', function () {

    return view('index');

})->where('any', '.*');


//Route::get('/{path}', function ($path) {
//    if ($path === 'backend-tests') {
//        $number = Number::first();
//        $number->number++;
//
//        $number->save();
//
//        return view('index', ['number' => $number->number]);
//    }
//
//    return view('index');
//});


//Route::get('/overview', function() {
//   return "Here's the overview. Welcome!";
//});
//
//Route::get('/transactions/{id}', function($id) {
//   return "This is transaction #".$id;
//});
//
//Route::get('/admin/posts/example', array('as'=>'admin.home', function() {
//    $url = route('admin.home');
//
//    return "This url is ".$url;
//}));

//Route::get('/post/{id}', [PostsController::class, 'index']);

//Route::resource('posts', PostsController::class);
//
//Route::get('/contact/{id}/{name}', [PostsController::class, 'contact']);
//
//Route::get('/contacts', [PostsController::class, 'contacts']);



/*
|--------------------------------------------------------------------------
| DATABASE Raw SQL Queries
|--------------------------------------------------------------------------
*/

//Route::get('/insert', function() {
//
//    DB::insert('insert into posts (title, content) values(?, ?)', ['Laravel Tutorial', 'Hi my little cuties! Buy my new shampoo~']);
//
//});
//
//Route::get('/read', function() {
//
//    $results = DB::select('SELECT * FROM posts WHERE id = ?', [1]);
//
//    foreach($results as $post) {
//        return var_dump($post);
//    }
//
//});
//
//Route::get('/update', function() {
//
//    $updated = DB::update('UPDATE posts SET title = ? WHERE id = ?', ['Laravel Shampoo', 1]);
//    return $updated;
//
//});
//
//Route::get('delete', function() {
//
//    $deleted = DB::delete('DELETE FROM posts WHERE id = ?', [1]);
//    return $deleted;
//
//});


/*
|--------------------------------------------------------------------------
| ELOQUENT / ORM (= Object Relational Model)
|--------------------------------------------------------------------------
*/

//Route::get('/read/all', function() {
//
//    $posts = Post::all();
//
//    $postTitles = [];
//
//    foreach ($posts as $post) {
//        array_push($postTitles, $post->title);
//    }
//
//    return $postTitles;
//
//});
//
//Route::get('/find', function() {
//
//    $post = Post::find(1);
//
//    return $post->title;
//
//});
//
//Route::get('/findwhere', function() {
//
//    $post = Post::where('id', 1)->orderBy('id', 'desc')->take(1)->get();
//
//    return $post;
//
//});
//
//Route::get('/findmore', function() {
//
////    $post = Post::findOrFail(5);
////
////    return $post->title;
//
//    $posts = Post::where('id', '<', 5)->get();
//
//    return $posts;
//
//});
//
//Route::get('/basicinsert', function() {
//
//    $post = new Post;
//
//    $post->title = 'new Eloquent title insert';
//    $post->content = 'Eloquent is so wow';
//
//    $post->save();
//
//});
//
//
//Route::get('/incrementNumber', function() {
//
//    $number = Number::first();
//    $number->number++;
//
//    $number->save();
//
//    return $number->number;
//
//});
