<?php

namespace App\Services;

use App\Jobs\CheckLowStockJob;
use App\Repositories\Contracts\OrderRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Support\Facades\DB;

class OrderService
{
    public function __construct(
        private OrderRepositoryInterface $orderRepository,
        private ProductRepositoryInterface $productRepository,
        private CartService $cartService
    ) {}

    public function createOrder(int $userId): array
    {
        $cartItems = $this->cartService->getCart($userId);

        if ($cartItems->isEmpty()) {
            return ['success' => false, 'message' => 'Cart is empty'];
        }

        try {
            return DB::transaction(function () use ($userId, $cartItems) {
                $totalAmount = 0;

                foreach ($cartItems as $item) {
                    if (!$item->product->hasStock($item->quantity)) {
                        throw new \Exception("Insufficient stock for {$item->product->name}");
                    }
                    $totalAmount += $item->quantity * $item->product->price;
                }

                $order = $this->orderRepository->create([
                    'user_id' => $userId,
                    'total_amount' => $totalAmount,
                    'status' => 'completed',
                ]);

                foreach ($cartItems as $item) {
                    $order->items()->create([
                        'product_id' => $item->product_id,
                        'product_name' => $item->product->name,
                        'price' => $item->product->price,
                        'quantity' => $item->quantity,
                        'subtotal' => $item->quantity * $item->product->price,
                    ]);

                    $this->productRepository->updateStock($item->product_id, $item->quantity);

                    $product = $this->productRepository->findById($item->product_id);
                    if ($product && $product->isLowStock()) {
                        CheckLowStockJob::dispatch($product);
                    }
                }

                $this->cartService->clearCart($userId);

                return [
                    'success' => true,
                    'message' => 'Order placed successfully',
                    'order' => $order
                ];
            });
        } catch (\Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function getTodaySalesReport(): array
    {
        $orders = $this->orderRepository->getTodayOrders();

        $totalRevenue = $orders->sum('total_amount');
        $totalOrders = $orders->count();

        $productsSold = [];
        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                $productId = $item->product_id;
                if (!isset($productsSold[$productId])) {
                    $productsSold[$productId] = [
                        'name' => $item->product_name,
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productsSold[$productId]['quantity'] += $item->quantity;
                $productsSold[$productId]['revenue'] += $item->subtotal;
            }
        }

        return [
            'total_orders' => $totalOrders,
            'total_revenue' => $totalRevenue,
            'products_sold' => array_values($productsSold),
        ];
    }
}