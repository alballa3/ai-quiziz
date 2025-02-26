<?php

use App\Http\Controllers\aiController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResultController;
use App\Http\Middleware\ownMiddleware;
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
Route::get('/test', function () {
    return csrf_token();
});

Route::controller(ExamController::class)->group(function () {
    Route::post('/dashboard/create', "create")->middleware(['auth', 'verified']);
    Route::get('/dashboard/create', "index")->middleware(['auth', 'verified'])->name('make');
    Route::get('/exam/{id}', "show");
    Route::get('/exam/{id}/edit', "editPage")->middleware(['auth', 'verified', ownMiddleware::class]);
    Route::put('/exam/{id}', "edit")->middleware(['auth', 'verified', ownMiddleware::class]);
    Route::delete('/exam/{id}', "destroy")->middleware(['auth', 'verified', ownMiddleware::class]);
    Route::get('/exam/{id}/result',[ResultController::class, "showResult"])->middleware(['auth', 'verified', ownMiddleware::class]);
    Route::post('exam/{id}',[ResultController::class, "storeResult"])->middleware(['auth', 'verified', ownMiddleware::class]);
    Route::get('/dashboard', "main")->middleware(['auth', 'verified'])->name('dashboard');
});


Route::controller(aiController::class)->group(function () {
    Route::post('/ai/generate','generateExam');
    Route::get('/ai/generate', "generatePage")->name('ai.exam');
    Route::post('/ai/generate/question', "generateQuestion")->name('ai.question')
    ->middleware(['auth', 'verified']);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, "updateAIModel"]);
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
