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
        $users = User::all();
        return response()->json($users);
    }

    public function getservices()
    {
        $services = Service::all();
        return response()->json($services);
    }
}
