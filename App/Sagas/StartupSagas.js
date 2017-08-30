import {put} from "redux-saga/effects";
import StartupActions from "../Redux/StartupRedux";


export function* startup() {
    yield put(StartupActions.startupSuccess())
}



