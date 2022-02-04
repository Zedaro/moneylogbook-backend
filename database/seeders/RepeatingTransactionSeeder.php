<?php

namespace Database\Seeders;

use App\Models\RepeatingTransaction;
use Illuminate\Database\Seeder;

class RepeatingTransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        RepeatingTransaction::factory()->create([

            'name' => 'Schweigegeld',
            'description' => '...',
            'money_account_id' => 1,
            'starting_date' => '2021-07-16',
            'interval_number' => 1,
            'interval_type' => 1,

        ]);

    }
}
