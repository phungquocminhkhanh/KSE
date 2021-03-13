<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use App\Events\sendMessage;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Redirect;
use App\NhanVien;
use GuzzleHttp\Middleware;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//form

//real-time
//$i=1;
Route::get('/chart-mobile-ks',function() {
    return view('customer.chart_mobile_ks');
});
Route::get('/chart-mobile-ks-demo',function() {
    return view('customer.chart_mobile_ks_demo');
});
Route::get('/chart-tam',function() {
    return view('customer.chart_tam2');
});
Route::get('/chart2',function() {
    return view('admin.chart2');
});
Route::get('/dashboard_chart',function() {
    return view('admin.dashboard_chart');
});

Route::get('/',function() {
    return view('customer.cus_login');
});

Route::group(['prefix' => 'customer'], function () {
    Route::post('cus-login','loginController@cus_login');
    Route::get('cus-logout','loginController@cus_logout');

    Route::get('/chart',function() {
        return view('admin.chart');
    });
});





Route::get('/admin', function () {
    $check=isset(Auth::user()->id)?Auth::user()->id:"";
    if($check)
    {
        return Redirect('/dashboard');
    }
    return view('admin.login');
});
Route::get('/clear-cache', function() {
    $exitCode = Artisan::call('config:clear');
    $exitCode = Artisan::call('cache:clear');
    $exitCode = Artisan::call('config:cache');
    return 'DONE'; //tra ve gia tri
});
Route::get('/dashboard', function () {
    //$check=isset(Auth::user()->id)?Auth::user()->id:"";
    if(true)
    {
        $id=Session::get('account_id');
        $r=DB::table('tbl_account_authorize')
        ->join('tbl_account_permission','tbl_account_permission.id','=','tbl_account_authorize.grant_permission')
        ->select('tbl_account_permission.permission')
        ->where('tbl_account_authorize.id_admin',$id)
        ->get();
        $type=DB::table('tbl_account_type')
        ->join('tbl_account_account','tbl_account_account.id_type','=','tbl_account_type.id')
        ->where('tbl_account_account.id',$id)
        ->get();
        return view('admin.dashboard')->with("permission",$r)->with("type",$type);
    }
    return view('admin.login');
});

Route::group(['prefix' => 'page'], function () {
    Route::post('login', 'loginController@login');
    Route::get('logout', 'loginController@logout');
    Route::post('send-otp', 'loginController@send_otp');
});

Route::group(['prefix' => 'admin'], function () {

    Route::get('manage-account',function () {
        // $response = Http::get('http://192.168.100.11/QTC_banhangnhanh/git/KSE/public/admin/floor');
        // $a=$response->getBody();
        // $b=json_decode($a);
        // return view('admin.text')->with('text',$b);

        return view('admin.account');
    });


    Route::get('manage-permission-type',function () {

        return view('admin.account_permission_type');
    });

    Route::get('manage-admin-deal',function () {
        return view('admin.admin_deal');
    });

    Route::get('manage-help-deposit',function () { // yêu cầu nạp tiền
        return view('admin.admin_request_deposit');
    });
    Route::get('manage-admin-request-deal',function () { // yêu cầu

        return view('admin.admin_request_deal');
    });

    Route::get('manage-admin-customer',function () {

        return view('admin.admin_customer');
    });




    Route::get('manage-sale-customer',function () {

        return view('admin.sale_customer');
    });




    Route::get('manage-help-deal',function () {
        return view('admin.help_deal');
    });
    Route::get('manage-help-chat',function () {
        return view('admin.help_chat');
    });




    Route::get('list-account-type', 'admin_board\viewController@list_account_type');
    Route::get('list-permission', 'admin_board\viewController@list_permission');

    Route::post('get-permission', 'admin_board\viewController@permission_get');
    Route::post('get-type', 'admin_board\viewController@type_get');

    Route::put('permission', 'admin_board\viewController@permission_update');
    Route::put('account-type', 'admin_board\viewController@account_type_update');

    Route::put('force-sign-out', 'admin_board\account_accountController@force_sign_out');

    Route::resource('account-account', 'admin_board\account_accountController');
    Route::post('list-manager', 'admin_board\account_accountController@list_manage');
    Route::post('account-account-permission', 'admin_board\account_accountController@account_permission');
    Route::post('account-account-detail', 'admin_board\account_accountController@account_detail');
    Route::post('account-account-disable', 'admin_board\account_accountController@account_disable');
    Route::post('account-account-change-password', 'admin_board\account_accountController@account_change_password');
    Route::post('account-account-change-password-dashboard', 'admin_board\account_accountController@account_change_password_dashboard');
    Route::post('account-account-get-permission', 'admin_board\account_accountController@get_permission');



    Route::resource('customer-customer', 'admin_board\customer_customerController');
    Route::post('get-customer-customer', 'admin_board\customer_customerController@get_customer');
    Route::post('customer-customer-order', 'admin_board\customer_customerController@customer_order');
    Route::post('customer-seach', 'admin_board\customer_customerController@customer_seach');

    Route::resource('customer-point', 'admin_board\customer_pointController');
    Route::post('customer-point-customer', 'admin_board\customer_pointController@point_customer');//ds customer theo point


    Route::get('floor', function(){
        $type=DB::table('tbl_account_permission')->get();
        return response()->json($type);
    });
});

