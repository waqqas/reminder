import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text} from 'react-native'
import {NavigationActions} from "react-navigation"
import {Icon} from 'react-native-elements';

// Styles
import {Colors} from '../Themes'
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success === true) {

            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'HomeScreen'})
                ]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    render() {
        return (
            <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center'}}>
                <View style={{alignSelf: 'center', flexDirection: 'row', justifyContent: 'center'}}>
                    <Icon
                        size={30}
                        name='heart'
                        type='font-awesome'
                        color={Colors.transparentGrey}
                        underlayColor={Colors.transparent}/>
                    <Text style={{color: Colors.transparentGrey, fontSize: 35}}>LOGO IMAGE</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.startup.success,
    }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
