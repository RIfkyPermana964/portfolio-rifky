<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $skills = [
            'Backend & Core' => ['PHP', 'Laravel 11', 'MySQL', 'SQLite', 'RESTful API', 'OOP Architecture'],
            'Frontend & Styling' => ['Tailwind CSS', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'Alpine.js', 'Blade Templates'],
            'Tools & Workflow' => ['Git & GitHub', 'Laragon', 'VS Code', 'Postman', 'Vite', 'npm'],
        ];

        foreach ($skills as $category => $items) {
            foreach ($items as $item) {
                \App\Models\Skill::create([
                    'category' => $category,
                    'name' => $item,
                ]);
            }
        }
    }
}
