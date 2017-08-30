import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {NavigationActions} from "react-navigation"
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
            <View style={styles.mainContainer}>
                <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={styles.backgroundImage}>

                </LinearGradient>
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
