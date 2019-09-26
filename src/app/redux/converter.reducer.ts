import { CONVERTER_ACTION, ConverterAction } from './converter.action';

const initialState = {
    currency: [],
    history: []
}

export function converterReducer(state = initialState, action: ConverterAction ) {
    switch(action.type) {
        case CONVERTER_ACTION.LOAD_CALC:
        return {
            ...state,
            currency: action.payload
        }
        case CONVERTER_ACTION.LOAD_HISTORY:
        return {
            ...state,
            history: action.payload
        }

        default: 
        return state;
    }
}