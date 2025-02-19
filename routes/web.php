<?php

use App\Http\Controllers\aiController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ProfileController;
use App\Models\exam;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/test',function(){
    return csrf_token   ();
});

Route::controller(ExamController::class)->group(function () {
    Route::post('/dashboard/create', "create")->middleware(['auth', 'verified']);
    Route::get('/dashboard/create',"index")->middleware(['auth', 'verified'])->name('make');
    Route::get('/exam/{id}', "show");
    Route::delete('/exam/{id}', "destroy")->middleware(['auth', 'verified']);
    Route::get('/dashboard', "main")->middleware(['auth', 'verified'])->name('dashboard');
});


Route::controller(aiController::class)->group(function () {
    Route::get('/ai/generate', "generateQuestion")->name('ai.question');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, "updateAIModel"]);
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
