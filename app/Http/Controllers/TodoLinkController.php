<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Enums\Type;
use App\Http\Requests\StoreTodoLinkRequest;
use App\Http\Requests\UpdateTodoLinkRequest;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class TodoLinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('viewAny', Todo::class);

        $page = $request->page ?? 1;
        $perPage = $request->size ?? 10;

        $data = Todo::query()
            ->where('user_id', Auth::user()->id)
            ->where('type', Type::LINK)
            ->orderBy('status', 'desc')
            ->orderBy('id', 'asc')
            ->paginate(page: $page, perPage: $perPage)
            ->withQueryString();

        return inertia()
            ->render('links/page', [
                'todos' => inertia()->always(fn() => $data->items()),
                'pagination' => [
                    'baseurl' => 'todolinks',
                    'total' => $data->total(),
                    'per_page' => $data->perPage(),
                    'current_page' => $data->currentPage(),
                    'last_page' => $data->lastPage(),
                ],
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
    public function store(StoreTodoLinkRequest $request)
    {
        Gate::authorize('create', Todo::class);
        $data = array_merge($request->validated(), [
            'user_id' => Auth::user()->id,
            'status' => Status::TODO,
        ]);
        Todo::query()
            ->create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todolink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todolink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodoLinkRequest $request, Todo $todolink)
    {
        Gate::authorize('update', $todolink);
        $todolink->update($request->validated());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todolink)
    {
        Gate::authorize('delete', $todolink);
        $todolink->delete();
    }
}
