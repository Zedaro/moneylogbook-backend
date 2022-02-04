<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MoneyAccountFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [

            'name' => $this->faker->company(),
            'money' => $this->faker->randomFloat(2, 0.01, 10000.00),
            'color' => $this->faker->hexColor()

        ];
    }
}
