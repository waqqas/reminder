import {call, put, select} from 'redux-saga/effects'
import {Alert, Platform} from 'react-native'
import Permissions from 'react-native-permissions'
import PushNotification from 'react-native-push-notification'
import moment from 'moment'

import Quotes from '../Constants/Quotes'
import QuoteActions from '../Redux/QuoteRedux'

export function* toggleNotification() {
    const enabled = yield select((state) => state.quote.enabled)
    const fireDate = yield select((state) => state.quote.fireDate)

    if (enabled === true) {
        let status = 'authorized'
        if (Platform.OS === 'ios') {
            status = yield call(Permissions.check, 'notification')
        }

        switch (status) {
            case 'undetermined':
                yield call(Permissions.request, 'notification')
                yield put(QuoteActions.toggleNotification())
                break
            case 'denied':
                Alert.alert(
                    'Notification disabled',
                    'Please enable push notification from Settings',
                    [
                        {
                            text: 'OK', onPress: () => {
                        }
                        }
                    ],
                    {cancelable: false}
                )
                break
            case 'authorized':
                const message = Quotes[moment(fireDate).dayOfYear()]

                PushNotification.localNotificationSchedule({
                    message: message,
                    date: fireDate
                });

                yield put(QuoteActions.toggleNotificationSuccess())

                break
        }
    }
    else {
        PushNotification.cancelAllLocalNotifications()
        yield put(QuoteActions.toggleNotificationSuccess())
    }

}

export function* setNotificationTime({fireDate}) {
    yield put(QuoteActions.setNotificationTimeSuccess(fireDate))

}
