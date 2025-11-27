<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\User;

class RenoProgress extends Model
{
    protected $table = 'reno_progress';

    protected $fillable = [
        'project_id',
        'item_name',
        'tab',
        'filter',
        'status',
        'last_updated_at',
        'updated_by',
    ];

    protected $casts = [
        'last_updated_at' => 'datetime',
    ];

    /**
     * Relationship to the user who updated the record
     */
    public function updatedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Update or create a status record for an item
     */
    public static function updateItemStatus($projectId, $itemName, $tab, $filter, $status, $updatedBy = null)
    {
        // Convert null to empty string for MySQL ENUM compatibility
        $filter = $filter ?? '';
        
        return self::updateOrCreate(
            [
                'project_id' => $projectId,
                'item_name' => $itemName,
                'tab' => $tab,
                'filter' => $filter,
            ],
            [
                'status' => $status,
                'last_updated_at' => now(),
                'updated_by' => $updatedBy,
            ]
        );
    }

    /**
     * Get status for a specific item
     */
    public static function getItemStatus($projectId, $itemName, $tab, $filter)
    {
        // Convert null to empty string for MySQL ENUM compatibility
        $filter = $filter ?? '';
        
        $record = self::where('project_id', $projectId)
            ->where('item_name', $itemName)
            ->where('tab', $tab)
            ->where('filter', $filter)
            ->first();

        return $record ? $record->status : 'Not Applicable';
    }

    /**
     * Get all statuses for a project and tab
     */
    public static function getProjectTabStatuses($projectId, $tab)
    {
        return self::where('project_id', $projectId)
            ->where('tab', $tab)
            ->get()
            ->mapWithKeys(function ($record) {
                return [
                    "{$record->item_name}_{$record->filter}" => [
                        'status' => $record->status,
                        'last_updated_at' => $record->last_updated_at,
                        'updated_by' => $record->updated_by,
                    ]
                ];
            });
    }

    /**
     * Get all items for a project, organized by tab and filter
     */
    public static function getProjectItems($projectId)
    {
        return self::where('project_id', $projectId)
            ->with('updatedByUser')
            ->get()
            ->groupBy(['tab', 'item_name'])
            ->map(function ($itemsByTab) {
                return $itemsByTab->map(function ($itemsByName) {
                    return $itemsByName->keyBy('filter');
                });
            });
    }
}