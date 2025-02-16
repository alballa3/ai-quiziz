<?php

namespace App\Http\Controllers;

use App\Models\exam;
use App\Http\Requests\StoreexamRequest;
use App\Http\Requests\UpdateexamRequest;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('quiz/create');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(HttpRequest $request)
    {
        $exam = Exam::create(
            [
                'user_id' => Auth::user()->id,
                "name" =>  $request->title,
                "description" =>  $request->description,
                'questions' => $request->questions
            ]
        );
        return $exam;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreexamRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(exam $exam)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateexamRequest $request, exam $exam)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(exam $exam)
    {
        //
    }
}
