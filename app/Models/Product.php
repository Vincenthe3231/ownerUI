<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'pm_category_id',
        'supplier_name',
        'SKU',
        'type',
        'description',
        'uom',
        'task_weightage',
        'color',
        'material',
        'width',
        'height',
        'depth',
        'internal_desc',
        'status',
        'attachments',
        'created_by',
        'updated_by',
        'archived_by',
        'archived_at',
    ];

    protected $casts = [
        'attachments' => 'array',
        'archived_at' => 'datetime',
    ];

    /** Relationships **/
    public function category()
    {
        return $this->belongsTo(PmCategory::class, 'pm_category_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
