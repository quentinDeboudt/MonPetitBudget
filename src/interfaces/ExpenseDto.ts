import type { Logo } from "./Logo";

export interface ExpenseDTO {
    id: number;
    name: string;
    date: {year: number, month: number,day: number };
    logo: Logo;
    amount: number;
    category: string;
}