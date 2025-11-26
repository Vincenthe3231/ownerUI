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
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->unsignedBigInteger('updated_by')->nullable()->after('last_updated_at');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
            $table->index('updated_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reno_progress', function (Blueprint $table) {
            $table->dropForeign(['updated_by']);
            $table->dropIndex(['updated_by']);
            $table->dropColumn('updated_by');
        });
    }
};
