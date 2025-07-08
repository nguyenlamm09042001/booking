<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        // ✅ Thêm 'business' vào enum mới
        DB::statement("UPDATE users SET role = 'customer' WHERE role NOT IN ('customer', 'admin', 'staff', 'business')");

        DB::statement("ALTER TABLE users MODIFY role ENUM('customer', 'admin', 'staff', 'business') DEFAULT 'customer'");
    }

    public function down(): void
    {
        // Revert về enum cũ
        DB::statement("UPDATE users SET role = 'customer' WHERE role NOT IN ('customer', 'admin', 'staff')");

        DB::statement("ALTER TABLE users MODIFY role ENUM('customer', 'admin', 'staff') DEFAULT 'customer'");
    }
};
