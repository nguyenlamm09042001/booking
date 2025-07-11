<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Bước 1: Thêm 'user' vào ENUM (giữ 'customer' tạm)
        DB::statement("ALTER TABLE users MODIFY role ENUM('user', 'customer', 'admin', 'staff', 'business') DEFAULT 'user'");

        // Bước 2: Update toàn bộ giá trị 'customer' thành 'user'
        DB::statement("UPDATE users SET role = 'user' WHERE role = 'customer'");

        // Bước 3: Xoá 'customer' khỏi ENUM
        DB::statement("ALTER TABLE users MODIFY role ENUM('user', 'admin', 'staff', 'business') DEFAULT 'user'");
    }

    public function down(): void
    {
        // Rollback: thêm lại 'customer' vào ENUM
        DB::statement("ALTER TABLE users MODIFY role ENUM('user', 'customer', 'admin', 'staff', 'business') DEFAULT 'customer'");

        // Rollback: đổi lại 'user' thành 'customer' nếu cần
        DB::statement("UPDATE users SET role = 'customer' WHERE role = 'user'");
    }
};

