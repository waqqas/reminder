import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    getQuoteList: null,
    resetQuoteList: null,
    getQuoteListSuccess: ['response'],
    getQuoteListFailure: ['response']
})

export const QuoteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fetching: false,
    error: null,
    list: []
})

/* ------------- Reducers ------------- */

export const getQuoteList = (state) => state.merge({fetching: true})

export const resetQuoteList = (state) => state.merge({list: [], meta: null})

export const getQuoteListSuccess = (state, {response}) => {
    const {quotes} = response.data.contents
    return state.merge({fetching: false, error: null, list: quotes})
}

export const getQuoteListFailure = (state, {response}) => state.merge({fetching: false, error: response})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_QUOTE_LIST]: getQuoteList,
    [Types.RESET_QUOTE_LIST]: resetQuoteList,
    [Types.GET_QUOTE_LIST_SUCCESS]: getQuoteListSuccess,
    [Types.GET_QUOTE_LIST_FAILURE]: getQuoteListFailure,
})
