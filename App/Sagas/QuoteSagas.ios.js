import {call, put, select} from 'redux-saga/effects'
import {Alert, Platform, PushNotificationIOS} from 'react-native'
import Permissions from 'react-native-permissions'
import moment from 'moment'
import QuoteActions from '../Redux/QuoteRedux'
import AppConfig from '../Config/AppConfig'

export function* toggleNotification() {
    const enabled = yield select((state) => state.quote.enabled)
    const fireDate = yield select((state) => state.quote.fireDate)

    if (enabled === false) {
        const status = yield call(Permissions.check, 'notification')

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
                const dayOfYear = moment(fireDate).dayOfYear()
                const message = `This is a sample reminder message. This is message number ${dayOfYear} of 365`

                PushNotificationIOS.cancelAllLocalNotifications()

                PushNotificationIOS.scheduleLocalNotification({
                    alertBody: message,
                    repeatInterval: AppConfig.repeatIntervalUnit,
                    fireDate

                });

                yield put(QuoteActions.toggleNotificationSuccess())

                break
        }
    }
    else {
        PushNotificationIOS.cancelAllLocalNotifications()
        yield put(QuoteActions.toggleNotificationSuccess())
    }

}

export function* setNotificationTime({fireDate}) {
    const enabled = yield select((state) => state.quote.enabled)

    if (enabled === true) {
        const dayOfYear = moment(fireDate).dayOfYear()
        const message = `This is a sample reminder message. This is message number ${dayOfYear} of 365`

        PushNotificationIOS.cancelAllLocalNotifications()

        PushNotificationIOS.scheduleLocalNotification({
            alertBody: message,
            repeatInterval: AppConfig.repeatIntervalUnit,
            fireDate
        });

    }

    yield put(QuoteActions.setNotificationTimeSuccess(fireDate))

}
