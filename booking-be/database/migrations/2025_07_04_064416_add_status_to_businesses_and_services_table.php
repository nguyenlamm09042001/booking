<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Thêm cột status cho businesses
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('status')->default('active')->after('name');
        });

        // Thêm cột status cho services
        Schema::table('services', function (Blueprint $table) {
            $table->string('status')->default('active')->after('name');
        });
    }

    public function down(): void
    {
        // Xóa cột status khi rollback
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn('status');
        });

        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
