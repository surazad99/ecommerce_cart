<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    public function __construct(
        private ProductRepositoryInterface $productRepository
    ) {}

    public function getAllProducts(): Collection
    {
        return $this->productRepository->all();
    }

    public function getActiveProducts(): Collection
    {
        return $this->productRepository->getActiveProducts();
    }

    public function getProduct(int $id): ?Product
    {
        return $this->productRepository->findById($id);
    }

    public function checkStock(int $productId, int $quantity): bool
    {
        $product = $this->productRepository->findById($productId);
        return $product && $product->hasStock($quantity);
    }
}