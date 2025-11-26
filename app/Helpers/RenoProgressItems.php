<?php

namespace App\Helpers;

/**
 * Helper class to define base items for each tab in renovation progress
 */
class RenoProgressItems
{
    /**
     * Get base items for Room & Furnitures tab
     */
    public static function getRoomItems(): array
    {
        return [
            'Wiring',
            'LED Track Lighting',
            'Fan',
            'Painting & Featured Wall',
            'Bedframe',
            'Wardrobe',
            'Table',
            'Chair',
            'Curtain',
            'Wall Mirror',
            'Mattress',
            'Mattress Protector',
            'Portrait',
            'Door Stopper',
            'SMART METER',
            'SMART LOCK (Room)',
            'Mini Fridge',
            'Partition Wall',
            'Air Cond',
        ];
    }

    /**
     * Get base items for Bath tab
     */
    public static function getBathItems(): array
    {
        return [
            'Wiring',
            'Lighting',
            'Cloth Hanger',
            'Bidet',
            'Wall Mirror',
            'Water Heater',
        ];
    }

    /**
     * Get base items for Dining tab
     */
    public static function getDiningItems(): array
    {
        return [
            'Wiring',
            'LED Track Lighting',
            'Fan',
            'Painting & Featured Wall',
            'Dining Table',
            'Dining Chair',
            'Shoe Cabinet',
            'Portrait',
            'CCTV & Shelve',
            'Smart Main Door Lock',
            'G2 Gateway Hub',
            'Cloth Drying Rack',
            'Doorbell',
            'Fire Extinguisher',
            'Cleaning Tools Set',
            'Door Stopper',
        ];
    }

    /**
     * Get base items for Kitchen tab
     */
    public static function getKitchenItems(): array
    {
        return [
            'Wiring',
            'Painting',
            'Kitchen Cabinet Base Unit',
            'Kitchen Top',
            'Wall Unit',
            'Kitchen Sink',
            'Hood',
        ];
    }

    /**
     * Get base items for Electrical tab
     */
    public static function getElectricalItems(): array
    {
        return [
            'Water Dispenser',
            'Microwave',
            'Induction Cooker',
            'Washer',
            'Dryer',
        ];
    }

    /**
     * Get base items for Living tab
     */
    public static function getLivingItems(): array
    {
        return [
            'Wiring',
            'LED Track Lighting',
            'Fan',
            'Painting',
            'Curtain',
            'Sofa',
            'TV Console',
            'Coffee Table',
            'Portrait',
        ];
    }

    /**
     * Get all items for a specific tab
     */
    public static function getItemsForTab(string $tab): array
    {
        return match ($tab) {
            'room' => self::getRoomItems(),
            'bath' => self::getBathItems(),
            'dining' => self::getDiningItems(),
            'kitchen' => self::getKitchenItems(),
            'electrical' => self::getElectricalItems(),
            'living' => self::getLivingItems(),
            default => [],
        };
    }

    /**
     * Get filter variants for a specific tab
     */
    public static function getFiltersForTab(string $tab): array
    {
        return match ($tab) {
            'room' => ['r1', 'r2', 'r3', 'r4', 'pr', 'studio'],
            'bath' => ['r1', 'r2', 'r3'],
            'dining', 'kitchen', 'electrical', 'living' => [],
            default => [],
        };
    }
}

