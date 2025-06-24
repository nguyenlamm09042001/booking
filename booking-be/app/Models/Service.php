<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Business;

class Service extends Model
{
    protected $fillable = [
        'business_id', 'name', 'description', 'price', 'duration', 'image'
    ];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }
}
