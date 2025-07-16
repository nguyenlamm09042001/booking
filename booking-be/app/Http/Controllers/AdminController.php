<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\User;
use App\Models\Business;

class AdminController extends Controller
{
    public function appointments()
    {
        $appointments = Appointment::with(['user', 'service', 'staff'])->get();
        return response()->json($appointments);
    }

    public function getBusinesses()
    {
        $businesses = Business::with(['services', 'user:id,name,email'])->get();

        return response()->json($businesses);
    }


    public function getusers()
    {
        $users = User::where('role', 'user')
            ->select('id', 'name', 'email', 'phone', 'status', 'role')
            ->get();
        return response()->json($users);
    }

    public function getservices()
    {
        $services = Service::all();
        return response()->json($services);
    }

    public function approveBusiness($id)
    {
        $business = Business::findOrFail($id);
        $business->status = 'Đang hoạt động';
        $business->save();
        return response()->json(['message' => 'Đã duyệt doanh nghiệp.']);
    }

    public function pauseBusiness($id)
    {
        $business = Business::findOrFail($id);
        $business->status = 'Đã tạm ngừng';
        $business->save();
        return response()->json(['message' => 'Đã tạm ngừng doanh nghiệp.']);
    }

    public function resumeBusiness($id)
    {
        $business = Business::findOrFail($id);
        $business->status = 'Đang hoạt động';
        $business->save();
        return response()->json(['message' => 'Đã mở lại doanh nghiệp.']);
    }

    public function deleteBusiness($id)
    {
        $business = Business::findOrFail($id);
        $business->delete();
        return response()->json(['message' => 'Đã xoá doanh nghiệp.']);
    }

    public function showBusiness($id)
    {
        $business = Business::with('user', 'services')->findOrFail($id);
        return response()->json($business);
    }

    public function updateStatus($id, Request $request)
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $user = User::findOrFail($id);
        $user->status = $request->status;
        $user->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công.',
            'status' => $user->status,
        ]);
    }
}
