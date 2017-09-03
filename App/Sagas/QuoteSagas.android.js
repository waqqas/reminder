import {put, select} from 'redux-saga/effects'
import PushNotification from 'react-native-push-notification'
import moment from 'moment'
import QuoteActions from '../Redux/QuoteRedux'
import AppConfig from '../Config/AppConfig'

export function* toggleNotification() {
    const enabled = yield select((state) => state.quote.enabled)
    const fireDate = yield select((state) => state.quote.fireDate)

    if (enabled === false) {
        const dayOfYear = moment(fireDate).dayOfYear()
        const message = `This is a sample reminder message. This is message number ${dayOfYear} of 365`

        PushNotification.cancelAllLocalNotifications()

        PushNotification.localNotificationSchedule({
            message,
            date: fireDate,
            repeatType: AppConfig.repeatIntervalUnit
        })

        yield put(QuoteActions.toggleNotificationSuccess())
    }
    else {
        PushNotification.cancelAllLocalNotifications()
        yield put(QuoteActions.toggleNotificationSuccess())
    }

}

export function* setNotificationTime({fireDate}) {
    const enabled = yield select((state) => state.quote.enabled)

    if (enabled === true) {
        const dayOfYear = moment(fireDate).dayOfYear()
        const message = `This is a sample reminder message. This is message number ${dayOfYear} of 365`

        PushNotification.cancelAllLocalNotifications()

        PushNotification.localNotificationSchedule({
            message,
            date: fireDate,
            repeatType: AppConfig.repeatIntervalUnit
        })
    }

    yield put(QuoteActions.setNotificationTimeSuccess(fireDate))

}
