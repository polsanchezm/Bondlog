<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username'     => 'Admin Pol',
            'email'    => 'pol@bondlog.com',
            'role'     => 'admin',
            'password' => bcrypt('1qazZAQ!'),
        ]);

        User::create([
            'username'     => 'Admin Sergio',
            'email'    => 'sergio@bondlog.com',
            'role'     => 'admin',
            'password' => bcrypt('1qazZAQ!'),
        ]);
    }
}
