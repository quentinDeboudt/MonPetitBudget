import { db } from '../plugins/firebase';
import { collection, doc, getDocs, addDoc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import type { ExpenseDTO } from '../interfaces/ExpenseDto';
import type { Expense } from '@/interfaces/Expense';
import type { params } from '@/interfaces/parameter';


/**
 * getUserExpenses - get expenses with filter.
 * @param idUser: string - L'identifiant de l'utilisateur.
 * @param field?: string - Le champ sur lequel effectuer la recherche.
 * @param value?: string - La valeur à rechercher.   
 * @param WhereFilterOp?: WhereFilterOp - L'opérateur de comparaison.
 * @returns Promise<ExpenseDTO[]> - Un tableau d'objets de type ExpenseDTO.
 */
export async function getUserExpenses({
    idUser = "",
    date = { year: 0, month: 0 },
    field = "",
    WhereFilterOp = '==',
    value = ""
}: params ): Promise<ExpenseDTO[]> {
    
    try {
        const userDocRef = doc(db, 'users', idUser);

        //if user exist:
        if ((await getDoc(userDocRef)).exists()) {

            const expensesRef = collection(db, 'users', idUser, 'expenses');

            //if collection exist:
            if (((await getDocs(expensesRef)).docs.length != 0)) {

                let filters = [];
            
                //if want get Expenses of month:
                if (date && date.year !== 0) {
                    filters.push(where("date.year", "==", date.year));
                    filters.push(where("date.month", "==", date.month));
                }

                const q =  idUser && date
                ? query(expensesRef,
                    where(field, WhereFilterOp , value), 
                    ...filters 
                ): expensesRef

                const expensesSnapshot = await getDocs(q);
                return expensesSnapshot.docs.map(doc => doc.data() as ExpenseDTO);
            }
            else {
                console.log(`Aucune dépense trouvée pour l'utilisateur ${idUser}`);
                return [];
            }
        }
    } catch (error) {
    console.error(`Erreur lors de la récupération des dépenses de ${idUser}:`, error)
    return []
    }
    return [];
}


/**
 * Ajoute une nouvelle dépense pour un utilisateur
 * @param idUser ID de l'utilisateur
 * @param expense Objet contenant les détails de la dépense
 * @returns L'ID du document ajouté ou null en cas d'erreur
 */
export async function addExpense(idUser: string, expense: Expense) {
    try {
        console.log("expense créer:", expense )
        const userDocRef = doc(db, 'users', idUser);
        //if user exist:
        if ((await getDoc(userDocRef)).exists() && expense) {

            const expensesRefInit = collection(db, 'users', idUser, 'expenses');
            
            const day = parseFloat(expense.date.split('-')[2]);
            const month = parseFloat(expense.date.split('-')[1]);
            const year = parseFloat(expense.date.split('-')[0]);

            const generateId =  Math.random().toString(36).substr(2, 9);

            await addDoc(expensesRefInit, {
                id: generateId,
                name: expense.name,
                date: {
                    day: day, 
                    month: month , 
                    year: year  
                },
                logo: expense.logo,
                amount: Number(expense.amount),
                category: expense.category
            });
        }
    }catch (error) {
        console.error("Erreur lors de l'insertion de la dépense:", error);
        return []
    }
    return [];
}

/**
 * Supprime une dépense d'un utilisateur
 * @param idUser ID de l'utilisateur
 * @param expenseId ID de la dépense à supprimer
 * @returns True si la suppression est réussie, False sinon
 */
export async function deleteExpense(idUser: string, expense: Expense) {
    try {
        if (expense) {
            const expenseRef = doc(db, 'users', idUser, 'expenses', expense.name);
            await deleteDoc(expenseRef);
        }
        
    } catch (error) {
    console.error(`❌ Erreur lors de la suppression de la dépense:`, error)
    }
}

/**
 * getUserExpenses - get expenses with filter.
 * @param idUser: string - L'identifiant de l'utilisateur.
 * @param field?: string - Le champ sur lequel effectuer la recherche.
 * @param value?: string - La valeur à rechercher.   
 * @param WhereFilterOp?: WhereFilterOp - L'opérateur de comparaison.
 * @returns Promise<ExpenseDTO[]> - Un tableau d'objets de type ExpenseDTO.
 */
export async function getTotalPriceOfExpenses(idUser: string, currentMonth: { year: number; month: number; }): Promise<number> {
    
    try {
        const userDocRef = doc(db, 'users', idUser);
        let totalPrice: number = 0;

        //if user exist:
        if ((await getDoc(userDocRef)).exists()) {

            const expensesRef = collection(db, 'users', idUser, 'expenses');

            //if collection exist:
            if (((await getDocs(expensesRef)).docs.length != 0)) {

                const q =  idUser && currentMonth 
                ? query(expensesRef, 
                    where('date.year', '==' , currentMonth.year),
                    where('date.month', '==' , currentMonth.month)
                ) 
                : expensesRef
    
                const expensesSnapshot = await getDocs(q);
                const lstExpense =  expensesSnapshot.docs.map(doc => doc.data() as ExpenseDTO);

                lstExpense.forEach(expense => {
                    totalPrice += expense.amount
                })
                return totalPrice;
            }
            else {
                console.log(`Aucune dépense trouvée pour l'utilisateur ${idUser}`);
                return 0;
            }
        }
    } catch (error) {
    console.error(`Erreur lors de la récupération des dépenses de ${idUser}:`, error)
    return 0
    }
    return 0;
}