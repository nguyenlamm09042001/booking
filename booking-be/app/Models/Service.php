<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Business;
use App\Models\Appointment;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'business_id', 'price', 'duration', 'status', 'type', 'description', 'image'];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
