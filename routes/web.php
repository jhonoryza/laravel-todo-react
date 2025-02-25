<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\TodoLinkController;
use App\Http\Controllers\TodoNoteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('todolinks', TodoLinkController::class);
    Route::resource('todonotes', TodoNoteController::class);
});
Route::get('/policy', [PolicyController::class, 'privacy'])->name('policy');
Route::get('/tos', [PolicyController::class, 'terms'])->name('tos');
