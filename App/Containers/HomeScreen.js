import React, {Component} from "react";
import {connect} from "react-redux";
import {View, Text} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

// Styles
import {Colors} from '../Themes'

import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

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
    return {
    }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
