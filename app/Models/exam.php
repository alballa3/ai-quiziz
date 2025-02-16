<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class exam extends Model
{
    /** @use HasFactory<\Database\Factories\ExamFactory> */
    use HasFactory;
    protected $fillable = [
        "name",
        "description",
        "questions"
    ];
    protected $casts = [
        'questions'=>'array'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
