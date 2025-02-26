<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class result extends Model
{
    /** @use HasFactory<\Database\Factories\ResultFactory> */
    use HasFactory;
    protected $fillable = [
        "exam_id",
        "score",
        "name",
        "answers"
    ];
    protected $casts = [
        "answers" => "array"
    ];
}
