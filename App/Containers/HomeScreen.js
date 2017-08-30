import React, {Component} from "react";
import {Button, Icon} from 'react-native-elements';
import moment from 'moment'

import {connect} from "react-redux";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { responsiveWidth } from 'react-native-responsive-dimensions'

// Styles
import {Colors} from '../Themes'

import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            headerRight: <Button
                icon={{name: 'settings', size: 28, color: Colors.transparentGrey}}
                buttonStyle={{backgroundColor: Colors.transparent}}
                onPress={() => {navigation.navigate( 'SettingScreen')}}/>,
            headerStyle: {position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0},

        })
    }

    constructor(props) {
        super(props)
        this.state = {
            date: moment.utc().format("MMMM D"),
            actualDate: moment.utc()
        }
    }

    handlePressArrow(arrowDirection) {
        if(arrowDirection == 'RIGHT') {
            let newDate = this.state.actualDate.add(1, 'days')
            this.setState({
                date: newDate.format("MMMM D"),
                actualDate: newDate
            })
        }
        else if(arrowDirection == 'LEFT') {
            let newDate = this.state.actualDate.subtract(1, 'days')
            this.setState({
                date: newDate.format("MMMM D"),
                actualDate: newDate
            })
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={[styles.backgroundImage, {justifyContent: 'center', alignItems: 'center'}]}>

                    <View style={{alignSelf: 'center', flexDirection:'row', justifyContent: 'space-between', width: responsiveWidth(70)}}>
                        <Icon
                            size={45}
                            name='caret-left'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}
                            onPress={this.handlePressArrow.bind(this, 'LEFT')}/>
                        <Text style={{color: Colors.transparentGrey, fontSize: 35}}>{this.state.date}</Text>
                        <Icon
                            size={45}
                            name='caret-right'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}
                            onPress={this.handlePressArrow.bind(this, 'RIGHT')}/>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection:'row', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.snow, fontSize: 18}}>Abcdefghij</Text>
                    </View>

                    <View style={{alignSelf: 'center', flexDirection:'row', justifyContent: 'space-between'}}>
                        <Icon
                            size={45}
                            name='heart'
                            type='font-awesome'
                            color={Colors.transparentGrey}
                            underlayColor={Colors.transparent}
                            onPress={() => console.log('hello')}/>
                        <Text style={{color: Colors.transparentGrey, fontSize: 35}}>LOGO IMAGE</Text>
                    </View>

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
