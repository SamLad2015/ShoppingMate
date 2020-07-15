import { StyleSheet } from 'react-native';

const swipeStyles = {
    green: '#8E1600',
    red: '#0A3B10',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)'
};
const iconStyles = {
    size: 25,
    smallSize: 15
};
const subHeaderStyles = {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    flex: 1
};
const headerStyles = {
    headerStyle: { backgroundColor: '#640E27' },
    headerTitleStyle: subHeaderStyles,
    headerBackTitle: null
};
const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        borderColor: '#666',
        borderBottomWidth: 1,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        width: '90%',
        paddingLeft: 5,
        paddingBottom: 2,
        fontSize:15,
        color: '#fff'
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.9
    },
    heading: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'orange',
        textAlign: 'right',
        paddingRight: 20
    },
    itemRow: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 1,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginBottom: 60
    },
    list : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1,
        marginTop: 10,
        color: '#fff',
    },
    loginPanel: {
        position: 'absolute',
        bottom: 90,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    success: {
        flex: 1
    },
    emailText: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50
    },
    introText: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        color: '#fff'
    },
    userEmail: {
        paddingLeft: 5,
        paddingRight: 5,
        color: 'pink'
    },
    loginTextInput: {
        textAlign: 'right'
    },
    error: {
        backgroundColor: '#fff',
        height: 75,
        position: 'absolute',
        bottom: 0
    },
    errorText: {
        color: 'red'
    },
    mateProfile: {
        flex: 0.7,
        padding: 0
    }
});
const globalButtons = StyleSheet.create({
    iconButtonWrapper :{
        marginLeft: 20,
        marginRight: 20,
    },
    iconButton: {
        marginLeft: 10,
        marginTop:5,
        marginBottom:5
    },
    swipeIconButton: {
        marginTop: 20,
        alignItems: 'center'
    },
    iconButtonSmall: {
        marginRight: 0
    },
    counterButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 5
    },
    counterButtonText: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingLeft:10,
        paddingRight: 10,
        color: '#fff',
        paddingTop:3
    },
    bottomButtonsWrapper: {
        position: 'absolute',
        bottom:0,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(250, 250, 250, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    bottomButton: {
        borderColor: '#fff',
        marginTop: 10,
        marginLeft: 25,
        marginBottom: 10,
        marginRight: 25
    },
    loginButton: {
        flex: 1,
        marginTop: 22,
        marginHorizontal: 30,
        backgroundColor: "#fff",
        borderRadius: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        color: '#000',
        fontSize: 15,
        padding: 15,
        fontWeight: 'bold'
    },
    addButtonWrapper: {
        paddingTop: 10
    },
    addButton: {
        backgroundColor: '#fff',
        marginHorizontal: 30,
        borderRadius: 4,
        alignItems: "center"
    },
    addButtonText: {
        color: '#000',
        fontSize: 15,
        padding: 7,
        fontWeight: 'bold'
    }
});
export { globalStyles, globalButtons, iconStyles, headerStyles, subHeaderStyles, swipeStyles }
