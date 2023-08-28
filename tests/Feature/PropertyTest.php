<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PropertyTest extends TestCase
{
    /**
     * Add a house type record without bathrooms.
     */
    public function testHouseWithoutBathroomTest()
    {
        $payload = [
            "name"              => "John Doe",
            "real_state_type"   => "house",
            "street"            => "Martin Luther King St",
            "external_number"   => "318",
            "internal_number"   => "",
            "neighborhood"      => "75455",
            "city"              => "Mount Pleasant",
            "country"           => "CA",
            "rooms"             => "3",
            "bathrooms"         => "0",
            "comments"          => "Located in the Historical area of Pittsburg is this cute 3 bedroom and 1 bath home.",
        ];

        $this->json('post', '/api/properties', $payload)
            ->assertStatus(400)
            ->assertJson([
                "status"=> false,
                "errors"=> [
                    "The bathrooms field must be at least 1."
                ]
            ]);

    }
}
