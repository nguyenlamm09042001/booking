<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment; // Import model Appointment
use Illuminate\Support\Facades\Auth; // Import Auth facade
use App\Models\User;
use App\Models\Service;
class UserController extends Controller
{
    public function getappointmentuser()
    {
        try {
            // Lấy user hiện tại
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Lấy danh sách lịch hẹn của user
            $appointments = Appointment::where('user_id', $user->id)->get();

            return response()->json([
                'message' => 'User appointments retrieved successfully',
                'appointments' => $appointments,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve appointments',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function createAppointment(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'style' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);
    
        // Tìm hoặc tạo user theo phone
        $User = User::firstOrCreate(
            ['phone' => $validated['phone']],
            [
                'name' => $validated['name'],
                'business_id' => 1 
            ]
        );
    
        // 🛑 1. Check service tồn tại
        $service = Service::where('name', $validated['style'])->where('business_id', 1)->first();
    
        if (!$service) {
            return response()->json([
                'message' => '⚠️ Dịch vụ "' . $validated['style'] . '" chưa được tạo cho cơ sở này. Vui lòng thêm trước.'
            ], 400);
        }
    
        // 🛑 2. Check staff tồn tại
        $staff = \App\Models\Staff::where('business_id', 1)->first();
    
        if (!$staff) {
            return response()->json([
                'message' => '⚠️ Cơ sở chưa có nhân viên. Vui lòng thêm nhân viên trước khi nhận đặt lịch.'
            ], 400);
        }
    
        // ✅ 3. Tạo appointment nếu đủ dữ liệu
        $appointment = Appointment::create([
            'user_id' => $User->id,
            'service_id' => $service->id,
            'business_id' => 1, 
            'staff_id' => $staff->id, 
            'date' => $validated['date'],
            'time_start' => $validated['time'],
            'status' => 'Chờ xác nhận',
            'notes' => $validated['style'],
        ]);
    
        return response()->json([
            'message' => '✅ Đặt lịch thành công!',
            'data' => $appointment
        ], 201);
    }
}
