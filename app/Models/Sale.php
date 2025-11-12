<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sale extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'order_id',
        'reno_sale_id',
        'user_id',
        'sales_no',
        'description',
        'total_amount',
        'remaining_amount',
        'remaining_percentage',
        'status',
        'created_by',
        'updated_by',
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
