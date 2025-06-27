<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\User;

class AdminController extends Controller
{
    public function appointments()
    {
        $appointments = Appointment::with(['user', 'service', 'staff'])->get();
    
        return response()->json($appointments);
    }
}
