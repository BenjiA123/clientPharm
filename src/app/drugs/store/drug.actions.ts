import { Action } from "@ngrx/store";
import { Drug } from "../drugs.interface";

export const TRY_GET_DRUGS = 'TRY_GET_DRUGS'
export const TRY_GET_DRUG = 'TRY_GET_DRUG'
export const GET_DRUGS = 'GET_DRUGS'
export const GET_DRUG = 'GET_DRUG'




export class TryGetDrug implements Action {
    readonly type = TRY_GET_DRUG
    constructor(public payload: { drugId: string }) { }

}

export class GetDrug implements Action {
    readonly type = GET_DRUG
    constructor(public payload: { drug: Drug }) { }
}


export class TryGetDrugs implements Action {
    readonly type = TRY_GET_DRUGS
    payload: any;
}
export class GetDrugs implements Action {
    readonly type = GET_DRUGS
    constructor(public payload: { drugs: Drug[] }) { }

}




export type DrugActions = GetDrugs | GetDrug | TryGetDrugs | TryGetDrug
