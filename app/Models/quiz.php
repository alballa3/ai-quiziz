<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class quiz extends Model
{
    /** @use HasFactory<\Database\Factories\QuizFactory> */
    use HasFactory;
    protected $fillable = [
        "question","options"
    ];
    protected $casts = [
        "options"=> "array"
    ];
    public function exam(){
        return $this->belongsTo(Exam::class);
    }
}
