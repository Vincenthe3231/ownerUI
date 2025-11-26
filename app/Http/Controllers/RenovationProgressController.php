<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\RenoProgress;
use App\Helpers\RenoProgressItems;
use Carbon\Carbon;

class RenovationProgressController extends Controller
{
    /**
     * Format datetime according to app locale configuration
     * Uses locale and timezone from config/app.php (set via .env)
     * Format: dd/mm/yyyy hh:mm AM/PM (e.g., 26/11/2025 02:30 PM)
     */
    private function formatDateTimeMY($datetime): string
    {
        if (!$datetime) {
            return 'N/A';
        }
        
        // Get locale and timezone from config (set via .env)
        $locale = config('app.locale', 'en_MY');
        $timezone = config('app.timezone', 'Asia/Kuala_Lumpur');
        
        // Handle both Carbon instances and strings
        $carbon = $datetime instanceof Carbon 
            ? $datetime->copy()->setTimezone($timezone)
            : Carbon::parse($datetime)->setTimezone($timezone);
        
        // Set Carbon locale for localized formatting
        $carbon->setLocale($locale);
        
        // Use Carbon's isoFormat for locale-aware formatting
        // For en_MY, this will format as: dd/mm/yyyy hh:mm AM/PM
        return $carbon->isoFormat('DD/MM/YYYY hh:mm A');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Hardcoded renovation projects data
        $projects = [
            [
                'id' => 1,
                'unit_id' => 'A-30-12',
                'property_name' => 'Meta City',
                'location' => 'Meta City',
                'status' => 'Pending Agreement for Owner Handover',
                'hasNotification' => true,
            ],
            // Add more projects as needed
        ];

        return Inertia::render('RenovationProgress', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): Response
    {
        // Simulate loading time for database queries
        sleep(1);

        // Fetch user from database
        $user = User::findOrFail($id);

        // Get user information (owner details)
        $ownerName = $user->name ?? null;
        $ownerPhone = $user->phone ?? null;

        // Use hardcoded values for property info since Order model is not initialized yet
        $unitId = 'A-30-12';
        $propertyName = 'Meta City';

        // Fetch all renovation progress data from database
        $projectId = (string) $id;
        $renoProgressData = RenoProgress::where('project_id', $projectId)
            ->with('updatedByUser')
            ->get()
            ->groupBy(['tab', 'item_name', 'filter']);

        // Build project data structure
        $project = [
            'id' => $id,
            'unit_id' => $unitId,
            'property_name' => $propertyName,
            'location' => $propertyName,
            'status' => 'Pending Agreement for Owner Handover',
            'hasNotification' => true,
            'hasAgreement' => true,
            'owner_name' => $ownerName,
            'owner_phone' => $ownerPhone,
            'progress_stages' => [
                [
                    'id' => 1,
                    'name' => 'Sales',
                    'status' => 'completed',
                    'statusText' => 'Completed',
                    'date' => '10/11/2025',
                    'color' => 'green',
                ],
                [
                    'id' => 2,
                    'name' => 'Defect & Permit',
                    'status' => 'in_progress',
                    'statusText' => 'In Progress',
                    'date' => 'N/A',
                    'color' => 'yellow',
                ],
                [
                    'id' => 3,
                    'name' => 'Renovation',
                    'status' => 'not_started',
                    'statusText' => 'Not Started',
                    'date' => 'N/A',
                    'color' => 'gray',
                ],
                [
                    'id' => 4,
                    'name' => 'Owner Handover',
                    'status' => 'not_started',
                    'statusText' => 'Not Started',
                    'date' => 'N/A',
                    'color' => 'gray',
                ],
            ],
            'room_furnitures' => $this->buildRoomFurnitures($projectId, $renoProgressData),
            'bath_furnitures' => $this->buildBathFurnitures($projectId, $renoProgressData),
            'dining_furnitures' => $this->buildDiningFurnitures($projectId, $renoProgressData),
            'kitchen_furnitures' => $this->buildKitchenFurnitures($projectId, $renoProgressData),
            'electrical_furnitures' => $this->buildElectricalFurnitures($projectId, $renoProgressData),
            'living_furnitures' => $this->buildLivingFurnitures($projectId, $renoProgressData),
        ];

        return Inertia::render('RenovationProgressDetail', [
            'project' => $project,
            'loading' => false,
        ]);
    }

    /**
     * Build room furnitures array from database
     */
    private function buildRoomFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getRoomItems();
        $filters = RenoProgressItems::getFiltersForTab('room');

        foreach ($baseItems as $itemName) {
            $item = ['name' => $itemName];
            
            // Get status for each filter and track the most recent update
            $latestUpdate = null;
            foreach ($filters as $filter) {
                $recordCollection = $renoProgressData->get('room')?->get($itemName)?->get($filter);
                $record = $recordCollection ? $recordCollection->first() : null;
                $item[$filter] = $record ? $record->status : 'Not Applicable';
                
                // Track the most recent update across all filters
                if ($record && $record->last_updated_at) {
                    if (!$latestUpdate || $record->last_updated_at->gt($latestUpdate)) {
                        $latestUpdate = $record->last_updated_at;
                    }
                }
            }
            
            // Add last updated datetime (use the most recent from any filter)
            $item['last_updated_at'] = $this->formatDateTimeMY($latestUpdate);
            
            $items[] = $item;
        }

        return $items;
    }

