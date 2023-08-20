<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hola', function() {
    return response()->json(['name' => "Ramssés", 'lastname' => "Gomez"]);
});


Route::get('/properties', [PropertyController::class, 'list']);
Route::get('/properties/:id', [PropertyController::class, 'show']);
Route::post('/properties', [PropertyController::class, 'create']);
Route::put('/properties/:id', [PropertyController::class, 'update']);
Route::delete('/properties/:id', [PropertyController::class, 'delete']);