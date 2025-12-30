<?php 

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Contracts\OrderRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Carbon\Carbon;

class OrderRepository implements OrderRepositoryInterface
{
    public function create(array $data): Order
    {
        return Order::create($data);
    }

    public function getTodayOrders(): Collection
    {
        return Order::with('items.product')
            ->whereDate('created_at', Carbon::today())
            ->get();
    }

    public function getUserOrders(int $userId): Collection
    {
        return Order::with('items')
            ->where('user_id', $userId)
            ->orderByDesc('created_at')
            ->get();
    }
}