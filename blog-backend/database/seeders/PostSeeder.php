<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'pol@bondlog.com')->first();

        if (!$user) {
            $this->command->error('No se encontró el usuario Admin. Asegúrate de que UserSeeder se haya ejecutado.');
            return;
        }
        Post::create([
            'title'     => 'Bienvenidos a Bondlog',
            'subtitle'    => 'Un espacio donde comparto mi camino como desarrollador y más allá.',
            'body'     => '¡Hola y bienvenidos a Bondlog! Soy el administrador de este espacio y aquí voy a compartir mis pensamientos, aprendizajes y experiencias mientras avanzo en mi carrera como desarrollador web. Este blog será una mezcla de todo lo que me apasiona: desde mis proyectos y retos hasta las herramientas y tecnologías que me ayudan a crecer cada día. A lo largo de mis publicaciones, no solo hablaré de código, sino también de cómo enfrento los desafíos que surgen al crear productos digitales, y de los procesos que utilizo para llevar a cabo mis ideas. Si eres un apasionado de la tecnología, el desarrollo web o simplemente te interesa seguir el progreso de un proyecto personal, este es tu lugar. Espero que disfrutes el contenido tanto como yo disfruto crear y compartir mi camino. ¡Nos vemos en las próximas publicaciones!',
            'author_id' => $user->id,
            'author_username' => $user->username,
        ]);
    }
}
