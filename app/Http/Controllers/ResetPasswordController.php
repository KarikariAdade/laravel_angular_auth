<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function sendEmail(Request $request)
    {

        $check_user = User::query()->where('email', $request->get('email'))->first();

        if (!empty($check_user)){

            $check_token = DB::table('password_resets')->where('email', $check_user->email)->first();

            $token = $check_token->token ?? Str::random(60);

            DB::table('password_resets')->insert([
                'email' => $check_user->email,
                'token' => $token,
                'created_at' => Carbon::now()
            ]);

            Mail::to($check_user->email)->send(new ResetPasswordMail($token));

            return $this->successResponse('Email sent. Kindly visit your email to reset password');
        }

        return $this->failResponse('User account does not exist');
    }


    public function resetPassword(Request $request)
    {
        $data = $request->all();

        $validate = Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required|confirmed'
        ]);

        if ($validate->fails()){
            return $this->failResponse($validate->errors()->first());
        }

        $check_token = DB::table('password_resets')
            ->where(['email' => $data['email'], 'token' => $data['resetToken']])
            ->first();

        if (!empty($check_token)){

            $user = User::query()->where('email', $data['email'])->first();

            if (!empty($user)){
                $user->update([
                    'password' => bcrypt($data['password'])
                ]);

                return $this->successResponse('Password reset successful.');
            }

            return $this->failResponse('User account does not exist');
        }

        return $this->failResponse('Invalid token');
    }
}
