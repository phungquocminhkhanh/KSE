<?php

namespace App\Http\Controllers\admin_board;

use Illuminate\Support\Facades\DB;
use App\account_permission;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\account_type;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
class viewController extends Controller
{
    public function login()
    {
        $response = Http::post('http://192.168.100.29/trading_view/api/', [
            'detect' => 'login',
            'username' => 'player',
            'password' => '123456',
        ]);
       return $response->getBody();
    }
    public function me()
    {
       $response = Http::withHeaders([
        'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6MjAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTYxNDMyNTc4MCwiZXhwIjoxNjE0MzI1OTAwLCJuYmYiOjE2MTQzMjU3ODAsImp0aSI6IlFkNUEwcm9Wb3VRTWwxelMiLCJzdWIiOjEsInBydiI6ImZiMGY0NmYyMDA2NDUwMmNkYmMzOGNhOWQ5YWZmYmExOWYyM2M5M2QifQ.5iefjtzc4A-HXkswQBA_dFVhCJ0fhvCxMYG1IPRiNCc',
        ])->post('http://127.0.0.1:2000/api/auth/me');
       return $response->getBody();

    }






    public function list_account_type()
    {
        return response()->json(account_type::where('id_business',Auth::user()->id_business)->get());
    }
    public function list_permission()
    {
        return response()->json(account_permission::get());
    }
    public function permission_get(Request $request)
    {
        return response()->json(account_permission::where('id',$request->id_per)->get());
    }
    public function type_get(Request $request)
    {
        return response()->json(account_type::where('id',$request->id_type)->get());
    }
    // public function permission_update(Request $request)
    // {

    //     try
    //     {
    //             $floor= account_permission::where('id',$request->id_per)
    //             ->update(["description"=>$request->description]);
    //             return response()->json([
    //                 'status'=>200,
    //                  'message'=>'Cập nhật thành công',
    //             ]);
    //     }
    //     catch(Exception $e)
    //     {
    //         return response()->json([
    //             'status'=>200,
    //              'message'=>'Cập nhật thất bại',
    //         ]);
    //     }
    // }
    // public function account_type_update(Request $request)
    // {
    //     try
    //     {
    //             $type= account_type::where('id',$request->id_type)
    //             ->update(["description"=>$request->description]);
    //             return response()->json([
    //                 'status'=>200,
    //                  'message'=>'Cập nhật thành công',
    //             ]);
    //     }
    //     catch(Exception $e)
    //     {
    //         return response()->json([
    //             'status'=>200,
    //              'message'=>'Cập nhật thất bại',
    //         ]);
    //     }
    // }
}
