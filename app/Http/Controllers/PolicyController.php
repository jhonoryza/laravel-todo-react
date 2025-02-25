<?php

namespace App\Http\Controllers;

class PolicyController extends Controller
{
    public function privacy()
    {
        return inertia()->render('Policy/Privacy');
    }

    public function terms()
    {
        return inertia()->render('Policy/Terms');
    }
}
