<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->text('feedback')->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->text('system_feedback')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn('feedback');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('system_feedback');
        });
    }
};
