<?php

namespace App\Repositories\Contracts;

use App\Models\CartItem;
use Illuminate\Database\Eloquent\Collection;

interface CartRepositoryInterface
{
    public function getUserCart(int $userId): Collection;
    public function addItem(int $userId, int $productId, int $quantity): CartItem;
    public function updateQuantity(int $userId, int $productId, int $quantity): bool;
    public function removeItem(int $userId, int $productId): bool;
    public function clearCart(int $userId): bool;
    public function getCartItem(int $userId, int $productId): ?CartItem;
}
