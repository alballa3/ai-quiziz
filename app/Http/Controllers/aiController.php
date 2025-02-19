<?php

namespace App\Http\Controllers;

use ArdaGnsrn\Ollama\OllamaClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class aiController extends Controller
{
    //

    public function generateQuestion( Request $request){
        // $data=$request->validate([
        //     'title' =>'required|string',
        //     'description' =>'required|string',
        // ]);
        // $client=\ArdaGnsrn\Ollama\Ollama::client();
        // $response=$client->completions()->create([
        //     'model'=>$request->user()->
        // ])
        dd( $request->user());
    }
}
