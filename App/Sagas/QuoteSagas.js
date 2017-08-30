import {call, put} from 'redux-saga/effects'
import {Alert} from 'react-native'
import {Permissions} from 'react-native-permissions'

import QuoteActions from '../Redux/QuoteRedux'

export function* getQuoteList(api) {
    const {status} = yield call(Permissions.check, 'notifications')

    let response = null

    switch (status) {
        case 'granted':

            response = yield call(api.getQuoteList)

            if (response.ok === true) {
                yield put(QuoteActions.getQuoteListSuccess(response))
            }
            else {
                yield put(QuoteActions.getQuoteListFailure(response))
            }
            break
        case 'undetermined':
            yield call(Permissions.request, 'notifications')
            yield put(QuoteActions.getQuoteList())
            break
        case 'denied':
            Alert.alert(
                'Notification Permission Denied',
                'Please enable permission in app settings',
                [
                    {text: 'OK'}
                ],
                {cancelable: false}
            )
    }
}
