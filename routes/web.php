<?php

use App\Http\Controllers\RepeatingTransactionController;
use App\Http\Controllers\TransferController;
use App\Models\MoneyAccount;
use App\Models\RepeatingTransaction;
use App\Models\Transaction;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
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
Route::middleware('auth:sanctum')->group(function() {

    Route::get('/getData', function() {

        $data = [
            'moneyAccounts' => ( new MoneyAccountsController() ) -> show(),
            'transactions' => ( new TransactionsController() ) -> show(),
            'transfers' => ( new TransferController() ) -> show(),
            'repTransactions' => ( new RepeatingTransactionController() ) -> getAll()
        ];

        return $data;

    });

    Route::post('/saveNewMoneyAccount', [MoneyAccountsController::class, 'store']);

    Route::post('/updateMoneyAccount', [MoneyAccountsController::class, 'update']);

    Route::post('/archiveMoneyAccount', [MoneyAccountsController::class, 'archive']);

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

    //Route::post('/signup', [\App\Http\Controllers\UserController::])


    Route::get("/test", function() {

        //error_log('2022-01-25' > today());

        //return('2022-01-20' == substr(today(), 0, 10));

        //return substr(today(), 0, 10);

        //return strtotime("+1 month");

        //Was bekomme ich bei SELECT zurückgegeben?

        //Log::debug("Hello Worls! I'm Log::debug");

        //DebugBar::debug("Hello Worldo");

//    $arr = [];
//    if( empty($arr) ) return '$arr is empty';
//    else return '$arr is not empty?';

        //return MoneyAccount::all()->count();
        //return MoneyAccount::orderBy('id', 'desc')->first()->id;

//    return (new MoneyAccountsController) -> update([
//        'id' => 2,
//        'name' =>
//    ]);



        //---------------------------------------------------

        //Dieser Test funktioniert folgendermaßen:
        //Der Code geht alle Daueraufträge durch. Am Anfang definierst du, welches Datum der 'heutige' Tag hat: im Code wird $testToday verwendet. Wenn $testToday über dem Enddatum eines Dauerauftrags liegt, dürfte der Dauerauftrag nicht ausegführt werden.
        //Der Code nimmt sich den Dauerauftrag, der gerade in der Schleife dran ist. Er rechnet ab dem Startdatum das Intervall hoch, bis man bei heute oder in der Zukunft landet. Wenn man auf heute landet, wird der Dauerauftrag ausgeführt, sonst nicht.

        $today = substr(today(), 0, 10);
        $testToday = '2022-05-31';
        $testDate = new DateTime('last day of May');




        //Gehe jeden Dauerauftrag in der DB durch
        foreach( RepeatingTransaction::all() as $repTransaction ) {

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

                //Kommt das Programm an diese Stelle, ist der Dauerauftrag tatsächlich noch gültig.
                //Überprüfe, ob der Dauerauftrag bereits begonnen hat oder heute beginnt. Wenn nicht, gehe zum nächsten Dauerauftrag, denn der Dauerauftrag hat noch nicht begonnen.
                if( $repTransaction->starting_date <= $testToday ) {



                    $weekdays = [];
                    //Sind Wochentage im Intervall ausgewählt?
                    if($repTransaction->weekdays->first() != null) {

                        //Hol dir die ausgewählten Wochentage und speichere sie in $weekdays
                        $repTransWeekdays = $repTransaction->weekdays;
                        foreach ($repTransWeekdays as $repTransWeekday) {

                            $weekdays[] = [

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

                    //Wöchentlich
                    if( !empty($weekdays) ) {

                        //Heutiger Wochentag (z.B. Montag) als Zahl
                        $wDayToday = getdate(strtotime($testToday))['wday'];
                        //Wenn $wday == 0, ist heute ein Sonntag -> setz wday auf 7 (damit ich damit arbeiten kann)
                        if( $wDayToday == 0 ) $wDayToday = 7;

                        $wDayTodayString = null;
                        //Überprüfen, ob heute einer der im Intervall ausgewählten Wochentage ist (Bsp: Intervall beinhaltet Montag -> Ist heute ein Montag?)
                        foreach($weekdays as $weekday) {

                            if($weekday['id'] == $wDayToday) {

                                //Wenn heute einer ausgewählten Wochentage ist, speichere, welcher es ist (als englischer String, zB "monday")
                                $wDayTodayString = $weekday['weekday'];

                            }

                        }


                        //Wenn heute keiner der ausgewählten Wochentage ist, ist $wDayToday noch ein int. Also sind im Intervall Wochentage, aber heute ist keiner der Wochentage. Also fällt heute keine Transaktion an. continue; zum nächsten Dauerauftrag.
                        if( gettype($wDayTodayString) !== 'string' ) continue;

                        Debugbar::debug("Einer der ausgewählten Wochentage = Heutiger Wochentag");

                        //Wochentag von startingDate (z.B. Montag) als Zahl
                        $wDayStartingDate = getdate(strtotime($repTransaction->starting_date))['wday'];
                        //Wenn $wday == 0, ist heute ein Sonntag -> setz wday auf 7 (damit ich damit arbeiten kann)
                        if( $wDayStartingDate == 0 ) $wDayStartingDate = 7;

                        $difference = abs($wDayToday - $wDayStartingDate);

                        while ($nextDate <= $testToday) {

                            $intervalString = "+" . $i * ($repTransaction->interval_number + 1) . " weeks - " . $difference . " days";
                            //datetime(2.Argument): Startdatum + i * Intervall als Zahl. Wird umformatiert zu einem Datum im Format 'Y-m-d'
                            $nextDate = date('Y-m-d', strtotime( $repTransaction->starting_date . " " . $intervalString ));


                            //Wenn ein nächstes Datum des Dauerauftrags gleich heute ist,
                            if( $nextDate == $testToday ) {

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
                    //Monatlich & Jährlich
                    else {

                        while($nextDate <= $testToday) {

                            $intervalTypes = ['weeks', 'months', 'years'];

                            //z.B. 1 * 2 Monate, 2 * 2 Monate, 3 * 2 Monate, ...
                            $intervalString = "+" . $i * ($repTransaction->interval_number + 1) . " " . $intervalTypes[$repTransaction->interval_type];

                            //datetime(2.Argument): Startdatum + i * Intervall als Zahl. Wird umformatiert zu einem Datum im Format 'Y-m-d'
                            //Bsp: startdatum + 2 Monate = $nextDate
                            //Startdatum: 15.05.2022 | Heute: 15.06.2022 | Typ: Monatlich || -> funktioniert
                            //Startdatum: 31.05.2022 | Heute: 30.06.2022 | Typ: Monatlich || -> funktioniert nicht
                            $nextDate = date('Y-m-d', strtotime( $repTransaction->starting_date . " " . $intervalString ));


                            //Wenn ein nächstes Datum des Dauerauftrags gleich heute ist,
                            if( $nextDate == $testToday ) {

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

                                //Beende die Intervall-Schleife, Gehe dadurch zum nächsten Dauerauftrag
                                break;

                            }

                            //Erhöhe i um 1 -> Erhöhe das Intervall
                            $i++;

                        }

                    }

                }

            }

        }






        //---------------------------------------------------


    });

    Route::get('/refreshDB', function() {

        Artisan::call('migrate:refresh');
        Artisan::call('db:seed');

    });

});

Route::post('/changeLanguage', function(Request $request) {

    $request->session()->put(['lang' => $request->lang]);

});

Route::get('/welcome/{locale}', function($locale, Request $request) {

    App::setLocale($locale);
    return view('welcome');

})->where('locale', 'de|en');


Route::get('/welcome/{any?}', function(Request $request) {

    //Neue Session: preferred Browser language als Anfangs-locale nehmen und in Laravel-Session speichern
    if($request->session()->has('lang') === false) {

        $preferredLanguage = substr($request->getPreferredLanguage(), 0, 2);
        App::setLocale($preferredLanguage);
        $request->session()->put(['lang' => $preferredLanguage]);
        return redirect('/welcome/'.$preferredLanguage);

    }

    return redirect('/welcome/'.$request->session()->get('lang'));

})->name('welcome');


Route::get('/auth/{any}/{token?}', function(Request $request) {

    return view('index')
        ->with('authenticated', 'no');

})->where('any', 'login|signup|forgotPassword|resetPassword')->middleware('guest:sanctum')->name('authPage');


Route::redirect('/auth/{any?}', '/auth/login');


/*Route::get('/auth/signup', function() {

    return view('index')
        ->with('authenticated', 'no');

})->middleware('guest:web')->name('signup');*/


Route::get('/home', function() {

    return view('home');

});


Route::get('/{any}', function () {
    return view('index')->with('authenticated', 'yes');

})->where('any', '.*')->middleware('auth:sanctum');



/*Route::get('/overview', function() {

    return view('index')->with('authenticated', 'yes');

})->middleware('auth:sanctum');

Route::redirect('/{any}', '/welcome/de')->where('any', '.*')->middleware('guest:web');*/





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
