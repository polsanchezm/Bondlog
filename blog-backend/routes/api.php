<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

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



Route::prefix('app')->name('app.')->group(function () {
    Route::get('/', function () {
        return response()->json([
            'message' => 'Welcome to the Blog API',
            'status' => 'Connected',
        ]);
    });
    Route::prefix('auth')->name('auth.')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum')->name('logout');
    });

    Route::prefix('user')->name('user.')->group(function () {
        Route::get('/', [UserController::class, 'index'])->middleware('auth:sanctum')->name('users');
        Route::get('/account', [UserController::class, 'show'])->middleware('auth:sanctum')->name('account');
        Route::put('/edit', [UserController::class, 'update'])->middleware('auth:sanctum')->name('edit');
        Route::delete('/delete', [UserController::class, 'destroy'])->middleware('auth:sanctum')->name('delete');
    });

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/', [PostsController::class, 'index'])->name('index')->name('posts');
        Route::post('create/', [PostsController::class, 'store'])->name('store')->middleware('auth:sanctum')->name('create');
        Route::get('detail/{id}', [PostsController::class, 'show'])->name('show')->name('detail');
        Route::put('update/{id}', [PostsController::class, 'update'])->name('update')->middleware('auth:sanctum')->name('edit');
        Route::delete('delete/{id}', [PostsController::class, 'destroy'])->name('destroy')->middleware('auth:sanctum')->name('delete');
    });
});
