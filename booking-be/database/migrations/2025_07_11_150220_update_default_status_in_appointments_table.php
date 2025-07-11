<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // ✅ Bước A. Thêm value mới + giữ value cũ tạm thời
        DB::statement("ALTER TABLE appointments MODIFY status ENUM('pending', 'approved', 'cancelled', 'completed', 'Chờ xác nhận', 'Đã xác nhận', 'Đã huỷ', 'Thành công') DEFAULT 'Chờ xác nhận'");

        // ✅ Bước B. Update data từ tiếng Anh sang tiếng Việt
        DB::statement("UPDATE appointments SET status = 'Chờ xác nhận' WHERE status = 'pending'");
        DB::statement("UPDATE appointments SET status = 'Đã xác nhận' WHERE status = 'approved'");
        DB::statement("UPDATE appointments SET status = 'Đã huỷ' WHERE status = 'cancelled'");
        DB::statement("UPDATE appointments SET status = 'Thành công' WHERE status = 'completed'");

        // ✅ Bước C. Xóa value cũ, chỉ giữ tiếng Việt
        DB::statement("ALTER TABLE appointments MODIFY status ENUM('Chờ xác nhận', 'Đã xác nhận', 'Đã huỷ', 'Thành công') DEFAULT 'Chờ xác nhận'");
    }

    public function down(): void
    {
        // 🔙 Revert ENUM về tiếng Anh + update data lại

        // Bước A. Thêm lại value tiếng Anh + giữ value tiếng Việt
        DB::statement("ALTER TABLE appointments MODIFY status ENUM('pending', 'approved', 'cancelled', 'completed', 'Chờ xác nhận', 'Đã xác nhận', 'Đã huỷ', 'Thành công') DEFAULT 'pending'");

        // Bước B. Update data từ tiếng Việt về tiếng Anh
        DB::statement("UPDATE appointments SET status = 'pending' WHERE status = 'Chờ xác nhận'");
        DB::statement("UPDATE appointments SET status = 'approved' WHERE status = 'Đã xác nhận'");
        DB::statement("UPDATE appointments SET status = 'cancelled' WHERE status = 'Đã huỷ'");
        DB::statement("UPDATE appointments SET status = 'completed' WHERE status = 'Thành công'");

        // Bước C. Xóa value tiếng Việt, chỉ giữ tiếng Anh
        DB::statement("ALTER TABLE appointments MODIFY status ENUM('pending', 'approved', 'cancelled', 'completed') DEFAULT 'pending'");
    }
};
