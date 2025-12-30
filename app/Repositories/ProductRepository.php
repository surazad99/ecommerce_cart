<?php

namespace App\Repositories;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository implements ProductRepositoryInterface
{
    public function all(): Collection
    {
        return Product::all();
    }

    public function findById(int $id): ?Product
    {
        return Product::find($id);
    }

    public function getActiveProducts(): Collection
    {
        return Product::where('is_active', true)
            ->where('stock_quantity', '>', 0)
            ->orderBy('name')
            ->get();
    }

    public function updateStock(int $productId, int $quantity): bool
    {
        $product = $this->findById($productId);
        
        if (!$product) {
            return false;
        }

        $product->stock_quantity -= $quantity;
        return $product->save();
    }

    public function getLowStockProducts(): Collection
    {
        return Product::whereColumn('stock_quantity', '<=', 'low_stock_threshold')
            ->where('is_active', true)
            ->get();
    }
}
