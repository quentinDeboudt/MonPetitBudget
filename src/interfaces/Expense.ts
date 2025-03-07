import type { Logo } from "./Logo";

export interface Expense {
    id: number;
    name: string;
    date: string;
    logo: Logo;
    amount: number;
    category: string;
}