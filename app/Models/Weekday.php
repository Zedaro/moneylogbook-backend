<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weekday extends Model
{

    use HasFactory;

    public function repeatingTransactionWeekday() {

        return $this->belongsToMany(RepeatingTransactionWeekday::class, 'id', 'weekday_id');

    }

}
