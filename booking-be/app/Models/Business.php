<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
use App\Models\Appointment;
use App\Models\Staff;
use App\Models\User;

class Business extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'email', 'password', 'phone', 'location', 'image', 'type'];

    protected $hidden = ['password'];

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function staffs()
    {
        return $this->hasMany(Staff::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function feedbacks()
    {
        return $this->hasMany(Feedback::class);
    }
}
