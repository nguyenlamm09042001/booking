<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Customer;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'style' => 'required|string',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        // 🔍 Tìm hoặc tạo customer
        $customer = Customer::firstOrCreate(
            ['phone' => $validated['phone']],
            [
                'name' => $validated['name'],
                'business_id' => 1 
            ]
        );

        $serviceMap = [
            'Cắt' => 1,
            'Uốn' => 2,
            'Nhuộm' => 3,
            'Gội đầu' => 4,
        ];

        $serviceId = $serviceMap[$validated['style']] ?? 1;

        $appointment = Appointment::create([
             'user_id' => 1,
            'service_id' => $serviceId,
            'business_id' => 1, 
            'staff_id' => 1, 
            'date' => $validated['date'],
            'time_start' => $validated['time'],
            'status' => 'pending',
            'notes' => $validated['style'],
        ]);

        return response()->json([
            'message' => 'Đặt lịch thành công!',
            'data' => $appointment
        ], 201);
    }
}
