<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE businesses MODIFY status ENUM('Đang chờ duyệt', 'Đang hoạt động', 'Đã tạm ngừng') DEFAULT 'Đang chờ duyệt'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE businesses MODIFY status VARCHAR(255) DEFAULT 'active'");
    }
};

