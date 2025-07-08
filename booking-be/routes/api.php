<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BusinessController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/admin/appointments', [AdminController::class, 'appointments']);
});


Route::post('/register', [AuthController::class, 'register']);

Route::get('admin/services', [ServiceController::class, 'index']);
Route::get('admin/users', [AdminController::class, 'getusers']);

Route::get('businesses', [BusinessController::class, 'index']);
Route::get('businesses/{id}/appointments', [BusinessController::class, 'getAppointmentsByBusiness']);
Route::get('/businesses/{id}', [BusinessController::class, 'show']);
Route::get('/businesses/{business}/services', [BusinessController::class, 'getService']);
Route::post('/businesses/{business}/services', [BusinessController::class, 'creatService']);
Route::put('/businesses/{business}/services/{service}', [BusinessController::class, 'updateService']);
Route::delete('/businesses/{business}/services/{service}', [BusinessController::class, 'destroyService']);
Route::get('/businesses/{id}', [BusinessController::class, 'getFeedback']);

Route::middleware('auth:sanctum')->get('/appointments/user', [UserController::class, 'getappointmentuser']);
Route::middleware('auth:sanctum')->put('/user/profile-information', [ProfileController::class, 'apiUpdate']);
Route::middleware('auth:sanctum')->put('/user/password', [ProfileController::class, 'apiUpdatePassword']);
Route::middleware('auth:sanctum')->delete('/user', [ProfileController::class, 'apiDestroy']);


Route::post('/appointments', [AppointmentController::class,'store']);