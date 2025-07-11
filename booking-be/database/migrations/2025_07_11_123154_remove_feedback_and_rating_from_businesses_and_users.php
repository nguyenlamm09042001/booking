<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn('feedback');
            $table->dropColumn('rating');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('system_feedback');
        });
    }

    public function down()
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->text('feedback')->nullable();
            $table->integer('rating')->nullable();
        });

        Schema::table('users', function (Blueprint $table) {
            $table->text('system_feedback')->nullable();
        });
    }
};
