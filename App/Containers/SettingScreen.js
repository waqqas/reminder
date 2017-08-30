import React, {Component} from "react";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {connect} from "react-redux";
// Styles
import {Colors} from '../Themes'

class SettingScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
