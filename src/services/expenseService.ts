import { db } from '../plugins/firebase';
import { collection, doc, getDocs, addDoc, getDoc, query, where, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
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
export async function addExpense(idUser: string, expense: Expense): Promise<{ color: string; message: string; }> {
    try {
        const userDocRef = doc(db, 'users', idUser);
        //if user exist:
        if ((await getDoc(userDocRef)).exists() && expense) {

            const expensesRefInit = collection(db, 'users', idUser, 'expenses');
            
            const day = parseFloat(expense.date.split('-')[2]);
            const month = parseFloat(expense.date.split('-')[1]);
            const year = parseFloat(expense.date.split('-')[0]);

            const expenseDocRef = doc(expensesRefInit);
            const expenseId = expenseDocRef.id

            await setDoc(expenseDocRef,  {
                id: expenseId,
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
        return {color: 'green', message: `La dépense ${expense.name}, est bien ajoutée.`};

    }catch (error) {
        console.error("Erreur lors de l'insertion de la dépense:", error);
        return {color: 'red', message: `Erreur lors de l'insertion de la dépense: ${expense.name}`};
    }
}

/**
 * Ajoute une nouvelle dépense pour un utilisateur
 * @param idUser ID de l'utilisateur
 * @param expense Objet contenant les détails de la dépense
 * @returns L'ID du document ajouté ou null en cas d'erreur
 */
export async function modifyExpense(idUser: string, expense: Expense, ): Promise<{ color: string; message: string; }> {
    try {
        

        if (!expense.id) {
            return {color: 'red', message: "L'ID de la dépense est requis pour la modifier."};
        }
        if (isNaN(Number(expense.amount))) {
            return {color: 'red', message: `Le prix de la dépenses (${expense.amount}) n'est pas correct.`};
        }
        if (typeof expense.name !== "string" || expense.name.trim() === "") {
            return {color: 'red', message: `Le nom de la dépense ne doit pas être vide.`};
        }

        const userDocRef = doc(db, "users", idUser);
        if (!(await getDoc(userDocRef)).exists()) {
            return {color: 'red', message: `L'utilisateur ${idUser} n'existe pas.`};
        }

        // Référence du document de la dépense existante
        const expenseDocRef = doc(db, "users", idUser, "expenses", expense.id.toString());

        // Vérifier si la dépense existe avant de la modifier
        const expenseSnap = await getDoc(expenseDocRef);
        if (!expenseSnap.exists()) {
            return {color: 'red', message: `La dépense ${expense.name}, n'existe pas.`};
        }

        const [year, month, day] = expense.date.split("-").map(Number);

        if (isNaN(Number(year)) || isNaN(Number(month)) || isNaN(Number(day))) {
            return {color: 'red', message: `La date de la dépenses (${expense.date}) n'est pas correct.`};
        }
        
        if (Number(day) <= 0 || Number(day) > 31) {
            return {color: 'red', message: "Le jour de la dépense doit être un nombre valide entre 1 et 31."};
        }
        
        if (Number(month) <= 0 || Number(month) > 12) {
            return {color: 'red', message: "Le mois de la dépense doit être un nombre valide entre 1 et 12."};
        }
        
        if (Number(year) < 2010) {
            return {color: 'red', message: "L'année de la dépense doit être un nombre valide (au moins 2010)."};
        }

        // Mise à jour de la dépense existante
        await updateDoc(expenseDocRef, {
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

        if (Number(year) > new Date().getFullYear()) {
            return {color: 'warning', message: `La dépense ${expense.name} a bien été modifiée, mais l'année à changer: ${year}`};
        }

        return {color: 'green', message: `La dépense ${expense.name} a bien été modifiée.`};
    }catch (error) {
        console.error("Erreur lors de l'insertion de la dépense:", error);
        return {color: 'red', message: `Erreur lors de la modification de la dépense: ${expense.name}`};
    }
}

/**
 * Supprime une dépense d'un utilisateur
 * @param idUser ID de l'utilisateur
 * @param expenseId ID de la dépense à supprimer
 * @returns True si la suppression est réussie, False sinon
 */
export async function deleteExpense(idUser: string, expense: Expense): Promise<{ color: string; message: string; }> {
    try {
        if (expense) {
            const expenseRef = doc(db, 'users', idUser, 'expenses', expense.id.toString());
            await deleteDoc(expenseRef);
        }

        return {color: 'green', message: `La dépense ${expense.name}, à bien été supprimée !`};
        
    } catch (error) {
        console.error(`❌ Erreur lors de la suppression de la dépense:`, error);
        return {color: 'red', message: `❌ Erreur lors de la suppression de la dépense: ${expense.name}`};
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