<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddToCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Services\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function __construct(
        private CartService $cartService
    ) {}

    public function index(Request $request): Response
    {
        $cartItems = $this->cartService->getCart($request->user()->id);
        $total = $this->cartService->getCartTotal($request->user()->id);

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'total' => $total,
        ]);
    }

    public function store(AddToCartRequest $request): RedirectResponse
    {
        $result = $this->cartService->addToCart(
            $request->user()->id,
            $request->product_id,
            $request->quantity ?? 1
        );

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->with('error', $result['message']);
    }

    public function update(UpdateCartRequest $request, int $productId): RedirectResponse
    {
        $result = $this->cartService->updateQuantity(
            $request->user()->id,
            $productId,
            $request->quantity
        );

        if ($result['success']) {
            return redirect()->back()->with('success', $result['message']);
        }

        return redirect()->back()->with('error', $result['message']);
    }

    public function destroy(Request $request, int $productId): RedirectResponse
    {
        $result = $this->cartService->removeFromCart(
            $request->user()->id,
            $productId
        );

        return redirect()->back()->with('success', $result['message']);
    }
}
