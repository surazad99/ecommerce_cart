import React from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { ShoppingCart, AlertCircle, Package } from 'lucide-react';
import { PageProps, Product } from '@/types';

interface ProductsPageProps extends PageProps {
    products: Product[];
}

export default function Index({ products }: ProductsPageProps) {
    const handleAddToCart = (productId: number): void => {
        router.post('/cart', {
            product_id: productId,
            quantity: 1,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Products" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                        <p className="mt-2 text-gray-600">Browse our collection of products</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                            >
                                <div className="aspect-w-1 aspect-h-1 bg-gray-200 flex items-center justify-center p-8">
                                    <Package className="w-24 h-24 text-gray-400" />
                                </div>
                                
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                        {product.name}
                                    </h3>
                                    
                                    {product.description && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                    )}
                                    
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-bold text-indigo-600">
                                            ${parseFloat(product.price.toString()).toFixed(2)}
                                        </span>
                                        <span className={`text-sm ${product.stock_quantity > 10 ? 'text-green-600' : 'text-orange-600'}`}>
                                            {product.stock_quantity} in stock
                                        </span>
                                    </div>
                                    
                                    {product.stock_quantity <= product.low_stock_threshold && product.stock_quantity > 0 && (
                                        <div className="flex items-center text-xs text-orange-600 mb-2">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            Low stock
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={() => handleAddToCart(product.id)}
                                        disabled={product.stock_quantity === 0}
                                        className={`w-full py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors ${
                                            product.stock_quantity === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                        }`}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>
                                            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}