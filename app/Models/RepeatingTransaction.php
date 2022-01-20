<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepeatingTransaction extends Model
{
    use HasFactory;

    public function weekdays() {

        return $this->hasMany(RepeatingTransactionWeekday::class, 'id', 'repeating_transaction_id');

    }

}
