<?php

namespace Database\Seeders;

use App\Models\MoneyAccount;
use Illuminate\Database\Seeder;

class MoneyAccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        MoneyAccount::factory()->create([

            'name' => 'Sparkasse',
            'money' => 1010.00,
            'color' => '#EA0A8E'

        ]);

        MoneyAccount::factory()->create([

            'name' => 'ING DiBa',
            'money' => 2000.00,
            'color' => '#FF6600'

        ]);

        MoneyAccount::factory()->create([

            'name' => 'Bank 3000',
            'money' => 3000.00,
            'color' => '#00FFFB'

        ]);

        MoneyAccount::factory()->count(3)->create();

    }
}
