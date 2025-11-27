<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the unique constraint first (it includes the filter column)
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->dropUnique('reno_progress_unique');
        });
        
        // Change filter from ENUM to nullable string
        // MySQL doesn't support direct column type change from ENUM to string,
        // so we need to use raw SQL
        DB::statement("ALTER TABLE `reno_progress` MODIFY `filter` VARCHAR(20) NULL");
        
        // Recreate the unique constraint
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->unique(['project_id', 'item_name', 'tab', 'filter'], 'reno_progress_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the unique constraint
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->dropUnique('reno_progress_unique');
        });
        
        // Change back to ENUM
        DB::statement("ALTER TABLE `reno_progress` MODIFY `filter` ENUM('r1', 'r2', 'r3', 'r4', 'pr', 'studio') NULL");
        
        // Recreate the unique constraint
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->unique(['project_id', 'item_name', 'tab', 'filter'], 'reno_progress_unique');
        });
    }
};
