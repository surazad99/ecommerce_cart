<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function __construct(
        private OrderService $orderService
    ) {}

    public function store(Request $request): RedirectResponse
    {
        $result = $this->orderService->createOrder($request->user()->id);

        if ($result['success']) {
            return redirect()->route('products.index')
                ->with('success', 'Order placed successfully!');
        }

        return redirect()->back()->with('error', $result['message']);
    }
}
