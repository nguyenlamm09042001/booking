<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Feedback;
use App\Models\Staff;
use App\Models\ServiceStaff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BusinessController extends Controller
{
    public function getStaffs($businessId)
    {
        $business = Business::findOrFail($businessId);

        $staffs = $business->staffs()
            ->leftJoin('service_staff', 'staff.id', '=', 'service_staff.staff_id')
            ->leftJoin('services', 'service_staff.service_id', '=', 'services.id')
            ->select(
                'staff.*',
                'services.name as service_name',
                'service_staff.service_id'
            )
            ->get();

        return response()->json($staffs);
    }


    public function getService(Business $business)
    {
        $services = $business->services()->orderBy('created_at', 'desc')->get();
        return response()->json($services);
    }





    public function show($id)
    {
        $business = Business::with('services')->findOrFail($id);
        return response()->json($business);
    }


    public function getAppointmentsByBusiness($id)
    {
        $appointments = Appointment::where('business_id', $id)
            ->with(['user', 'service', 'staff'])
            ->get();

        return response()->json($appointments);
    }



    public function creatService(Request $request, Business $business)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'duration' => 'required|integer|min:1',
        ]);

        $service = new Service();
        $service->business_id = $business->id;
        $service->name = $validated['name'];
        $service->price = $validated['price'];
        $service->description = $validated['description'];
        $service->duration = $validated['duration']; // thêm dòng này
        $service->status = 'active'; // Hoặc giá trị default của bạn
        $service->save();

        return response()->json([
            'message' => 'Thêm dịch vụ thành công!',
            'service' => $service
        ], 201);
    }

    public function updateService(Request $request, Business $business, Service $service)
    {
        // Đảm bảo service thuộc về business này
        if ($service->business_id !== $business->id) {
            return response()->json(['message' => 'Dịch vụ không thuộc doanh nghiệp này'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'duration' => 'required|integer',
        ]);

        $service->update($validated);

        return response()->json([
            'message' => 'Cập nhật dịch vụ thành công',
            'service' => $service
        ], 200);
    }


    public function destroyService(Business $business, Service $service)
    {
        // Đảm bảo service thuộc về business này
        if ($service->business_id !== $business->id) {
            return response()->json(['message' => 'Dịch vụ không thuộc doanh nghiệp này'], 403);
        }

        $service->delete();

        return response()->json(['message' => 'Xoá dịch vụ thành công'], 200);
    }

    public function getFeedback($id)
    {
        $feedbacks = Feedback::where('business_id', $id)
            ->with('user')
            ->get();

        return response()->json($feedbacks);
    }



    public function getTodayFeedbacks($id)
    {
        $today = Carbon::today();

        $feedbacks = Feedback::where('business_id', $id)
            ->whereDate('created_at', $today)
            ->with('user')
            ->get();

        $total = $feedbacks->count();

        return response()->json([
            'total' => $total,
            'feedbacks' => $feedbacks
        ]);
    }


    public function getTotalServicesByBusiness($id)
    {
        $business = Business::findOrFail($id);
        $total = $business->services()->count();

        return response()->json([
            'business_id' => $id,
            'total_services' => $total
        ]);
    }

    public function getTodayAppointments($id)
    {
        $today = Carbon::today();

        $appointments = Appointment::where('business_id', $id)
            ->whereDate('date', $today) // thay 'date' bằng tên cột ngày thực tế trong DB
            ->with(['user', 'service', 'staff'])
            ->get();

        $total = $appointments->count();

        return response()->json([
            'total' => $total,
            'appointments' => $appointments
        ]);
    }

    public function getIncomeThisMonth($id)
    {
        $startOfMonth = Carbon::now()->startOfMonth();
        $endOfMonth = Carbon::now()->endOfMonth();

        $income = Appointment::where('appointments.business_id', $id)
            ->whereBetween('appointments.date', [$startOfMonth, $endOfMonth])
            ->where('appointments.status', 'Thành công') // 🔥 Thêm điều kiện status
            ->join('services', 'appointments.service_id', '=', 'services.id')
            ->sum('services.price');

        return response()->json(['total' => $income]);
    }


    public function filterIncome(Request $request, $id)
    {
        $query = Appointment::where('appointments.business_id', $id)
            ->where('appointments.status', 'Thành công') // 🔥 Thêm điều kiện status
            ->join('services', 'appointments.service_id', '=', 'services.id');

        // 🔥 Filter theo ngày
        if ($request->date) {
            $query->whereDate('appointments.date', $request->date);
        }

        // 🔥 Filter theo tháng năm
        if ($request->month && $request->year) {
            $query->whereMonth('appointments.date', $request->month)
                ->whereYear('appointments.date', $request->year);
        }

        // 🔥 Filter theo khoảng thời gian
        if ($request->start_date && $request->end_date) {
            $query->whereBetween('appointments.date', [$request->start_date, $request->end_date]);
        }

        $appointments = $query->select(
            'appointments.*',
            'services.price as service_price'
        )->with(['user', 'service'])->get();

        $total = $appointments->sum('service_price');

        return response()->json([
            'total' => $total,
            'appointments' => $appointments
        ]);
    }


    public function confirm($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'Đã xác nhận';
        $appointment->save();

        return response()->json(['message' => 'Appointment confirmed successfully.']);
    }

    public function cancel($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'Đã huỷ';
        $appointment->save();

        return response()->json(['message' => 'Appointment cancelled successfully.']);
    }

    public function complete($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->status = 'Thành công';
        $appointment->save();

        return response()->json(['message' => 'Appointment completed successfully.']);
    }

    public function latestServices($businessId)
    {
        $services = Service::where('business_id', $businessId)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        return response()->json(['services' => $services]);
    }

    public function setupStatus($id)
    {
        $hasServices = Service::where('business_id', $id)->exists();
        $hasStaff = Staff::where('business_id', $id)->exists();
        $linkedService = ServiceStaff::where('business_id', $id)->exists();

        return response()->json([
            'hasServices' => $hasServices,
            'hasStaff' => $hasStaff,
            'hasLink' => $linkedService,
            'ready' => $hasServices && $hasStaff && $linkedService,
        ]);
    }

    public function createStaffs(Request $request)
    {
        $validated = $request->validate([
            'business_id' => 'required|exists:businesses,id',
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:255',
            'password' => 'required|string|min:6',
            'service_id' => 'nullable|exists:services,id',
        ]);
    
        // 🔹 Tạo tài khoản user cho nhân viên
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => 'staff', // nếu có phân quyền
        ]);
    
        // 🔹 Tạo nhân viên gắn với business
        $staff = Staff::create([
            'business_id' => $validated['business_id'],
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
        ]);
    
        // 🔹 Gán dịch vụ nếu có
        if (!empty($validated['service_id'])) {
            ServiceStaff::create([
                'business_id' => $validated['business_id'],
                'staff_id' => $staff->id,
                'service_id' => $validated['service_id'],
            ]);
        }
    
        return response()->json([
            'message' => 'Tạo nhân viên thành công',
            'staff' => $staff,
            'user' => $user,
        ], 201);
    }

    public function updateStaff(Request $request, Business $business, Staff $staff)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'service_id' => 'nullable|exists:services,id',
        ]);

        // Cập nhật thông tin nhân viên
        $staff->update([
            'name' => $validated['name'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'] ?? null,
        ]);

        // Nếu có chọn dịch vụ → cập nhật phân công (nếu bé muốn logic riêng thì có thể xử lý thêm)
        if (!empty($validated['service_id'])) {
            // Gán lại dịch vụ (nếu bé dùng ServiceStaff table)
            \App\Models\ServiceStaff::updateOrCreate(
                [
                    'staff_id' => $staff->id,
                    'business_id' => $business->id,
                ],
                [
                    'service_id' => $validated['service_id'],
                ]
            );
        }

        return response()->json(['message' => 'Cập nhật nhân viên thành công']);
    }

    public function destroyStaff(Business $business, Staff $staff)
    {
        // Optional: kiểm tra staff này có thuộc business không
        if ($staff->business_id !== $business->id) {
            return response()->json(['message' => 'Nhân viên không thuộc cơ sở này'], 403);
        }

        // Xoá phân công dịch vụ nếu có
        \App\Models\ServiceStaff::where('staff_id', $staff->id)->delete();

        // Xoá nhân viên
        $staff->delete();

        return response()->json(['message' => 'Đã xoá nhân viên']);
    }

    public function getAssignments($businessId)
{
    $data = DB::table('appointments')
        ->leftJoin('staff', 'appointments.staff_id', '=', 'staff.id')
        ->leftJoin('services', 'appointments.service_id', '=', 'services.id')
        ->leftJoin('users', 'appointments.user_id', '=', 'users.id')
        ->where('appointments.business_id', $businessId)
        ->select(
            'appointments.id',
            'appointments.date',
            'appointments.time_start',
            'staff.name as staff_name',
            'services.name as service_name',
            'users.name as user_name',
            'users.phone as user_phone'
        )
        ->orderByDesc('appointments.date')
        ->get();

    return response()->json($data);
}

public function updateAssignments(Request $request, Appointment $appointment)
{
    $validated = $request->validate([
        'date' => 'required|date',
        'time_start' => 'required',
        'staff_id' => 'required|exists:staff,id',
        'service_id' => 'required|exists:services,id',
    ]);

    $appointment->update($validated);

    return response()->json(['message' => 'Cập nhật lịch hẹn thành công']);
}

public function destroyAssignments(Appointment $appointment)
{
    $appointment->delete();
    return response()->json(['message' => 'Đã xoá lịch hẹn']);
}

}
