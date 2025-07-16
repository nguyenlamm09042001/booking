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

//
// 🔒 AUTH ROUTES
//
Route::middleware('web')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth');
});

Route::post('/register', [AuthController::class, 'register']);

//
// 🔧 ADMIN ROUTES
//
Route::prefix('admin')->group(function () {
    Route::get('/appointments', [AdminController::class, 'appointments']);
    Route::get('/businesses', [AdminController::class, 'getBusinesses']);
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::patch('/users/{id}/status', [AdminController::class, 'updateStatus']);
    Route::put('/businesses/{id}/approve', [AdminController::class, 'approveBusiness']);
    Route::put('/businesses/{id}/pause', [AdminController::class, 'pauseBusiness']);
    Route::put('/businesses/{id}/resume', [AdminController::class, 'resumeBusiness']);
    Route::delete('/businesses/{id}', [AdminController::class, 'deleteBusiness']);
    Route::get('/businesses/{id}', [AdminController::class, 'showBusiness']); // 👁 optional nếu cần
});


//
// 🏢 BUSINESS ROUTES (auth:sanctum optional – thêm nếu cần bảo mật)
//
Route::prefix('businesses')->group(function () {
    Route::get('/services', [BusinessController::class, 'getServices']);
    Route::get('/{id}/appointments', [BusinessController::class, 'getAppointmentsByBusiness']);
    Route::get('/services/{id}', [BusinessController::class, 'show']);
    Route::get('/{business}/services', [BusinessController::class, 'getService']);
    Route::post('/{business}/services', [BusinessController::class, 'creatService']);
    Route::put('/{business}/services/{service}', [BusinessController::class, 'updateService']);
    Route::delete('/{business}/services/{service}', [BusinessController::class, 'destroyService']);

    // 🔥 Feedback & Statistics
    Route::get('/{id}/feedbacks', [BusinessController::class, 'getFeedback']);
    Route::get('/{id}/feedbacks/today', [BusinessController::class, 'getTodayFeedbacks']);
    Route::get('/{id}/services/total', [BusinessController::class, 'getTotalServicesByBusiness']);
    Route::get('/{id}/appointments/today', [BusinessController::class, 'getTodayAppointments']);
    Route::get('/{id}/income/month', [BusinessController::class, 'getIncomeThisMonth']);
    Route::get('/{id}/income/filter', [BusinessController::class, 'filterIncome']);
});

//
// 📅 APPOINTMENT ROUTES
//
Route::prefix('appointments')->group(function () {
    Route::put('/{id}/confirm', [BusinessController::class, 'confirm']);
    Route::put('/{id}/cancel', [BusinessController::class, 'cancel']);
    Route::put('/{id}/complete', [BusinessController::class, 'complete']);
});

//
// 👤 USER ROUTES (auth:sanctum protected)
//
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users/appointments', [UserController::class, 'getappointmentuser']);
    Route::post('/users/feedbacks', [UserController::class,'createFeedback']); // 🛡 Đưa vào đây
    Route::put('/user/profile-information', [ProfileController::class, 'apiUpdate']);
    Route::put('/user/password', [ProfileController::class, 'apiUpdatePassword']);
    Route::delete('/user', [ProfileController::class, 'apiDestroy']);
});

Route::get('/user/nearby', [UserController::class, 'getNearbyBusinesses']);

Route::get('/user/random-service', [UserController::class, 'random']);
