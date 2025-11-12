<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'description_internal',
        'category',
        'is_addon',
        'total_price',
        'markup_amount',
        'markup_percentage',
        'tenure',
        'monthly_amount',
        'status',
        'created_by',
        'updated_by',
        'archived_by',
        'archived_at',
    ];

    protected $casts = [
        'is_addon' => 'boolean',
        'archived_at' => 'datetime',
    ];
}
