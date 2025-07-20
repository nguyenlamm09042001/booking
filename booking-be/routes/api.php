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
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth');
    Route::get('/{business}/services', [BusinessController::class, 'getService']);

    // 🔹 Quản lý dịch vụ
    Route::get('/services/{id}', [BusinessController::class, 'show']); // Lấy chi tiết 1 dịch vụ
    Route::get('/{id}/services/total', [BusinessController::class, 'getTotalServicesByBusiness']); // Tổng dịch vụ
    Route::get('/{id}/services/latest', [BusinessController::class, 'latestServices']); // 3 dịch vụ mới nhất
    Route::post('/{business}/services', [BusinessController::class, 'creatService']);
    Route::put('/{business}/services/{service}', [BusinessController::class, 'updateService']);
    Route::delete('/{business}/services/{service}', [BusinessController::class, 'destroyService']);

    Route::get('/{business}/assignments', [BusinessController::class, 'getAssignments']);
    Route::get('/{business}/staffs', [BusinessController::class, 'getStaffs']);
    Route::post('/{business}/staffs', [BusinessController::class, 'createStaffs']);
    Route::put('/{business}/staffs/{staff}', [BusinessController::class, 'updateStaff']);
    Route::delete('/{business}/staffs/{staff}', [BusinessController::class, 'destroyStaff']);

    // 🔹 Lịch hẹn
    Route::get('/{id}/appointments', [BusinessController::class, 'getAppointmentsByBusiness']);
    Route::get('/{id}/appointments/today', [BusinessController::class, 'getTodayAppointments']);
    Route::put('/assignments/{appointment}', [BusinessController::class, 'updateAssignments']);
    Route::delete('/assignments/{appointment}', [BusinessController::class, 'destroyAssignments']);

    // 🔹 Feedback
    Route::get('/{id}/feedbacks', [BusinessController::class, 'getFeedback']);
    Route::get('/{id}/feedbacks/today', [BusinessController::class, 'getTodayFeedbacks']);

    // 🔹 Doanh thu
    Route::get('/{id}/income/month', [BusinessController::class, 'getIncomeThisMonth']);
    Route::get('/{id}/income/filter', [BusinessController::class, 'filterIncome']);

    // 🔹 Trạng thái cấu hình
    Route::get('/{id}/setup-status', [BusinessController::class, 'setupStatus']);
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

Route::post('/users/appointments', [UserController::class, 'createAppointment']);

Route::get('/user/nearby', [UserController::class, 'getNearbyBusinesses']);

Route::get('/user/random-service', [UserController::class, 'random']);
Route::get('/user/services', [UserController::class, 'getServices']); // Without middleware

Route::get('/user/business', [UserController::class, 'getBusinessByUser']);
