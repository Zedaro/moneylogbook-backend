<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    //protected $table = 'posts';   -> Default is: class name in lowercase and an 's' at the end, so here it would be 'posts'
    //protected $primaryKey = 'bla'; -> Default is: 'id'

}
