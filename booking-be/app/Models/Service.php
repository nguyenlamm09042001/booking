<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Business;

class Service extends Model
{
    protected $fillable = ['name', 'business_id', 'price', 'duration', 'status'];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
    
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
    
}
