<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment; // Import model Appointment
use Illuminate\Support\Facades\Auth; // Import Auth facade

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
}
