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
        Schema::create('reno_progress', function (Blueprint $table) {
            $table->id();
            $table->string('project_id'); // Links to the project/user ID
            $table->string('item_name'); // Name of the item (e.g., "Wiring", "LED Track Lighting")
            $table->enum('tab', ['room', 'bath', 'dining', 'kitchen', 'electrical', 'living']); // Which tab section
            $table->enum('filter', ['r1', 'r2', 'r3', 'r4', 'pr', 'studio'])->nullable(); // Which filter variant (nullable for tabs without filters)
            $table->enum('status', ['Not Applicable', 'On Hold', 'Applied'])->default('Not Applicable');
            $table->timestamp('last_updated_at')->nullable(); // Explicit last updated timestamp
            $table->unsignedBigInteger('updated_by')->nullable(); // User ID who made the update
            $table->timestamps();
            
            // Composite unique index to prevent duplicate entries
            // One record per project/item/tab/filter combination
            $table->unique(['project_id', 'item_name', 'tab', 'filter'], 'reno_progress_unique');
            
            // Foreign key for updated_by
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            
            // Indexes for faster queries
            $table->index('project_id');
            $table->index(['project_id', 'tab']);
            $table->index(['project_id', 'tab', 'filter']);
            $table->index('updated_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reno_progress');
    }
};