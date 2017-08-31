import React, {Component} from "react";
import {PushNotificationIOS, Switch, Text, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from "react-redux"
import {Button, Icon} from 'react-native-elements'
import moment from 'moment'
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions'
import DateTimePicker from 'react-native-modal-datetime-picker'
// Styles
import {Colors} from '../Themes'
import styles from './Styles/SettingScreenStyle'
import QuoteActions from '../Redux/QuoteRedux'


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
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount() {
        PushNotificationIOS.addEventListener('localNotification', this.onNotification)
    }

    componentWillUnmount() {
        PushNotificationIOS.removeEventListener('localNotification', this.onNotification)
    }

    onNotification(notification) {
        console.log('OnNotify', notification)
    }

    handleSwitch() {
        this.props.toggleNotification()
    }

    handlePressTime() {
        this.setState({isDateTimePickerVisible: true})
    }

    _handleTimePicked = (fireDate) => {
        this.setState({
            isDateTimePickerVisible: false,
            fireDate
        })

        this.props.setNotificationTime(fireDate)
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
                            onValueChange={this.handleSwitch.bind(this)}
                            value={this.props.enabled}
                        />
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.snow, fontSize: 28}}
                              onPress={this.handlePressTime.bind(this)}>{moment(this.props.fireDate).format('h:mm A')}</Text>
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
        fireDate: state.quote.fireDate,
        enabled: state.quote.enabled,
    }
}

const mapDispatchToProps = (dispatch) => ({
    setNotificationTime: (fireDate) => dispatch(QuoteActions.setNotificationTime(fireDate)),
    toggleNotification: () => dispatch(QuoteActions.toggleNotification())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
