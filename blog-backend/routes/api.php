<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
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
    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('user')->name('user.')->group(function () {
            Route::get('/', [UserController::class, 'index'])->name('index');
            Route::get('/account', [UserController::class, 'show'])->name('account');
            Route::put('/edit', [UserController::class, 'update'])->name('edit');
            Route::delete('/delete', [UserController::class, 'destroy'])->name('delete');
        });

        Route::prefix('posts')->name('posts.')->group(function () {
            Route::post('create', [PostsController::class, 'store'])->name('store');
            Route::put('update/{id}', [PostsController::class, 'update'])->name('update');
            Route::delete('delete/{id}', [PostsController::class, 'destroy'])->name('destroy');
            Route::patch('pin/{id}', [PostsController::class, 'togglePin'])->name('pin');

            Route::prefix('comment')->name('comment.')->group(function () {
                Route::post('create/{post_id}', [CommentController::class, 'store'])->name('store');
                Route::put('update/{id}', [CommentController::class, 'update'])->name('update');
                Route::delete('delete/{id}', [CommentController::class, 'destroy'])->name('destroy');
                Route::patch('pin/{id}', [CommentController::class, 'togglePin'])->name('pin');
            });
        });
    });

    Route::prefix('posts')->name('posts.')->group(function () {
        Route::get('/', [PostsController::class, 'index'])->name('index');
        Route::get('detail/{id}', [PostsController::class, 'show'])->name('show');

        Route::prefix('comment')->name('comment.')->group(function () {
            Route::get('/{post_id}', [CommentController::class, 'index'])->name('index');
            Route::get('detail/{id}', [CommentController::class, 'show'])->name('show');
        });
    });
});
