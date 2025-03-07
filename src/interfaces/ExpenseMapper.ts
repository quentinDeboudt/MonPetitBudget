import type { Expense } from "./Expense";
import type { ExpenseDTO } from "./ExpenseDto";


export class ExpenseMapper {
    /**
     * Convert Expense type into ExpensesDTO type.
     * @param expense Object to Expense type. 
     * @returns Object to ExpensesDTO type.
     */
    static ExpenseToExpenseDTO(expense: Expense): ExpenseDTO {

        const year = parseInt(expense.date.split("-")[0]);
        const month = parseInt(expense.date.split("-")[1]);
        const day = parseInt(expense.date.split("-")[3]);

        return {
            id: expense.id,
            name: expense.name,
            date: {year: year, month: month, day: day },
            logo: expense.logo,
            amount: expense.amount,
            category: expense.category
        };
    }

    /**
     * Convert ExpensesDTO type into Expense type.
     * @param expense Object to ExpensesDTO type. 
     * @returns Object to Expense type.
     */
    static ExpenseDtoToExpense(expense: ExpenseDTO): Expense {

        let month;
        let day;

        for (const [key, value] of Object.entries(expense.date)) {
            if (key === 'month') {
            month = value < 10 ? `0${value}` : value;
            } else if (key === 'day') {
            day = value < 10 ? `0${value}` : value;
            }
        }

        return {
            id: expense.id,
            name: expense.name,
            date: `${expense.date.year}-${month}-${day}`,
            logo: expense.logo,
            amount: expense.amount,
            category: expense.category
        };
    }
}
