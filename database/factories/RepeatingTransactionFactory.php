<?php

namespace Database\Factories;

use App\Models\MoneyAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class RepeatingTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $intervalType = $this->faker->numberBetween(0, 2);
        while ($intervalType == 0) {
            $intervalType = $this->faker->numberBetween(0, 2);
        }

        return [

            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'money' => $this->faker->randomFloat(2, 0.01, 300.00),
            'money_account_id' => $this->faker->numberBetween(1, MoneyAccount::orderBy('id', 'desc')->first()->id),
            'starting_date' => $this->faker->date('Y-m-d'),
            'ending_date' => null,
            'interval_number' => $this->faker->numberBetween(0, 11),
            'interval_type' => $intervalType,
            'expired' => false,

        ];

    }
}
