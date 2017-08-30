import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
    screen: {
        mainContainer: {
            flex: 1,
            backgroundColor: Colors.transparent
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        container: {
            flex: 1,
            paddingTop: Metrics.baseMargin,
            backgroundColor: Colors.transparent
        },
        section: {
            margin: Metrics.section,
            padding: Metrics.baseMargin
        },
        sectionText: {
            ...Fonts.style.normal,
            paddingVertical: Metrics.doubleBaseMargin,
            color: Colors.snow,
            marginVertical: Metrics.smallMargin,
            textAlign: 'center'
        },
        subtitle: {
            color: Colors.snow,
            padding: Metrics.smallMargin,
            marginBottom: Metrics.smallMargin,
            marginHorizontal: Metrics.smallMargin
        },
        titleText: {
            ...Fonts.style.h2,
            fontSize: 14,
            color: Colors.text
        }
    },
    tabBar: {
        tabBarIcon: {
            color: Colors.facebook
        },
        tabBarIconInactive: {
            color: Colors.steel
        }
    },
    navBar: {
        navBarContainer: {
            backgroundColor: Colors.facebook
        },
        navLeftButton: {
            flexDirection: 'row',
            backgroundColor: Colors.transparent,
            alignItems: 'center'
        },
        navLeftButtonIcon: {
            backgroundColor: Colors.transparent
        },
        navLeftButtonText: {
            fontSize: Fonts.size.h5,
            color: Colors.snow,
            paddingLeft: Metrics.marginHorizontal
        },
        navTitle: {
            fontSize: Fonts.size.h5,
            color: Colors.snow,
            backgroundColor: Colors.transparent
        }
    },
    list: {
        listContainer: {
            flex: 1,
            backgroundColor: Colors.transparent
        },
        listItem: {
            paddingVertical: Metrics.baseMargin,
            backgroundColor: Colors.snow
        },
        listTitle: {
            color: Colors.charcoal,
            fontFamily: Fonts.type.bold,
            fontSize: Fonts.size.regular
        },
        listTitleStyle: {
            marginLeft: Metrics.baseMargin,
            width: 300,
        },
        listSubtitleStyle: {
            marginLeft: Metrics.doubleBaseMargin,
            width: 300
        },
        listAvatar: {},
        listAvatarContainer: {
            marginHorizontal: Metrics.baseMargin,
            marginVertical: Metrics.baseMargin
        }
    },
    darkLabelContainer: {
        padding: Metrics.smallMargin,
        paddingBottom: Metrics.doubleBaseMargin,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        marginBottom: Metrics.baseMargin
    },
    darkLabel: {
        fontFamily: Fonts.type.bold,
        color: Colors.snow
    },
    groupContainer: {
        margin: Metrics.smallMargin,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    sectionTitle: {
        ...Fonts.style.h4,
        color: Colors.coal,
        backgroundColor: Colors.ricePaper,
        padding: Metrics.smallMargin,
        marginTop: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin,
        borderWidth: 1,
        borderColor: Colors.ember,
        alignItems: 'center',
        textAlign: 'center'
    }
}

export default ApplicationStyles
