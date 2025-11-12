<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderQuotation extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'order_id',
        'quotation_id',
        'quotation_name',
        'version',
        'total_amount',
        'bonus',
        'metadata',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'bonus' => 'array',
        'metadata' => 'array',
    ];

    /** Relationships **/
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function invoices()
    {
        return $this->morphMany(Invoice::class, 'item');
    }
}
