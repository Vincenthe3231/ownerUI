<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RenovationProgressController extends Controller
{
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

        // Hardcoded detailed project data
        $project = [
            'id' => $id,
            'unit_id' => 'A-30-12',
            'property_name' => 'Meta City',
            'location' => 'Meta City',
            'status' => 'Pending Agreement for Owner Handover',
            'hasNotification' => true,
            'hasAgreement' => true,
            'progress_stages' => [
                [
                    'id' => 1,
                    'name' => 'Sales',
                    'status' => 'completed',
                    'statusText' => 'Completed',
                    'date' => 'N/A',
                    'color' => 'green',
                ],
                [
                    'id' => 2,
                    'name' => 'Defect & Permit',
                    'status' => 'in_progress',
                    'statusText' => 'In Progress',
                    'date' => 'TBC',
                    'color' => 'yellow',
                ],
                [
                    'id' => 3,
                    'name' => 'Owner Handover',
                    'status' => 'not_started',
                    'statusText' => 'Not Started',
                    'date' => 'TBC',
                    'color' => 'gray',
                ],
            ],
            'room_furnitures' => [
                ['name' => 'Wiring', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'LED Track Lighting', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Fan', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Painting & Featured Wall', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Bedframe', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Wardrobe', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Table', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Chair', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Curtain', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Wall Mirror', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Mattress', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Mattress Protector', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Portrait', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Door Stopper', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'SMART METER', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'SMART LOCK (Room)', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Mini Fridge', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Partition Wall', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
                ['name' => 'Air Cond', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable', 'r4' => 'Not Applicable', 'pr' => 'Not Applicable', 'studio' => 'Not Applicable'],
            ],
            'bath_furnitures' => [
                ['name' => 'Wiring', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
                ['name' => 'Lighting', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
                ['name' => 'Cloth Hanger', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
                ['name' => 'Bidet', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
                ['name' => 'Wall Mirror', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
                ['name' => 'Water Heater', 'r1' => 'Not Applicable', 'r2' => 'Not Applicable', 'r3' => 'Not Applicable'],
            ],
            'dining_furnitures' => [
                ['name' => 'Wiring', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'LED Track Lighting', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Fan', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Painting & Featured Wall', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Dining Table', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Dining Chair', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Shoe Cabinet', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Portrait', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'CCTV & Shelve', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Smart Main Door Lock', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'G2 Gateway Hub', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Cloth Drying Rack', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Doorbell', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Fire Extinguisher', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Cleaning Tools Set', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Door Stopper', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
            ],
            'kitchen_furnitures' => [
                ['name' => 'Wiring', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Painting', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Kitchen Cabinet Base Unit', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Kitchen Top', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Wall Unit', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Kitchen Sink', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Hood', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
            ],
            'electrical_furnitures' => [
                ['name' => 'Water Dispenser', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Microwave', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Induction Cooker', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Washer', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Dryer', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
            ],
            'living_furnitures' => [
                ['name' => 'Wiring', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'LED Track Lighting', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Fan', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Painting', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Curtain', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Sofa', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'TV Console', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Coffee Table', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
                ['name' => 'Portrait', 'status' => 'Not Applicable', 'updated_date' => '07/11/2025', 'updated_by' => 'N/A'],
            ],
        ];

        return Inertia::render('RenovationProgressDetail', [
            'project' => $project,
            'loading' => false,
        ]);
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
