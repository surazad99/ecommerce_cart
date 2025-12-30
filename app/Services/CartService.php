<?php

namespace App\Services;

use App\Jobs\CheckLowStockJob;
use App\Repositories\Contracts\CartRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class CartService
{
    public function __construct(
        private CartRepositoryInterface $cartRepository,
        private ProductRepositoryInterface $productRepository
    ) {}

    public function getCart(int $userId): Collection
    {
        return $this->cartRepository->getUserCart($userId);
    }

    public function addToCart(int $userId, int $productId, int $quantity = 1): array
    {
        $product = $this->productRepository->findById($productId);

        if (!$product) {
            return ['success' => false, 'message' => 'Product not found'];
        }

        if (!$product->hasStock($quantity)) {
            return ['success' => false, 'message' => 'Insufficient stock'];
        }

        $existingItem = $this->cartRepository->getCartItem($userId, $productId);
        $newQuantity = $existingItem ? $existingItem->quantity + $quantity : $quantity;

        if (!$product->hasStock($newQuantity)) {
            return ['success' => false, 'message' => 'Insufficient stock'];
        }

        $this->cartRepository->addItem($userId, $productId, $newQuantity);

        return ['success' => true, 'message' => 'Item added to cart'];
    }

    public function updateQuantity(int $userId, int $productId, int $quantity): array
    {
        if ($quantity < 1) {
            return ['success' => false, 'message' => 'Quantity must be at least 1'];
        }

        $product = $this->productRepository->findById($productId);

        if (!$product) {
            return ['success' => false, 'message' => 'Product not found'];
        }

        if (!$product->hasStock($quantity)) {
            return ['success' => false, 'message' => 'Insufficient stock'];
        }

        $this->cartRepository->updateQuantity($userId, $productId, $quantity);

        return ['success' => true, 'message' => 'Cart updated'];
    }

    public function removeFromCart(int $userId, int $productId): array
    {
        $this->cartRepository->removeItem($userId, $productId);
        return ['success' => true, 'message' => 'Item removed from cart'];
    }

    public function clearCart(int $userId): void
    {
        $this->cartRepository->clearCart($userId);
    }

    public function getCartTotal(int $userId): float
    {
        $cartItems = $this->getCart($userId);
        return $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->price;
        });
    }
}