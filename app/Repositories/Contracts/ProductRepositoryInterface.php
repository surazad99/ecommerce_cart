<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;

interface ProductRepositoryInterface
{
    public function all(): Collection;
    public function findById(int $id): ?Product;
    public function getActiveProducts(): Collection;
    public function updateStock(int $productId, int $quantity): bool;
    public function getLowStockProducts(): Collection;
}