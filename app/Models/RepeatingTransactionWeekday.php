<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepeatingTransactionWeekday extends Model
{
    use HasFactory;

    public function repeatingTransaction() {

        return $this->belongsTo(RepeatingTransaction::class, 'repeating_transaction_id');

    }

    public function weekday() {

        return $this->belongsTo(Weekday::class, 'weekday_id');

    }

}
