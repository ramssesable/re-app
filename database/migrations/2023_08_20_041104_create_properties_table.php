<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
          
            $table->string('name', 128);
            $table->enum('real_state_type', ['house', 'department', 'land', 'commercial_ground']);
            $table->string('street', 128);
            $table->string('external_number', 12); //Mask
            $table->string('internal_number', 12); //Mask
            $table->string('neighborhood', 128);
            $table->string('city', 64);
            $table->string('country', 2); // ISO 3166-Alpha2
            $table->integer('rooms');
            $table->double('bathrooms');
            $table->string('comments')->nullable();
          
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
