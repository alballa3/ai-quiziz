<?php

namespace App\Http\Controllers;

use App\Models\exam;
use App\Models\result;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultController extends Controller
{
    //
    public function showResult($id)
    {
        $result = result::where("exam_id", $id)->get();
        // dd($result);
        return Inertia::render('quiz/result', ['exam' => exam::find($id), 'result' => $result]);
    }
    public function storeResult($id, Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'score' => 'required|integer',
            'answers' => 'required|array'
        ]);
        $data['exam_id'] = $id;
        $result = result::create($data);
        return response()->json($result);
    }
}
