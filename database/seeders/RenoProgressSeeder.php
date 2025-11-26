<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RenoProgress;
use App\Helpers\RenoProgressItems;

class RenoProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all project IDs (user IDs) that need initial data
        // For now, we'll seed for a specific project ID
        // You can modify this to seed for all users or specific users
        $projectId = '1'; // Default project ID (user ID)

        // Seed Room items
        $this->seedTabItems($projectId, 'room', RenoProgressItems::getRoomItems(), RenoProgressItems::getFiltersForTab('room'));

        // Seed Bath items
        $this->seedTabItems($projectId, 'bath', RenoProgressItems::getBathItems(), RenoProgressItems::getFiltersForTab('bath'));

        // Seed Dining items (no filters)
        $this->seedTabItems($projectId, 'dining', RenoProgressItems::getDiningItems(), []);

        // Seed Kitchen items (no filters)
        $this->seedTabItems($projectId, 'kitchen', RenoProgressItems::getKitchenItems(), []);

        // Seed Electrical items (no filters)
        $this->seedTabItems($projectId, 'electrical', RenoProgressItems::getElectricalItems(), []);

        // Seed Living items (no filters)
        $this->seedTabItems($projectId, 'living', RenoProgressItems::getLivingItems(), []);
    }

    /**
     * Seed items for a specific tab
     */
    private function seedTabItems(string $projectId, string $tab, array $items, array $filters): void
    {
        foreach ($items as $itemName) {
            if (empty($filters)) {
                // For tabs without filters, create a single record with null filter
                RenoProgress::updateOrCreate(
                    [
                        'project_id' => $projectId,
                        'item_name' => $itemName,
                        'tab' => $tab,
                        'filter' => null,
                    ],
                    [
                        'status' => 'Not Applicable',
                        'last_updated_at' => now(),
                    ]
                );
            } else {
                // For tabs with filters, create a record for each filter
                foreach ($filters as $filter) {
                    RenoProgress::updateOrCreate(
                        [
                            'project_id' => $projectId,
                            'item_name' => $itemName,
                            'tab' => $tab,
                            'filter' => $filter,
                        ],
                        [
                            'status' => 'Not Applicable',
                            'last_updated_at' => now(),
                        ]
                    );
                }
            }
        }
    }
}

