<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('Rifky Permana, S.Kom.');
            $table->string('title')->default('Fresh Graduate S1 Informatika | Web Developer');
            $table->text('bio')->nullable();
            $table->string('avatar')->nullable();
            $table->string('resume_path')->nullable();
            $table->string('email')->default('rifky.permana@example.com');
            $table->string('whatsapp')->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
