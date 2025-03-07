import type { WhereFilterOp } from "firebase/firestore";

export interface params {
    idUser: string,
    date?: {year: number, month: number},
    field?: string,
    WhereFilterOp?: WhereFilterOp,
    value?: string
}