import {applyMiddleware, compose, createStore} from 'redux'
import {autoRehydrate} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
import ScreenTracking from './ScreenTrackingMiddleware'

// creates the store
export default (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = []
    const enhancers = []

    /* ------------- Analytics Middleware ------------- */
    middleware.push(ScreenTracking)

    /* ------------- Saga Middleware ------------- */

    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware))

    /* ------------- AutoRehydrate Enhancer ------------- */

    // add the autoRehydrate enhancer
    if (ReduxPersist.active) {
        enhancers.push(autoRehydrate())
    }

    const store = createStore(rootReducer, compose(...enhancers))

    // configure persistStore and check reducer version number
    if (ReduxPersist.active) {
        RehydrationServices.updateReducers(store)
    }

    // kick off root saga
    sagaMiddleware.run(rootSaga)

    return store
}
