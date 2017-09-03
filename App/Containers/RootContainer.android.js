import React, {Component} from 'react'
import {StatusBar, View} from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import {connect} from 'react-redux'
import PushNotification from 'react-native-push-notification'

import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
    componentDidMount() {
        // if redux persist is not active fire startup action
        if (!ReduxPersist.active) {
            this.props.startup()
        }
        this.onNotification = this.onNotification.bind(this)


        PushNotification.configure({
            onNotification: this.onNotification
        })
    }

    componentWillUnmount() {
    }

    onNotification(notification) {
        console.log('notification: ', notification)
    }

    render() {
        return (
            <View style={styles.applicationView}>
                <StatusBar barStyle='light-content'/>
                <ReduxNavigation/>
            </View>
        )
    }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
