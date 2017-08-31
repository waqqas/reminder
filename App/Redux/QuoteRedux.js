import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    setNotificationTime: ['fireDate'],
    toggleNotification: null,
    toggleNotificationSuccess: null,
    setNotificationTimeSuccess: ['fireDate'],
})

export const QuoteTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    fireDate: new Date(Date.now()),
    enabled: false
})

/* ------------- Reducers ------------- */

export const setNotificationTimeSuccess = (state, {fireDate}) => state.merge({fireDate})
export const toggleNotificationSuccess = (state) => state.merge({enabled: !state.enabled})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_NOTIFICATION_TIME_SUCCESS]: setNotificationTimeSuccess,
    [Types.TOGGLE_NOTIFICATION_SUCCESS]: toggleNotificationSuccess,
})
