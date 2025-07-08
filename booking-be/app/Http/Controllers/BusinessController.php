<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Appointment;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\DB;

class BusinessController extends Controller
{
    public function index()
    {
        $businesses = Business::all();
        return response()->json($businesses);
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
    
    public function getService(Business $business)
    {
        $services = $business->services()->orderBy('created_at', 'desc')->get();
        return response()->json($services);
    }

    public function creatService(Request $request, Business $business)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'duration'=> 'required|integer|min:1',
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
        $business = Business::findOrFail($id);
        return response()->json($business);
    }
    


}