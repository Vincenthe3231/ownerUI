<?php

namespace App\Http\Controllers;

use App\Models\OrderQuotation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuotationController extends Controller
{
    /**
     * Display the quotations list page.
     */
    public function index(Request $request): Response
    {
        // Hardcoded quotations data matching the screenshot
        $quotations = [
            [
                'id' => 1,
                'quotation_id' => 'QUO-2500001',
                'property_name' => 'Meta City',
                'unit' => 'A-30-12',
                'amount' => 159210.40,
                'status' => 'Confirmed', // Will show as "Sale" on overview
                'show_amount' => true,
            ],
            [
                'id' => 2,
                'quotation_id' => 'QUO-2500002',
                'property_name' => 'Vivo Executive Apartment',
                'unit' => 'A-22-12',
                'amount' => 22018.00,
                'status' => 'Unreleased',
                'show_amount' => false, // Click to see the amount
            ],
        ];

        return Inertia::render('Quotations', [
            'quotations' => $quotations,
        ]);
    }

    /**
     * Display the unreleased quotation page.
     */
    public function unreleased(Request $request, $id): Response
    {
        // Validate quotation exists
        $quotation = OrderQuotation::findOrFail($id);

        // Hardcoded data for unreleased quotation
        $quotationData = [
            'quotation_id' => 'QUO-2500002',
            'property_name' => 'Vivo Executive Apartment',
            'unit' => 'A-22-12',
            'date' => $quotation->created_at ? $quotation->created_at->format('d M Y') : '06 Nov 2025',
            'status' => 'Unreleased',
            'name' => 'Meta City',
            'unit_type' => 'B',
            'partition' => 'Yes',
            'address' => 'Jln Atmosphere Utama 2, 43400, Seri Kembangan, Selangor',
        ];

        // Hardcoded packages data for unreleased quotation
        $packages = [
            [
                'id' => 1,
                'name' => 'Single-Sized Bedroom Package',
                'description' => 'SmartStart Fully Furnished Single-Sized Bedroom',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Single Size Bedhead & Bedframe', 'description' => 'Single Size Bedhead & Bedframe', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => '1 Swing Door Wardrobe', 'description' => '1 Swing Door Wardrobe', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 2,
                'name' => 'Queen-Sized Bedroom Package',
                'description' => 'SmartStart Fully Furnished Queen-Sized Bedroom',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Queen Size Bedhead & Bedframe', 'description' => 'Queen Size Bedhead & Bedframe', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => '2 Swing Door Wardrobe', 'description' => '2 Swing Door Wardrobe', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 3,
                'name' => 'Dining, Foyer & Common Area Package',
                'description' => 'Fully Furnished Dining and Common Area',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Dining Table Set', 'description' => 'Dining Table with 4 chairs', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Shoe Cabinet', 'description' => 'Shoe Cabinet', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => 'Drying Rack', 'description' => 'Drying Rack', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Designer-Approved Portrait', 'description' => 'Designer-Approved Portrait', 'quantity' => '2 lumpsums'],
                    ['sow' => 'Supply & Install', 'product' => 'CCTV', 'description' => 'CCTV & Wiring', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Smart Main Door Lock', 'description' => 'IoT Enabled Smart Main Door Lock with double latches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'G2 Gateway Hub', 'description' => 'Smart WIFI G2 Gateway Hub', 'quantity' => '1 pc'],
                ],
            ],
            [
                'id' => 4,
                'name' => 'Kitchen Package',
                'description' => 'The kitchen top can be either sintered stone or quartz stone, subject to availability. Both materials offer similar quality and durability.',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Kitchen Cabinet - Top Unit', 'description' => 'Top Unit comes with wall mounted melamine cabinets, soft-close system door hinges', 'quantity' => '1 ft'],
                    ['sow' => 'Supply & Install', 'product' => 'Kitchen Cabinet - Base Unit', 'description' => 'Base unit comes with sintered/ quartz stone top come with melamine cabinets, soft-close system door hinges, soft-close system drawer track', 'quantity' => '1 Ft'],
                    ['sow' => 'Supply & Install', 'product' => 'Sink & Build In Slim Hood', 'description' => 'Sink & Build In Slim Hood', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 5,
                'name' => 'Add-on Option 1: ROI-MAX Package',
                'description' => 'Earn estimated EXTRA RM14,400 in 24mth by Transforming Living Space into Tenantable Space',
                'quantity' => 1,
                'type' => 'optional',
                'enabled' => false,
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Partition Wall', 'description' => 'Drywall partition come with rockwool insulation, knobs, hinges, door frame and wooden door.', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                ],
            ],
            [
                'id' => 6,
                'name' => 'Add-on Option 2: Air Conditioning & Piping Works Package',
                'description' => '',
                'quantity' => 1,
                'type' => 'optional',
                'enabled' => false,
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Air Conditioner', 'description' => '1 hp aircond with 10 ft copper piping - midea/ gree/ hisense', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Extra copper piping (per ft)', 'description' => '[This is estimated price. Actual pricing subject to on-site measurement]', 'quantity' => '1 ft'],
                    ['sow' => 'Supply & Install', 'product' => 'Relocation of Air Conditioner', 'description' => 'Relocation of aircond to the partitioned room', 'quantity' => '1 Lumpsum'],
                ],
            ],
        ];

        return Inertia::render('UnreleasedQuotation', [
            'quotation' => $quotationData,
            'invoices' => [],
            'packages' => $packages,
        ]);
    }

    /**
     * Display the quotation overview page.
     */
    public function overview(Request $request, $id): Response
    {
        // Fetch quotation from database (for validation that it exists)
        $quotation = OrderQuotation::findOrFail($id);

        // Determine status based on quotation ID (matching the quotations list)
        $status = 'Confirmed'; // Default for QUO-2500001 and others
        
        // Format quotation data (use database values or fallback to hardcoded)
        $quotationData = [
            'id' => $quotation->id, // Add ID for route generation
            'quotation_id' => 'QUO-2500001',
            'date' => $quotation->created_at ? $quotation->created_at->format('d M Y') : '06 Nov 2025',
            'total_amount' => $quotation->total_amount ?? 22018.00,
            'status' => $status,
            // Hardcoded quote details
            'name' => 'Meta City',
            'unit' => 'A-30-12',
            'unit_type' => 'B',
            'partition' => 'Yes',
            'address' => 'Jln Atmosphere Utama 2, 43400, Seri Kembangan, Selangor',
        ];

        // Hardcoded invoice data matching the screenshot
        // 10 invoices total: 9 paid, 1 overdue (90% paid)
        // Mix of recent (within 30 days) and older invoices for filtering
        $now = now();
        $invoices = [
            [
                'invoice_no' => 'INV-RSO-2500001-1',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(5)->toIso8601String(), // Recent - 5 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-2',
                'amount' => 3460.90,
                'due_date' => '8 August 2025',
                'status' => 'overdue',
                'created_at' => $now->copy()->subDays(3)->toIso8601String(), // Recent - 3 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-3',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(10)->toIso8601String(), // Recent - 10 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-4',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(15)->toIso8601String(), // Recent - 15 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-5',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(20)->toIso8601String(), // Recent - 20 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-6',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(25)->toIso8601String(), // Recent - 25 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-7',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(45)->toIso8601String(), // Older - 45 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-8',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(60)->toIso8601String(), // Older - 60 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-9',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(90)->toIso8601String(), // Older - 90 days ago
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-10',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(120)->toIso8601String(), // Older - 120 days ago
            ],
        ];

        // Hardcoded packages data for Quotation Order tab
        $packages = [
            [
                'id' => 1,
                'name' => 'Single-Sized Bedroom Package',
                'description' => 'SmartStart Fully Furnished Single-Sized Bedroom',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Single Size Bedhead & Bedframe', 'description' => 'Single Size Bedhead & Bedframe', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => '1 Swing Door Wardrobe', 'description' => '1 Swing Door Wardrobe', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 2,
                'name' => 'Queen-Sized Bedroom Package',
                'description' => 'SmartStart Fully Furnished Queen-Sized Bedroom',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Queen Size Bedhead & Bedframe', 'description' => 'Queen Size Bedhead & Bedframe', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => '2 Swing Door Wardrobe', 'description' => '2 Swing Door Wardrobe', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 3,
                'name' => 'Dining, Foyer & Common Area Package',
                'description' => 'Fully Furnished Dining and Common Area',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Dining Table Set', 'description' => 'Dining Table with 4 chairs', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Shoe Cabinet', 'description' => 'Shoe Cabinet', 'quantity' => '1 set'],
                    ['sow' => 'Supply & Install', 'product' => 'Drying Rack', 'description' => 'Drying Rack', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Designer-Approved Portrait', 'description' => 'Designer-Approved Portrait', 'quantity' => '2 lumpsums'],
                    ['sow' => 'Supply & Install', 'product' => 'CCTV', 'description' => 'CCTV & Wiring', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Smart Main Door Lock', 'description' => 'IoT Enabled Smart Main Door Lock with double latches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'G2 Gateway Hub', 'description' => 'Smart WIFI G2 Gateway Hub', 'quantity' => '1 pc'],
                ],
            ],
            [
                'id' => 4,
                'name' => 'Kitchen Package',
                'description' => 'The kitchen top can be either sintered stone or quartz stone, subject to availability. Both materials offer similar quality and durability.',
                'quantity' => 1,
                'type' => 'standard',
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Kitchen Cabinet - Top Unit', 'description' => 'Top Unit comes with wall mounted melamine cabinets, soft-close system door hinges', 'quantity' => '1 ft'],
                    ['sow' => 'Supply & Install', 'product' => 'Kitchen Cabinet - Base Unit', 'description' => 'Base unit comes with sintered/ quartz stone top come with melamine cabinets, soft-close system door hinges, soft-close system drawer track', 'quantity' => '1 Ft'],
                    ['sow' => 'Supply & Install', 'product' => 'Sink & Build In Slim Hood', 'description' => 'Sink & Build In Slim Hood', 'quantity' => '1 set'],
                ],
            ],
            [
                'id' => 5,
                'name' => 'Add-on Option 1: ROI-MAX Package',
                'description' => 'Earn estimated EXTRA RM14,400 in 24mth by Transforming Living Space into Tenantable Space',
                'quantity' => 1,
                'type' => 'optional',
                'enabled' => false,
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Partition Wall', 'description' => 'Drywall partition come with rockwool insulation, knobs, hinges, door frame and wooden door.', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Wiring for LED Track Lighting, Electrical Outlets & Switches', 'description' => 'Wiring for Soft LED Lighting, Electrical Outlets & Swtiches', 'quantity' => '1 Set'],
                    ['sow' => 'Supply & Install', 'product' => 'Feature Wall Painting', 'description' => 'Accent Wall - Designer-look Featured Wall', 'quantity' => '1 Lumpsum'],
                    ['sow' => 'Supply & Install', 'product' => 'Ceiling Fan', 'description' => 'Branded ceiling fan with 6 speed', 'quantity' => '1 Set'],
                ],
            ],
            [
                'id' => 6,
                'name' => 'Add-on Option 2: Electrical Appliances Package For Whole Unit Management',
                'description' => '',
                'quantity' => 1,
                'type' => 'optional',
                'enabled' => false,
                'products' => [
                    ['sow' => 'Supply & Install', 'product' => 'Washer', 'description' => '7.5kg front load washer', 'quantity' => '1 pc'],
                    ['sow' => 'Supply & Install', 'product' => 'Dryer', 'description' => '7kg front load dryer', 'quantity' => '1 pc'],
                    ['sow' => 'Supply & Install', 'product' => 'Microwave', 'description' => 'Microwave', 'quantity' => '1 pc'],
                    ['sow' => 'Supply & Install', 'product' => 'Hot & Warm Water Dispenser', 'description' => 'Hot & Warm Water Dispenser c/w 4 Layer Korea Technology Filtration', 'quantity' => '1 pc'],
                    ['sow' => 'Supply & Install', 'product' => 'Portable Induction Cooker', 'description' => 'Portable Induction Cooker', 'quantity' => '1 pc'],
                    ['sow' => 'Supply & Install', 'product' => '2 Door Refrigerator', 'description' => 'Inverter Quattro 2 Door Refrigerator', 'quantity' => '1 set'],
                ],
                'progressive_payment' => [
                    ['description' => 'Upon Confirmation and before Commencement of Phase 1', 'percentage' => 50, 'amount' => 11009.00],
                    ['description' => 'Upon Completion of Phase 1 and before Commencement of Phase 2', 'percentage' => 50, 'amount' => 11009.00],
                ],
            ],
        ];

        return Inertia::render('QuotationOverview', [
            'quotation' => $quotationData,
            'invoices' => $invoices,
            'packages' => $packages,
        ]);
    }

    /**
     * Display the quotation statistics page.
     */
    public function statistics(Request $request, $id): Response
    {
        // Fetch quotation from database (for validation that it exists)
        $quotation = OrderQuotation::findOrFail($id);

        // Format quotation data (use database values or fallback to hardcoded)
        $quotationData = [
            'id' => $quotation->id,
            'quotation_id' => 'QUO-2500001',
            'date' => $quotation->created_at ? $quotation->created_at->format('d M Y') : '06 Nov 2025',
            'total_amount' => $quotation->total_amount ?? 22018.00,
            'status' => 'Confirmed',
            'name' => 'Meta City',
            'unit' => 'A-30-12',
            'unit_type' => 'B',
            'partition' => 'Yes',
            'address' => 'Jln Atmosphere Utama 2, 43400, Seri Kembangan, Selangor',
        ];

        // Use the same invoice data as overview page
        $now = now();
        $invoices = [
            [
                'invoice_no' => 'INV-RSO-2500001-1',
                'amount' => 17304.50,
                'due_date' => '8 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(5)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-2',
                'amount' => 3460.90,
                'due_date' => '15 August 2025',
                'status' => 'overdue',
                'created_at' => $now->copy()->subDays(3)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-3',
                'amount' => 17304.50,
                'due_date' => '22 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(1)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-4',
                'amount' => 17304.50,
                'due_date' => '29 August 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(10)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-5',
                'amount' => 17304.50,
                'due_date' => '5 September 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(8)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-6',
                'amount' => 17304.50,
                'due_date' => '12 September 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(6)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-7',
                'amount' => 17304.50,
                'due_date' => '19 September 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(4)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-8',
                'amount' => 17304.50,
                'due_date' => '26 September 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(2)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-9',
                'amount' => 17304.50,
                'due_date' => '3 October 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(15)->toIso8601String(),
            ],
            [
                'invoice_no' => 'INV-RSO-2500001-10',
                'amount' => 17304.50,
                'due_date' => '10 October 2025',
                'status' => 'paid',
                'created_at' => $now->copy()->subDays(20)->toIso8601String(),
            ],
        ];

        return Inertia::render('QuotationStatistics', [
            'quotation' => $quotationData,
            'invoices' => $invoices,
        ]);
    }
}

