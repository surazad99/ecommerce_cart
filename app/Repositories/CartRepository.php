<?php

// app/Repositories/CartRepository.php
namespace App\Repositories;

use App\Models\CartItem;
use App\Repositories\Contracts\CartRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class CartRepository implements CartRepositoryInterface
{
    public function getUserCart(int $userId): Collection
    {
        return CartItem::with('product')
            ->where('user_id', $userId)
            ->get();
    }

    public function addItem(int $userId, int $productId, int $quantity): CartItem
    {
        return CartItem::updateOrCreate(
            [
                'user_id' => $userId,
                'product_id' => $productId,
            ],
            [
                'quantity' => $quantity,
            ]
        );
    }

    public function updateQuantity(int $userId, int $productId, int $quantity): bool
    {
        $cartItem = $this->getCartItem($userId, $productId);
        
        if (!$cartItem) {
            return false;
        }

        $cartItem->quantity = $quantity;
        return $cartItem->save();
    }

    public function removeItem(int $userId, int $productId): bool
    {
        return CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->delete() > 0;
    }

    public function clearCart(int $userId): bool
    {
        return CartItem::where('user_id', $userId)->delete() > 0;
    }

    public function getCartItem(int $userId, int $productId): ?CartItem
    {
        return CartItem::where('user_id', $userId)
            ->where('product_id', $productId)
            ->first();
    }
}