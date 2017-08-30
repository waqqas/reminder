import {StyleSheet} from 'react-native'
import {Colors} from '../../Themes/'
import {ApplicationStyles} from "../../Themes/";

export default StyleSheet.create({
    ...ApplicationStyles.tabBar,
    header: {
        backgroundColor: Colors.backgroundColor
    }
})
