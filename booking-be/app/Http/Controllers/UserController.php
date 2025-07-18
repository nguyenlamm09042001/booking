<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment; // Import model Appointment
use Illuminate\Support\Facades\Auth; // Import Auth facade
use App\Models\User;
use App\Models\Service;
use App\Models\Feedback;
use App\Helpers\GeoHelper;
use App\Models\Business;

class UserController extends Controller
{

    public function getBusinessByUser(Request $request)
{
    $userId = $request->user()->id; // nếu dùng sanctum auth
    // hoặc nếu chưa login thì dùng:
    // $userId = $request->query('user_id');

    $business = Business::where('user_id', $userId)->first();

    if (!$business) {
        return response()->json(['message' => 'Không tìm thấy business'], 404);
    }

    return response()->json([
        'business_id' => $business->id,
        'business' => $business
    ]);
}

    public function getServices()
    {
        $services = Service::with(['business.user'])->get();
        return response()->json($services);
    }

    public function getappointmentuser()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Lấy tất cả lịch hẹn kèm theo feedback của user đó
            $appointments = Appointment::where('user_id', $user->id)->get();

            foreach ($appointments as $appointment) {
                $feedback = Feedback::where('user_id', $user->id)
                    ->where('business_id', $appointment->business_id)
                    ->first();

                $appointment->feedback = $feedback;
            }

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

    public function createFeedback(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'comment'     => 'nullable|string',
            'rating'      => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();

        // ✅ Kiểm tra nếu đã đánh giá rồi thì không cho nữa
        $hasFeedback = Feedback::where('user_id', $user->id)
            ->where('business_id', $validated['business_id'])
            ->exists();

        if ($hasFeedback) {
            return response()->json([
                'message' => '❌ Bạn đã gửi đánh giá cho cơ sở này rồi.'
            ], 409); // Conflict
        }

        // ✅ Nếu chưa, cho tạo mới
        $feedback = Feedback::create([
            'user_id'     => $user->id,
            'business_id' => $validated['business_id'],
            'comment'     => $validated['comment'],
            'rating'      => $validated['rating'],
            'type'        => 'user',
        ]);

        return response()->json([
            'message'  => '✅ Gửi đánh giá thành công!',
            'feedback' => $feedback
        ], 201);
    }
    public function getNearbyBusinesses()
    {
        $businesses = Business::where('status', 'Đang hoạt động')
            ->whereNotNull('latitude')
            ->whereNotNull('longitude')
            ->get();
    
        return response()->json($businesses);
    }
    public function store(Request $request)
    {
        $business = new Business();
        $business->name = $request->name;
        $business->location = $request->location;

        $coords = GeoHelper::getLatLngFromAddress($business->location);
        if ($coords) {
            $business->latitude = $coords['lat'];
            $business->longitude = $coords['lng'];
        }

        $business->save();
        return response()->json($business);
    }

    public function random(Request $request)
{
    $service = Service::inRandomOrder()->first();
    return response()->json($service);
}
}
