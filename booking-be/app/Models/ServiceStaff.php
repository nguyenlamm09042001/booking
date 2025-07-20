<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceStaff extends Model
{
    protected $table = 'service_staff';

    public $timestamps = true; // <-- Laravel sẽ tự insert created_at và updated_at

    protected $fillable = [
        'business_id',
        'service_id',
        'staff_id',
    ];

    // Quan hệ
    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }
}
