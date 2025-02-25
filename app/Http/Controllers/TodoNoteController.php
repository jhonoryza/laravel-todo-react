<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Type;
use App\Http\Requests\StoreTodoNoteRequest;
use App\Http\Requests\UpdateTodoNoteRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TodoNoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Todo::class);
        $data = Todo::query()
            ->where('user_id', Auth::user()->id)
            ->where('type', Type::NOTES)
            ->orderBy('status', 'desc')
            ->orderBy('id', 'asc')
            ->simplePaginate(5)
            ->withQueryString();

        return inertia()
            ->render('todos/note', [
                'todos' => inertia()->always(fn() => $data),
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoNoteRequest $request)
    {
        Gate::authorize('create', Todo::class);
        $data = array_merge($request->validated(), [
            'user_id' => Auth::user()->id,
            'status' => Status::TODO,
            'type' => Type::NOTES,
        ]);
        Todo::query()
            ->create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todonote)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todonote)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoNoteRequest $request, Todo $todonote)
    {
        Gate::authorize('update', $todonote);
        $todonote->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todonote)
    {
        Gate::authorize('delete', $todonote);
        $todonote->delete();
    }
}
