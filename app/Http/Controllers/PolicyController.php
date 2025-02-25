<?php

namespace App\Http\Controllers;

class PolicyController extends Controller
{
    public function privacy()
    {
        return inertia()->render('policy/privacy');
    }

    public function terms()
    {
        return inertia()->render('policy/terms');
    }
}
