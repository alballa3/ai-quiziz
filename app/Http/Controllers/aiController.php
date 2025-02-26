<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class aiController extends Controller
{
    //

    public function generateQuestion(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        $client = \ArdaGnsrn\Ollama\Ollama::client();
        $response = $client->completions()->create([
            'model' => "exam",
            'prompt' => "Generate a question  title:" . $data["title"] . " description: " . $data["description"] . "The Number Of questions is one",
        ]);
        return response()->json(json_decode($response->response, true));
    }

    public function generatePage()
    {
        return Inertia::render('quiz/generate');
    }
    public function generateExam(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'number_of_questions' => 'required|integer',
        ]);


        $client = \ArdaGnsrn\Ollama\Ollama::client();
        $response = $client->completions()->create([
            'model' => "exam",
            'prompt' => "Generate a question  title:" . $data["title"] . " description: " . $data["description"] . "The amount of questions are:" . $data['number_of_questions'] . "The question type is multiple-choice" ,
        ]);
        return response()->json(json_decode($response->response, true));
    }
}
