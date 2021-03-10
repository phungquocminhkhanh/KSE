<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\account_acount;
use App\business_store;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
session_start();

class loginController extends Controller
{
    public function login(Request $request)
    {
        $response = Http::post('http://192.168.100.10/kse_trade/api/',[
            'detect' => 'login',
            'username' => $request->account_username,
            'password' => $request->account_password
        ]);
         $a=$response->getBody();

        $b=json_decode($a);
            if($b->success=="true")
            {
                    Session::put("data_admin",$b->data[0]);
                    return Redirect("/dashboard");
            }
            else
            {
                Session::put("mess","Username hoặc password hoặc mã cửa hàng không đúng");
                return Redirect("/admin");
            }
    }
    public function logout()
    {
        return Redirect("/admin");

    }
    public function send_otp(Request $request)
    {

        //$arrEmail = ['khanh01636819000@gmail.com'];
        try
        {
            $data = ['mail'=>'khanh01636819000@gmail.com','otp' => '45465'];
            Mail::send(function($message){
                 $message->from('khanh.phungquocminh@gmail.com', 'QTC infomatic')->subject('Visitor Feedback!');
                 $message->to('khanh01636819000@gmail.com')->subject('MÃ XÁC NHẬN OTP');
           });
           return response()->json([
               'status'=>200
           ]);
        }
        catch(Exception $e)
        {
            return response()->json([
                'err'=>$e
            ]);
        }

    }
    public function cus_login(Request $request)
    {

        $response = Http::post(env('URL_API', 'http://192.168.100.10/kse_trade/api/'), [
            'detect' => 'login',
            'username' => $request->account_username,
            'password' => $request->account_password
        ]);
        $a=$response->getBody();
        $b=json_decode($a);
        if($b->success=="true")
        {
            Session::put("data_customer",$b->data[0]);
            return Redirect("/customer/chart");
        }
        else
        {
            return Redirect("/");
        }
    }
    public function cus_logout(Request $request)
    {

        // $response = Http::post(env('URL_API', 'http://192.168.100.10/kse_trade/api/'), [
        //     'detect' => 'login',
        //     'username' => $request->account_username,
        //     'password' => $request->account_password
        // ]);
        // $a=$response->getBody();
        // $b=json_decode($a);
        // if($b->success=="true")
        // {
        //     Session::put("data_customer",$b->data[0]);
        //     return Redirect("/customer/chart");
        // }
        // else
        // {
        //     return Redirect("/");
        // }


    }



}
