// resources/js/Layouts/AuthenticatedLayout.tsx
import React, { useState, ReactNode } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart, Package, User, Menu, X } from 'lucide-react';
import { PageProps } from '@/types';

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    const { auth, cart, flash } = usePage<PageProps>().props;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState<boolean>(false);
    const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

    const handleLogout = (): void => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Flash Messages */}
            {flash?.success && (
                <div className="bg-green-500 text-white px-4 py-3 text-center">
                    {flash.success}
                </div>
            )}
            {flash?.error && (
                <div className="bg-red-500 text-white px-4 py-3 text-center">
                    {flash.error}
                </div>
            )}

            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="text-xl font-bold text-indigo-600">
                                    E-Shop
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    <Package className="w-4 h-4 mr-2" />
                                    Products
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:space-x-4">
                            {/* Cart */}
                            <Link
                                href="/cart"
                                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cart && cart.count > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>

                            {/* User Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span>{auth.user?.name}</span>
                                    <svg
                                        className={`w-4 h-4 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showUserDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowUserDropdown(false)}
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setShowUserDropdown(false);
                                                handleLogout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Hamburger */}
                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                {showingNavigationDropdown ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Navigation Menu */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden border-t border-gray-200">
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                href="/products"
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                            >
                                Products
                            </Link>
                            <Link
                                href="/cart"
                                className="flex items-center justify-between pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                            >
                                <span>Cart</span>
                                {cart && cart.count > 0 && (
                                    <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-1">
                                        {cart.count}
                                    </span>
                                )}
                            </Link>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{auth.user?.name}</div>
                                <div className="font-medium text-sm text-gray-500">{auth.user?.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <Link
                                    href="/profile"
                                    className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Page Content */}
            <main>{children}</main>
        </div>
    );
}