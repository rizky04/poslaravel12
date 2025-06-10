import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';
import type { Config } from 'ziggy-js';

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
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export interface Product{
    id: number;
    product_code: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    price: number;
    selling_price: number;
    stock: number;
    category_id: number;
    category: Category;
}

export interface TransactionType = 'SALE' | 'PURCHASE'

export interface TransactionItem {
        id?: number;
        transaction_id?: number;
        product_id: number;
        quantity: number;
        price: number;
        selling_price: number;
        product: Product;
        createAt?: Date;
    }
export interface Transaction {
    date: ReactNode;
    id: number;
    no_transaction: string;
    type: TransactionType;
    transaction_code: string;
    items: TransactionItem[];
    total_amount: number;
    notes: string;
    created_at: string;
    updated_at: string;
    user: User;
}

