import React, {Component} from "react";
import {View, Text, Switch, PushNotificationIOS, AppState, Alert, Linking, Platform} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from "react-redux"
import {Button, Icon} from 'react-native-elements'
import moment from 'moment'
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions'
import DateTimePicker from 'react-native-modal-datetime-picker'
const Permissions = require('react-native-permissions')
var PushNotification = require('react-native-push-notification')
import Quotes from '../Constants/Quotes'
import QuoteActions from '../Redux/QuoteRedux'


// Styles
import {Colors} from '../Themes'
import styles from './Styles/SettingScreenStyle'

class SettingScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Settings',
            headerLeft: <Button
                type='font-awesome'
                icon={{name: 'chevron-left', size: 45, color: Colors.transparentGrey}}
                buttonStyle={{backgroundColor: Colors.transparent}}
                onPress={() => {
                    navigation.goBack()
                }}/>,
            headerStyle: {position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0},
            headerTitleStyle: {color: Colors.transparentGrey, fontSize: 25, alignSelf: 'center'}
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            dailyNotification: this.props.dailyNotification,
            pushNotification: this.props.pushNotification,
            actualTime: new Date(Date.now()),
            isDateTimePickerVisible: false,
        }
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this.checkNotificationPermissions = this.checkNotificationPermissions.bind(this)
        this.scheduleLocalNotification = this.scheduleLocalNotification.bind(this)
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        PushNotificationIOS.addEventListener('localNotification', this.onNotification)
        // PushNotification.localNotification({
        //     title: "Today's reminder",
        //     message: "You are awesome!",
        // })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
        PushNotificationIOS.removeEventListener('localNotification', this.onNotification)
    }

    componentWillReceiveProps(nextProps) {
        console.log('will receive props', nextProps)
        this.setState({
            dailyNotification: nextProps.dailyNotification,
            pushNotification: nextProps.pushNotification,
        })

        if (nextProps.dailyNotification == false && nextProps.pushNotification == false) {
            if (Platform.OS === 'ios') {
                PushNotificationIOS.cancelLocalNotifications()
            } else {
                PushNotification.cancelAllLocalNotifications()
            }
        }
    }

    checkNotificationPermissions() {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        Permissions.check('notification')
            .then(response => {
                console.log(response)
                if (response == 'undetermined') {
                    Permissions.request('notification')
                        .then(response => {
                            if (response == 'authorized') {
                                this.props.setNotificationState(true, true)
                            }
                        })
                } else if (response == 'denied') {
                    Alert.alert(
                        'Enable Push Notification',
                        'Press "Ok" and select "Allow Notifications" ',
                        [
                            {
                                text: 'OK', onPress: () => {
                                const url = 'app-settings:'

                                Linking.canOpenURL(url).then(supported => {
                                    if (!supported) {
                                        console.log('Can\'t handle url: ' + url);
                                    } else {
                                        return Linking.openURL(url);
                                    }
                                }).catch(err => console.error('An error occurred', err));
                            }
                            },
                        ],
                        {cancelable: false}
                    )
                } else if (response == 'authorized') {
                    this.props.setNotificationState(true, true)
                }
            })
    }

    _handleAppStateChange(appState) {
        console.log('App state change', appState)
        if (appState == 'active' && Platform.OS === 'ios') {
            Permissions.check('notification')
                .then(response => {
                    if (response == 'undetermined') {
                        this.props.setNotificationState(false, false)
                    } else if (response == 'denied') {
                        this.props.setNotificationState(false, false)
                    } else if (response == 'authorized') {
                        this.props.setNotificationState(true, true)
                    }
                })
        }
    }

    onNotification(notification) {
        console.log('OnNotify', notification)
    }

    handleSwitch(value) {
        console.log('Switch', value)
        if (value) {
            if (Platform.OS === 'ios') {
                this.checkNotificationPermissions()
            } else {
                this.props.setNotificationState(true, true)
            }
            this.scheduleLocalNotification(this.state.actualTime)
        } else {
            this.props.setNotificationState(false, false)
            // if (Platform.OS === 'ios') {
            //     PushNotificationIOS.cancelLocalNotifications()
            // } else {
            //     PushNotification.cancelAllLocalNotifications()
            // }
        }
    }

    scheduleLocalNotification(time) {
        console.log('Schdeule notification', time)
        if (Platform.OS === 'ios') {
            PushNotificationIOS.scheduleLocalNotification({
                firedate: time,
                repeatInterval: 'day',
                alertBody: Quotes[moment(time).dayOfYear()]
            })
        } else {
            PushNotification.localNotificationSchedule({
                message: Quotes[moment(time).dayOfYear()],
                date: time,
                repeatType: 'minute',
                // repeatType: 'time',
                // repeatTime: (60 * 1000),
            })
        }
    }

    handlePressTime() {
        this.setState({isDateTimePickerVisible: true})
    }

    _handleTimePicked = (time) => {
        this.setState({
            isDateTimePickerVisible: false,
            actualTime: time
        })
        console.log('Time picked', time)
        if(this.state.dailyNotification) {
            this.scheduleLocalNotification(time)
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <LinearGradient colors={[Colors.gradient1, Colors.gradient2]}
                                style={[styles.backgroundImage, {justifyContent: 'center', alignItems: 'center'}]}>
                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: responsiveWidth(70),
                        position: 'absolute',
                        top: responsiveHeight(20),
                    }}>
                        <Text style={{color: Colors.snow, fontSize: 18}}>Daily Notifications</Text>
                        <Switch
                            style={{}}
                            onValueChange={this.handleSwitch.bind(this)}
                            value={this.state.dailyNotification}
                            disabled={false}/>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.snow, fontSize: 28}}
                              onPress={this.handlePressTime.bind(this)}>{moment(this.state.actualTime).format("h:mm A")}</Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        position: 'absolute',
                        bottom: 0
                    }}>
                        <Icon
                            size={30}
                            name='heart'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}/>
                        <Text style={{color: Colors.transparentGrey, fontSize: 35}}>LOGO IMAGE</Text>
                    </View>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={() => {
                            this.setState({isDateTimePickerVisible: false})
                        }}
                        mode='time'
                        titleIOS='Select a time'
                    />
                </LinearGradient>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pushNotification: state.quote.pushNotification,
        dailyNotification: state.quote.dailyNotification,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setNotificationState: (pushNotification, dailyNotification) => dispatch(QuoteActions.notificationState(pushNotification, dailyNotification))
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
