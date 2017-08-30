import {put} from "redux-saga/effects";
import {delay} from 'redux-saga'
import StartupActions from "../Redux/StartupRedux";
import AppConfig from '../Config/AppConfig'


export function* startup() {
    yield delay(AppConfig.splashDelay)
    yield put(StartupActions.startupSuccess())
}



