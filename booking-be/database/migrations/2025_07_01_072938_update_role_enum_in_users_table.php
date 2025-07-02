<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateRoleEnumInUsersTable extends Migration
{
    public function up()
    {
        DB::statement("ALTER TABLE users MODIFY role ENUM('customer', 'admin', 'staff', 'business') DEFAULT 'customer'");
    }

    public function down()
    {
        DB::statement("ALTER TABLE users MODIFY role ENUM('customer', 'admin', 'staff') DEFAULT 'customer'");
    }
}
