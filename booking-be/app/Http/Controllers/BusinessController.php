<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\Appointment;

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
}