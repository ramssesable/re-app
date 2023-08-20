<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Property;

class PropertyController extends Controller
{
    public function list() {
        Log::info('Properties info requested.');

        return Property::all();
    }
    
    public function show($id) {
        Log::info('Property {id} requested.', ['id' => $id]);

        return Property::find($id);
    }
    
    public function create(Request $request) {
        Log::info('Adding Property.');

        return Property::create($request::all());
    }
    
    public function update($id, Request $request) {        
        Log::info('Updating Property.');
        
        return Property::update($request::all());
    }
    
    public function delete($id) {
        Log::info('Deleting Property.');

        return Property::update($id, $request::all());
    }
}
