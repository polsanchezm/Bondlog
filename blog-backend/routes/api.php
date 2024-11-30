<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('auth')->name('auth.')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

Route::prefix('posts')->name('posts.')->group(function () {
    Route::get('/', [PostsController::class, 'index'])->name('index');
    Route::post('create/', [PostsController::class, 'store'])->name('store');
    Route::get('detail/{id}', [PostsController::class, 'show'])->name('show');
    Route::put('update/{id}', [PostsController::class, 'update'])->name('update');
    Route::delete('delete/{id}', [PostsController::class, 'destroy'])->name('destroy');
});
