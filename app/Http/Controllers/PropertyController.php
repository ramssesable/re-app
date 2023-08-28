<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules\Numeric;
use App\Models\Property;
use Jekk0\laravel\Iso3166\Validation\Rules\Iso3166Alpha2;

class PropertyController extends Controller
{
    public function index()
    {
        Log::info("Properties info requested.");

        return response()->json(Property::all('id', 'name', 'real_state_type', 'city', 'country'));
    }
    
    public function show($id)
    {
        Log::info("Property $id info requested.");

        return response()->json(Property::find($id));
    }
    
    public function store(Request $request)
    {
        Log::info("Adding Property.");

        $custom_min = in_array($request->post('real_state_type'), ['land', 'commercial_ground']) ? 0 : 1;

        $validator = \Validator::make($request->post(), [
            'name'              => 'required|min:1|max:128',
            'real_state_type'   => 'required|in:house,department,land,commercial_ground',
            'street'            => 'required|min:1|max:128',
            'external_number'   => 'required|alpha_dash:ascii|min:1|max:12',
            'internal_number'   => 'required_if:real_state_type,department,commercial_ground|nullable|alpha_dash:ascii|min:1|max:12',
            'neighborhood'      => 'required|min:1|max:128',
            'city'              => 'required|min:1|max:64',
            'country'           => ['required', new Iso3166Alpha2()],
            'rooms'             => 'required|integer',
            'bathrooms'         => 'required|numeric|min:'.$custom_min,
            'comments'          => 'nullable|min:1|max:128',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->all()
            ], 400);
        }

        return response()->json(Property::create($request->post()));
    }
    
    public function edit($id, Request $request)
    {
        Log::info("Updating Property.");

        $custom_min = !in_array($request->post('real_state_type'), ['land', 'commercial_ground']);

        $validator = \Validator::make($request->post(), [
            'name'              => 'required|min:1|max:128',
            'real_state_type'   => 'required|in:house,department,land,commercial_ground',
            'street'            => 'required|min:1|max:128',
            'external_number'   => 'required|alpha_dash:ascii|min:1|max:12',
            'internal_number'   => 'required_if:real_state_type,department,commercial_ground|nullable|alpha_dash:ascii|min:1|max:12',
            'neighborhood'      => 'required|min:1|max:128',
            'city'              => 'required|min:1|max:64',
            'country'           => ['required', new Iso3166Alpha2()],
            'rooms'             => 'required|integer',
            'bathrooms'         => 'required|numeric|min:'.$custom_min,
            'comments'          => 'nullable|min:1|max:128',
        ]);
        
        $property = Property::find($id);
        
        if ($property->update($request->post())) {
            return response()->json($property);
        } else {
            return response()->json([
                'status' => false,
                'errors' => ['Failed to update record']
            ], 400);
        }
    }
    
    public function destroy($id)
    {
        Log::info("Deleting Property.");
        
        $property = Property::find($id);

        if ($property && $property->delete()) {
            return response()->json($property);
        } else {
            return response()->json([
                'status' => false,
                'errors' => ['Failed to delete the property']
            ], 400);
        }
    }
}
