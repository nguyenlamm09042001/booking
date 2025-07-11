<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Xoá cột 'type' khỏi businesses
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn('type');
        });

        // Thêm cột 'type' vào services
        Schema::table('services', function (Blueprint $table) {
            $table->string('type')->nullable(); // hoặc ENUM nếu bé muốn giới hạn
        });
    }

    public function down(): void
    {
        // Thêm lại 'type' vào businesses
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('type')->nullable();
        });

        // Xoá 'type' khỏi services
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
};
