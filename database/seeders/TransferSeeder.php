<?php

namespace Database\Seeders;

use App\Models\Transfer;
use Illuminate\Database\Seeder;

class TransferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Transfer::factory()->create([

            'name' => "Das Blu- Ich meine, das Geld meiner Feinde!",
            'description' => "Ich bin nun reich. Reich an Ehre und Geld!",
            'from_id' => 2,
            'to_id' => 1,
            'money' => 10,
            'date' => '2021-11-05'

        ]);

        Transfer::factory()->create([

            'name' => "Test1",
            'from_id' => 3,
            'to_id' => 2,
            'money' => 100,
            'date' => '2021-11-05'

        ]);

        Transfer::factory()->count(5)->create();

    }
}
