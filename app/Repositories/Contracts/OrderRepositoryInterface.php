<?php

namespace App\Repositories\Contracts;

use App\Models\Order;
use Illuminate\Database\Eloquent\Collection;

interface OrderRepositoryInterface
{
    public function create(array $data): Order;
    public function getTodayOrders(): Collection;
    public function getUserOrders(int $userId): Collection;
}