    /**
     * Build bath furnitures array from database
     */
    private function buildBathFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getBathItems();
        $filters = RenoProgressItems::getFiltersForTab('bath');

        foreach ($baseItems as $itemName) {
            $item = ['name' => $itemName];
            
            // Get status for each filter and track the most recent update
            $latestUpdate = null;
            foreach ($filters as $filter) {
                $recordCollection = $renoProgressData->get('bath')?->get($itemName)?->get($filter);
                $record = $recordCollection ? $recordCollection->first() : null;
                $item[$filter] = $record ? $record->status : 'Not Applicable';
                
                // Track the most recent update across all filters
                if ($record && $record->last_updated_at) {
                    if (!$latestUpdate || $record->last_updated_at->gt($latestUpdate)) {
                        $latestUpdate = $record->last_updated_at;
                    }
                }
            }
            
            // Add last updated datetime (use the most recent from any filter)
            $item['last_updated_at'] = $this->formatDateTimeMY($latestUpdate);
            
            $items[] = $item;
        }

        return $items;
    }

    /**
     * Build dining furnitures array from database
     */
    private function buildDiningFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getDiningItems();

        foreach ($baseItems as $itemName) {
            // Laravel's groupBy converts null to the string 'null'
            $recordCollection = $renoProgressData->get('dining')?->get($itemName)?->get(null) 
                ?? $renoProgressData->get('dining')?->get($itemName)?->get('null');
            $record = $recordCollection ? $recordCollection->first() : null;
            
            $items[] = [
                'name' => $itemName,
                'status' => $record ? $record->status : 'Not Applicable',
                'updated_date' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
                'updated_by' => $record && $record->updatedByUser 
                    ? $record->updatedByUser->name 
                    : 'N/A',
                'last_updated_at' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
            ];
        }

        return $items;
    }

    /**
     * Build kitchen furnitures array from database
     */
    private function buildKitchenFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getKitchenItems();

        foreach ($baseItems as $itemName) {
            // Laravel's groupBy converts null to the string 'null'
            $recordCollection = $renoProgressData->get('kitchen')?->get($itemName)?->get(null) 
                ?? $renoProgressData->get('kitchen')?->get($itemName)?->get('null');
            $record = $recordCollection ? $recordCollection->first() : null;
            
            $items[] = [
                'name' => $itemName,
                'status' => $record ? $record->status : 'Not Applicable',
                'updated_date' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
                'updated_by' => $record && $record->updatedByUser 
                    ? $record->updatedByUser->name 
                    : 'N/A',
                'last_updated_at' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
            ];
        }

        return $items;
    }

    /**
     * Build electrical furnitures array from database
     */
    private function buildElectricalFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getElectricalItems();

        foreach ($baseItems as $itemName) {
            // Laravel's groupBy converts null to the string 'null'
            $recordCollection = $renoProgressData->get('electrical')?->get($itemName)?->get(null) 
                ?? $renoProgressData->get('electrical')?->get($itemName)?->get('null');
            $record = $recordCollection ? $recordCollection->first() : null;
            
            $items[] = [
                'name' => $itemName,
                'status' => $record ? $record->status : 'Not Applicable',
                'updated_date' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
                'updated_by' => $record && $record->updatedByUser 
                    ? $record->updatedByUser->name 
                    : 'N/A',
                'last_updated_at' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
            ];
        }

        return $items;
    }

    /**
     * Build living furnitures array from database
     */
    private function buildLivingFurnitures(string $projectId, $renoProgressData): array
    {
        $items = [];
        $baseItems = RenoProgressItems::getLivingItems();

        foreach ($baseItems as $itemName) {
            // Laravel's groupBy converts null to the string 'null'
            $recordCollection = $renoProgressData->get('living')?->get($itemName)?->get(null) 
                ?? $renoProgressData->get('living')?->get($itemName)?->get('null');
            $record = $recordCollection ? $recordCollection->first() : null;
            
            $items[] = [
                'name' => $itemName,
                'status' => $record ? $record->status : 'Not Applicable',
                'updated_date' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
                'updated_by' => $record && $record->updatedByUser 
                    ? $record->updatedByUser->name 
                    : 'N/A',
                'last_updated_at' => $this->formatDateTimeMY($record ? $record->last_updated_at : null),
            ];
        }

        return $items;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Update item status for a renovation project.
     */
    public function updateItemStatus(Request $request)
    {
        $request->validate([
            'project_id' => 'required|string',
            'item_name' => 'required|string',
            'filter' => 'nullable|string|in:r1,r2,r3,r4,pr,studio',
            'status' => 'required|string|in:Not Applicable,On Hold,Applied',
            'tab' => 'required|string|in:room,bath,dining,kitchen,electrical,living',
        ]);
    
        // Get the authenticated user ID
        $updatedBy = auth()->id();
    
        // Update or create the status record
        RenoProgress::updateItemStatus(
            $request->project_id,
            $request->item_name,
            $request->tab,
            $request->filter,
            $request->status,
            $updatedBy
        );
    
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
