<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Business extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password', 'phone', 'location', 'image', 'type'];

    protected $hidden = ['password']; // để không trả password khi return JSON

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}