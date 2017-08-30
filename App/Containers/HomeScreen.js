import React, {Component} from "react";
import {View} from "react-native";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation"
// import {Components} from 'expo';
// Styles
// const {LinearGradient} = Components;

import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
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
