import type { Logo } from "./Logo";

export interface BudgetCategories {
    name: string;
    numberExpenses: number;
    proportion: number;
    amounts: number;
    color: string;
    logo: Logo;
    average?: {status: string, difference: number};
    min?: number;
    max?: number;
}