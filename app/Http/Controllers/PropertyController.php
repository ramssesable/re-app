<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Property;

class PropertyController extends Controller
{
    public function index()
    {
        Log::info("Properties info requested.");

        return response()->json(Property::all());
    }
    
    public function show($id)
    {
        Log::info("Property $id info requested.");

        return response()->json(Property::find($id));
    }
    
    public function store(Request $request)
    {
        Log::info("Adding Property.");

        $validator = \Validator::make($request->post(), [
            'name' => 'required|min:1|max:128',
            'real_state_type' => 'required|in:house,department,land,commercial_ground',
            'street' => 'required|min:1|max:128',
            'external_number' => 'required|alpha_dash:ascii|min:1|max:12',
            'internal_number' => 'nullable|alpha_dash:ascii|min:1|max:12',
            'neighborhood' => 'required|min:1|max:128',
            'city' => 'required|min:1|max:64',
            'country' => 'required|alpha:2',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }
        
        return $request->post();

        return Property::create($request::all());
    }
    
    public function edit($id, Request $request)
    {        
        Log::info("Updating Property.");
        
        return Property::update($request::all());
    }
    
    public function destroy($id)
    {
        Log::info("Deleting Property.");

        return Property::update($id, $request::all());
    }
}
