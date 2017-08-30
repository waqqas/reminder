import React, {Component} from "react";
// import {Button} from 'react-native'
import {Button} from 'react-native-elements';

import {connect} from "react-redux";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

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
            headerStyle: {position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0}

        })
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
    return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
