<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class aiController extends Controller
{
    //

    public function generateQuestion( Request $request){
        $request->validate([
            'title' =>'required|string',
            'description' =>'required|string',
        ]);

        // $client=\ArdaGnsrn\Ollama\Ollama::client();
        // $response=$client->completions()->create([
        //     'model'=>"exam",
        //     'prompt'=>"Generate a question  for the following and main idea is about " . $request->title ." and the Hint Help you is " . $request->description,
        // ]);
        return response()->json("AFS") ;
    }
    public function generatePage(){
        return Inertia::render('quiz/generate');
    }
}
