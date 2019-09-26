import { Action } from '@ngrx/store';

export namespace CONVERTER_ACTION {
    export const LOAD_CALC = 'LOAD_CALC'
    export const LOAD_HISTORY = 'LOAD_HISTORY'
}

export class LoadCalc implements Action {
    readonly type = CONVERTER_ACTION.LOAD_CALC

    constructor (public payload:any) {

    }
}
export class LoadHistory implements Action {
    readonly type = CONVERTER_ACTION.LOAD_HISTORY

    constructor (public payload:any) {
        
    }
}

export type ConverterAction = LoadCalc | LoadHistory