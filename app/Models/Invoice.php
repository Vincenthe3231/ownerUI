<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Invoice extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'item_id',
        'item_type',
        'invoice_no',
        'percentage',
        'amount',
        'status',
        'link_status',
        'version',
        'due_date',
        'discountsData',
        'feesData',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'discountsData' => 'array',
        'feesData' => 'array',
        'due_date' => 'date',
    ];

    /** Polymorphic relationship **/
    public function item()
    {
        return $this->morphTo();
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
