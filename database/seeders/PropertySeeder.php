<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fake = Faker::create();
        $a = 0;

        do {
            Property::create([
                'name'              => $fake->name,
                'real_state_type'   => Property::$types[rand(0, 3)],
                'street'            => $fake->sentence(3),
                'external_number'   => \Str::random(12),
                'internal_number'   => \Str::random(12),
                'neighborhood'      => $fake->sentence(1),
                'city'              => \Str::random(20),
                'country'           => $fake->countryCode, // ISO
                'rooms'             => rand(1, 10),
                'bathrooms'         => rand(1, 10),
                'comments'          => $fake->sentence,
            ]);

            $a++;
        } while ($a <= 20);

    }
}
