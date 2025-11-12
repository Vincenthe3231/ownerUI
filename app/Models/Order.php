<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'order_no',
        'draft_order_no',
        'user_id',
        'property_id',
        'form_id',
        'unit_type',
        'block',
        'floor',
        'unit_no',
        'bedroom_count',
        'single_bedroom_count',
        'queen_bedroom_count',
        'studio_count',
        'bathroom_count',
        'include_partition',
        'is_progressive_payment',
        'is_rnpl',
        'rnpl_base_price',
        'is_be_powered',
        'installment_method',
        'installment_amount',
        'be_powered_base_price',
        'total_amount',
        'final_amount',
        'completion_day',
        'tenure',
        'description',
        'internal_remark',
        'status',
        'released_at',
        'confirmed_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'include_partition' => 'boolean',
        'is_progressive_payment' => 'boolean',
        'is_rnpl' => 'boolean',
        'is_be_powered' => 'boolean',
        'released_at' => 'datetime',
        'confirmed_at' => 'datetime',
    ];

    /** Relationships **/
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function quotations()
    {
        return $this->hasMany(OrderQuotation::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
