<?php

namespace Database\Factories;

use App\Models\MoneyAccount;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [

            'name' => $this->faker->word(),
            'description' => $this->faker->sentence(),
            'money' => $this->faker->randomFloat(2, -300.00, 300.00),
            'money_account_id' => $this->faker->numberBetween(1, MoneyAccount::orderBy('id', 'desc')->first()->id),
            'date' => $this->faker->date('Y-m-d')

        ];

    }
}
