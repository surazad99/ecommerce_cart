<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function __construct(
        private ProductService $productService
    ) {}

    public function index() : Response
    {
        $products = $this->productService->getActiveProducts();
        
        return Inertia::render('products/index', [
            'products' => $products,
        ]);
    }
}
