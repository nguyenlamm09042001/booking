<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:user,business', // validate role
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role, 
        ]);
    
        return response()->json(['message' => 'Đăng ký thành công!'], 201);
    }
    

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Thông tin đăng nhập không chính xác'], 401);
        }
    
        $user = Auth::user(); 
    
        // Lấy business_id nếu user là business owner
        $business = $user->businesses->first();
        $business_id = $business ? $business->id : null;
    
        return response()->json([
            'message' => 'Đăng nhập thành công',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'business_id' => $business_id,
            ]
        ]);
    }
    
    

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Đăng xuất thành công']);
    }

    public function user(Request $request)
    {
        $user = User::find($request->user()->id);
        $business = $user->businesses()->first();
    
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'business_id' => $business?->id,
        ]);
    }
    
}
