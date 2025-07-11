<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedbacks'; // thêm dòng này nếu cần rõ

    protected $fillable = ['business_id', 'user_id', 'comment', 'rating', 'type', 'created_at', 'updated_at'];

    public function business()
    {
        return $this->belongsTo(Business::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
