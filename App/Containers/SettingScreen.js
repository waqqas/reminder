import React, {Component} from "react";
import {View} from "react-native";
import {connect} from "react-redux";

// Styles

class SettingScreen extends Component {

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
    return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
