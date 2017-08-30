import React, {Component} from "react";
import {View, Text} from "react-native";
import {connect} from "react-redux";
import LinearGradient from 'react-native-linear-gradient'
// Styles
import {Colors} from '../Themes'
import styles from './Styles/SplashScreenStyle'

class SplashScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.success === true) {
    //
    //         const resetAction = NavigationActions.reset({
    //             index: 0,
    //             actions: [
    //                 NavigationActions.navigate({routeName: 'MainScreen'})
    //             ]
    //         })
    //         this.props.navigation.dispatch(resetAction)
    //     }
    // }

    render() {
        return (
            <View style={styles.screen}>
                <LinearGradient colors={[Colors.gradient1, Colors.gradient2]} style={styles.backggitroundImage}>
                    <Text>hello</Text>
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
