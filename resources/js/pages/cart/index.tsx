// resources/js/Pages/Cart/Index.tsx
import React from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { PageProps, CartItem } from '@/types';

interface CartPageProps extends PageProps {
    cartItems: CartItem[];
    total: string | number;
}

export default function Index({ cartItems, total }: CartPageProps) {
    const handleUpdateQuantity = (productId: number, currentQuantity: number, change: number): void => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            router.put(`/cart/${productId}`, {
                quantity: newQuantity,
            }, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    const handleRemoveItem = (productId: number): void => {
        router.delete(`/cart/${productId}`, {
            preserveScroll: true,
        });
    };

    const handleCheckout = (): void => {
        router.post('/orders', {}, {
            preserveState: false,
        });
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <AuthenticatedLayout>
                <Head title="Shopping Cart" />
                
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-6">Add some products to get started</p>
                            <a
                                href="/products"
                                className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                            >
                                Browse Products
                            </a>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title="Shopping Cart" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                                                <ShoppingBag className="w-10 h-10 text-gray-400" />
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    ${parseFloat(item.product.price.toString()).toFixed(2)} each
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.product.stock_quantity} available
                                                </p>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.product_id, item.quantity, -1)}
                                                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                
                                                <span className="text-lg font-semibold w-8 text-center">
                                                    {item.quantity}
                                                </span>
                                                
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.product_id, item.quantity, 1)}
                                                    disabled={item.quantity >= item.product.stock_quantity}
                                                    className="p-1 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900">
                                                    ${(item.quantity * parseFloat(item.product.price.toString())).toFixed(2)}
                                                </p>
                                            </div>
                                            
                                            <button
                                                onClick={() => handleRemoveItem(item.product_id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                aria-label="Remove item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${parseFloat(total.toString()).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="border-t pt-3">
                                        <div className="flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total</span>
                                            <span>${parseFloat(total.toString()).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-semibold"
                                >
                                    Proceed to Checkout
                                </button>
                                
                                <p className="text-xs text-gray-500 mt-4 text-center">
                                    Secure checkout powered by E-Shop
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}