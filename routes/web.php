<?php

use App\Http\Controllers\RepeatingTransactionController;
use App\Http\Controllers\TransferController;
use App\Models\MoneyAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Models\Post;
use App\Models\Number;
use App\Http\Controllers\MoneyAccountsController;
use App\Http\Controllers\TransactionsController;

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
