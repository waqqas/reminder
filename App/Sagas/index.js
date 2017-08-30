import {takeLatest} from 'redux-saga/effects'
import API from '../Services/Api'
import {StartupTypes} from '../Redux/StartupRedux'
import {startup} from './StartupSagas'
import {getQuoteList} from "./QuoteSagas";
import {QuoteTypes} from "../Redux/QuoteRedux";


const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield [
        // some sagas only receive an action
        takeLatest(StartupTypes.STARTUP, startup),
        takeLatest(QuoteTypes.GET_QUOTE_LIST, getQuoteList()),
    ]
}
