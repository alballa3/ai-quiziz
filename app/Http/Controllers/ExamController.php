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
    public function main()
    {
        $exams = Exam::where('user_id', Auth::user()->id)->get();
        return Inertia::render(
            'Dashboard',
            ["exams" => $exams]
        );
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render(
            'quiz/create',
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(HttpRequest $request)
    {
        // dd($request->all(),Auth::user()->id);
        $exam = Exam::create(
            [
                'user_id' => Auth::user()->id,
                "title" =>  $request->title,
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
    public function show($id)
    {
        $exam = Exam::find($id);
        return Inertia::render('quiz/show', ['exam' => $exam]);
    }

    public function editPage($id){
        $exam = Exam::find($id);
        return Inertia::render('quiz.edit', ['exam' => $exam]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(exam $exam)
    {
        
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
    public function destroy($id)
    {
        $userId = Auth::user()->id;
        $exam = Exam::where('id', $id)->where('user_id', $userId)->first();
        if (!$exam) {
            return redirect()->route('dashboard')->with('error', 'Quiz not found or you don\'t have permission to delete it');
        }


        Exam::destroy($id);
        return redirect()->route('dashboard')->with('success', 'Quiz deleted successfully');
    }
}
