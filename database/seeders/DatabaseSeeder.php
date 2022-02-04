<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            MoneyAccountSeeder::class,
            TransactionSeeder::class,
            TransferSeeder::class,
            RepeatingTransactionSeeder::class,
        ]);

    }
}
