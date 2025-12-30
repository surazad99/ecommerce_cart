<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Laptop',
                'description' => 'High-performance laptop for professionals',
                'price' => 999.99,
                'stock_quantity' => 50,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'Wireless Mouse',
                'description' => 'Ergonomic wireless mouse with precision tracking',
                'price' => 29.99,
                'stock_quantity' => 8,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'Mechanical Keyboard',
                'description' => 'RGB mechanical keyboard with blue switches',
                'price' => 89.99,
                'stock_quantity' => 30,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'USB-C Hub',
                'description' => '7-in-1 USB-C hub with HDMI and card readers',
                'price' => 49.99,
                'stock_quantity' => 5,
                'low_stock_threshold' => 8,
            ],
            [
                'name' => 'Webcam',
                'description' => '1080p HD webcam with built-in microphone',
                'price' => 79.99,
                'stock_quantity' => 25,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'Headphones',
                'description' => 'Noise-canceling over-ear headphones',
                'price' => 199.99,
                'stock_quantity' => 15,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'Monitor',
                'description' => '27-inch 4K IPS monitor',
                'price' => 399.99,
                'stock_quantity' => 20,
                'low_stock_threshold' => 10,
            ],
            [
                'name' => 'Desk Lamp',
                'description' => 'LED desk lamp with adjustable brightness',
                'price' => 39.99,
                'stock_quantity' => 40,
                'low_stock_threshold' => 10,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
