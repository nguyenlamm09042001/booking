<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('businesses', function (Blueprint $table) {
            // Xóa email, password nếu chắc chắn không còn sử dụng
            if (Schema::hasColumn('businesses', 'email')) {
                $table->dropColumn('email');
            }
            if (Schema::hasColumn('businesses', 'password')) {
                $table->dropColumn('password');
            }

            // Thêm user_id
            $table->unsignedBigInteger('user_id')->after('id');

            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');

            // Nếu rollback, thêm lại email/password
            $table->string('email')->unique();
            $table->string('password');
        });
    }
};

