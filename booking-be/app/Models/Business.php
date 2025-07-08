<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Appointment;

class Business extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'phone', 'location', 'image', 'type'];

    protected $hidden = ['password'];
    public function services()
    {
        return $this->hasMany(Service::class);
    }
    
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    
    public function staff()
    {
        return $this->hasMany(Staff::class);
    }   
    
    public function users()
    {
        return $this->hasMany(User::class);
    }
    

}