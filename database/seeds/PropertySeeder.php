<?php

use Illuminate\Database\Seeder;
use App\Property;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('properties')->insert([
            'name'              => fake()->name(),
            'real_state_type'   => array_rand(Property::$types),
            'street'            => fake()->text(),
            'external_number'   => Str::random(12),
            'internal_number'   => Str::random(12),
            'neighborhood'      => fake()->text(),
            'city'              => Str::random(20),
            'country'           => Str::random(2),// ISO
            'rooms'             => rand(1, 10),
            'bathrooms'         => rand(1, 10),
            'comments'          => fake()->text(),
        ]);
    }
}
