<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'business_id', 'user_id', 'service_id', 'staff_id',
        'date', 'time_start', 'status', 'notes'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
    public function staff()
    {
        return $this->belongsTo(User::class, 'staff_id');
    }
}
