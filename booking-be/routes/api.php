<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BusinessController;



// API login, logout, user info
Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth');
});

Route::post('/register', [AuthController::class, 'register']);

Route::get('/services', [ServiceController::class, 'index']);

Route::get('/businesses', [BusinessController::class, 'index']);
Route::get('/businesses/{id}', [BusinessController::class, 'show']);