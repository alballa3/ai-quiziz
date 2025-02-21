<?php

namespace App\Http\Middleware;

use App\Models\exam;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ownMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $userId = $request->user()->id;
        if(!$userId){
            return response()->redirectToRoute('login');
        }
        $examId = $request->route('id');
        $exam=exam::query()->where('id',$examId)->where('user_id',$userId)->first();
        if (!$exam) {
            return response()->redirectToRoute('login');
        }
        return $next($request);
    }
}
