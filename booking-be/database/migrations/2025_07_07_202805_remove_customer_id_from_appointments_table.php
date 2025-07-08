<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('appointments', function (Blueprint $table) {
            // Xoá foreign key nếu có
            if (Schema::hasColumn('appointments', 'customer_id')) {
                $table->dropForeign(['customer_id']); // nếu có foreign key
                $table->dropColumn('customer_id');
            }
        });
    }

    public function down()
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }
};

