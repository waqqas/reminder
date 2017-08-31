import React, {Component} from "react";
import {Button, Icon} from 'react-native-elements'
import moment from 'moment'
import {connect} from "react-redux";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions'
import DateTimePicker from 'react-native-modal-datetime-picker'

// Styles
import {Colors} from '../Themes'
import Quotes from '../Constants/Quotes'

import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            headerRight: <Button
                icon={{name: 'settings', size: 28, color: Colors.transparentGrey}}
                buttonStyle={{backgroundColor: Colors.transparent}}
                onPress={() => {
                    navigation.navigate('SettingScreen')
                }}/>,
            headerStyle: {position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0},

        })
    }

    constructor(props) {
        super(props)
        this.state = {
            date: moment().format("MMMM D"),
            actualDate: moment.utc(),
            dayOfYear: moment.utc().dayOfYear(),
            isDateTimePickerVisible: false
        }
    }

    componentDidMount() {
    }


    handlePressArrow(arrowDirection) {
        let newDate = ''
        if (arrowDirection == 'RIGHT') {
            newDate = this.state.actualDate.add(1, 'days')
        }
        else if (arrowDirection == 'LEFT') {
            newDate = this.state.actualDate.subtract(1, 'days')
        }
        this.setState({
            date: newDate.format("MMMM D"),
            actualDate: newDate,
            dayOfYear: newDate.dayOfYear()
        })
    }

    handlePressTime() {
        this.setState({isDateTimePickerVisible: true})
    }

    _handleTimePicked = (date) => {
        this.setState({
            isDateTimePickerVisible: false,
            date: moment(date).format("MMMM D"),
            actualDate: moment(date).utc(),
            dayOfYear: moment(date).dayOfYear()
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
                        top: responsiveHeight(25),
                    }}>
                        <Icon
                            size={45}
                            name='caret-left'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}
                            onPress={this.handlePressArrow.bind(this, 'LEFT')}/>
                        <Text style={{color: Colors.transparentGrey, fontSize: 35}}
                              onPress={this.handlePressTime.bind(this)}>{this.state.date}</Text>
                        <Icon
                            size={45}
                            name='caret-right'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}
                            onPress={this.handlePressArrow.bind(this, 'RIGHT')}/>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.snow, fontSize: 18}}>{Quotes[this.state.dayOfYear]}</Text>
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
                        onCancel={() => {this.setState({isDateTimePickerVisible: false})}}
                        mode='date'
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
