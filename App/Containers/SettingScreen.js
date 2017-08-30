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
            headerTitleStyle: {color: Colors.transparentGrey, fontSize: 25}
        })
    }

    constructor(props) {
        super(props)
        this.state = {
            dailyNotification: false,
            pushNotification: false,
            time: moment().format("h:mm A"),
            actualTime: moment.utc(),
            isDateTimePickerVisible: false,
        }
        this._handleAppStateChange = this._handleAppStateChange.bind(this)
        this.checkNotificationPermissions = this.checkNotificationPermissions.bind(this)
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange)
        PushNotificationIOS.addEventListener('notification', this.onNotification)
        PushNotification.localNotification({
            // title: "My Notification Title",
            message: "My Notification Message",
        })
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
        PushNotificationIOS.removeEventListener('notification', this.onNotification)
    }

    checkNotificationPermissions() {
        //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
        Permissions.check('notification')
            .then(response => {
                if (response == 'undetermined') {
                    Permissions.request('notification')
                        .then(response => {
                            if (response == 'authorized') {
                                this.setState({dailyNotification: true, pushNotification: true})  //TODO : IN SAGAS, Schedule notifications IOS
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
                    this.setState({dailyNotification: true, pushNotification: true})//TODO : IN SAGAS, Schedule notifications IOS
                }
            })
    }

    _handleAppStateChange(appState) {
        if (appState == 'active' && Platform.OS === 'ios') {
            Permissions.check('notification')
                .then(response => {
                    if (response == 'undetermined') {
                        this.setState({dailyNotification: false, pushNotification: false})//TODO : IN SAGAS
                    } else if (response == 'denied') {
                        this.setState({dailyNotification: false, pushNotification: false})//TODO : IN SAGAS
                    } else if (response == 'authorized') {
                        this.setState({dailyNotification: true, pushNotification: true})//TODO : IN SAGAS
                    }
                })
        }
    }

    scheduleLocalNotification () {
        PushNotification.localNotificationSchedule({
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + (60 * 1000)) // in 60 secs
        })
    }

    _onRegistered(deviceToken) {
        console.log('Device Token: ', deviceToken);
        // Update device push token against current device
        // const {dispatch} = this.props
        // dispatch(Actions.updatePushToken(deviceToken))
    }

    onNotification(notification) {
        console.log('OnNotify', notification)
    }

    handleSwitch(value) {
        if (value) {
            if(Platform.OS === 'ios') {
                this.checkNotificationPermissions()
            }else {
                this.setState({dailyNotification: true, pushNotification: true})  //TODO : IN SAGAS, Schedule notifications ANDROID
            }
        }else {
            this.setState({dailyNotification: false, pushNotification: false})  //TODO : IN SAGAS, Cancel all notifications IOS and ANDROID
        }
    }

    handlePressTime() {
        this.setState({isDateTimePickerVisible: true})
    }

    _handleTimePicked = (time) => {
        this.setState({
            isDateTimePickerVisible: false,
            time: moment(time).format("h:mm A"),
            actualTime: moment(time).utc()
        })
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
                              onPress={this.handlePressTime.bind(this)}>{this.state.time}</Text>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0}}>
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
    return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
