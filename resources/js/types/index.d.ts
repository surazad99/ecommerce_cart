import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Product {
    id: number;
    name: string;
    description: string | null;
    price: string | number;
    stock_quantity: number;
    low_stock_threshold: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface Cart {
    items: CartItem[];
    total: string | number;
    count: number;
}

export interface Order {
    id: number;
    user_id: number;
    total_amount: string | number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface FlashMessages {
    success?: string;
    error?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    cart: Cart | null;
    flash: FlashMessages;
};
