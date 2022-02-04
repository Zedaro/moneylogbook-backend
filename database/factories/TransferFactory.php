<?php

namespace Database\Factories;

use App\Models\MoneyAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $fromId = $this->faker->numberBetween(1, MoneyAccount::orderBy('id', 'desc')->first()->id);
        $toId = $this->faker->numberBetween(1, MoneyAccount::orderBy('id', 'desc')->first()->id);
        while($toId == $fromId) {

            $toId = $this->faker->numberBetween(1, MoneyAccount::orderBy('id', 'desc')->first()->id);

        }

        return [

            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'money' => $this->faker->randomFloat(2, 0.01, 300.00),
            'from_id' => $fromId,
            'to_id' => $toId,
            'date' => $this->faker->date('Y-m-d')

        ];

    }
}
