<?php

namespace App\Http\Controllers;

use App\Models\Business;

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
}