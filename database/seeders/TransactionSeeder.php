<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Transaction::factory()->create([

            'name' => 'Robux',
            'description' => 'Sophia ist süchtig, aber so was von ey...',
            'money' => 10.00,
            'money_account_id' => 1,
            'date' => '2021-11-05',

        ]);

        Transaction::factory()->count(3)->create();

    }
}
