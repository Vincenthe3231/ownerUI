<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Payment extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'invoice_id',
        'transaction_no',
        'amount',
        'payment_method',
        'payment_channel',
        'payment_date',
        'bank',
        'receiving_account',
        'remark',
        'attachments',
        'currency',
        'description',
        'status',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'attachments' => 'array',
        'payment_date' => 'datetime',
    ];

    /** Relationships **/
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
