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
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/hola', function() {
    return response()->json(['name' => "Ramssés", 'lastname' => "Gomez"]);
});

Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::post('/properties', [PropertyController::class, 'store']);
Route::put('/properties/{id}', [PropertyController::class, 'edit']);
Route::delete('/properties/{id}', [PropertyController::class, 'destroy']);
