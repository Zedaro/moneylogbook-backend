<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    public function moneyAccount() {
        return $this->belongsTo(MoneyAccount::class, 'money_account_id');
    }
}
