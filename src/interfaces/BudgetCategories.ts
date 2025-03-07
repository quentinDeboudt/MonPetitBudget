import type { Logo } from "./Logo";

export interface BudgetCategories {
    title: string;
    numberExpenses: number;
    proportion: number;
    amounts: number;
    color: string;
    logo: Logo;
}