import React, {Component} from "react";
import {View, Text, Switch} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from "react-redux";
import {Button, Icon} from 'react-native-elements';
import moment from 'moment'
import {responsiveWidth} from 'react-native-responsive-dimensions'
import DateTimePicker from 'react-native-modal-datetime-picker'

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
            time: moment().format("h:mm"),
            actualTime: moment.utc(),
            isDateTimePickerVisible: false,
        }
    }

    componentDidMount() {
    }

    handlePressTime() {
        this.setState({isDateTimePickerVisible: true})
    }

    _handleTimePicked = (time) => {
        this.setState({
            isDateTimePickerVisible: false,
            time: moment(time).format("h:mm"),
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
                        width: responsiveWidth(70)
                    }}>
                        <Text style={{color: Colors.transparentGrey, fontSize: 25}}>Daily Notifications</Text>
                        <Switch
                            style={{}}
                            onValueChange={(value) => this.setState({dailyNotification: !this.state.dailyNotification})}
                            value={this.state.dailyNotification}
                            disabled={false}/>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.snow, fontSize: 28}}
                        onPress={this.handlePressTime.bind(this)}>{this.state.time}</Text>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Icon
                            size={45}
                            name='heart'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}/>
                        <Text style={{color: Colors.transparentGrey, fontSize: 35}}>LOGO IMAGE</Text>
                    </View>

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={() => {this.setState({isDateTimePickerVisible: false})}}
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
