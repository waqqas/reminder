import React from 'react'
import {Button} from 'react-native'
import {StackNavigator} from 'react-navigation'

import styles from './Styles/NavigationStyles'
import SplashScreen from "../Containers/SplashScreen";
import HomeScreen from "../Containers/HomeScreen";
import SettingScreen from "../Containers/SettingScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    SettingScreen: {
        screen: SettingScreen,
        navigationOptions: ({navigation}) => ({
            title: 'Settings',
            // header: <Header/>,
            // headerRight:
        })},
    HomeScreen: {
        screen: HomeScreen,
        // navigationOptions: ({navigation}) => ({
        //     title: 'Settings',
        //     // header: <Header/>,
        //     headerRight: <Button title="Info" onPress= {() => {console.log('*******')} }/>
        // })
    },
    SplashScreen: {screen: SplashScreen},
}, {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
        // headerStyle: styles.header
    }
})


export default PrimaryNav
