<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Type;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $todoLinks = Todo::query()
            ->where('status', Status::TODO)
            ->where('type', Type::LINK)
            ->count();
        $todoNotes = Todo::query()
            ->where('status', Status::TODO)
            ->where('type', Type::NOTES)
            ->count();
        return Inertia::render('dashboard', [
            'todoLinks' => $todoLinks,
            'todoNotes' => $todoNotes,
        ]);
    }
}
