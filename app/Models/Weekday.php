<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Weekday extends Model
{

    use HasFactory;

    public function repeatingTransactionWeekdays() {

        return $this->hasMany(RepeatingTransactionWeekday::class, 'weekday_id');

    }

}
