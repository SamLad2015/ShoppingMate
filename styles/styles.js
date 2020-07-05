import { StyleSheet } from 'react-native';

const iconStyles = {
    size: 25
};
const subHeaderStyles = {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    flex: 1
};
const headerStyles = {
    headerStyle: { backgroundColor: '#800000' },
    headerTitleStyle: subHeaderStyles,
    headerBackTitle: null
};
const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderColor: '#666',
        borderBottomWidth: 1,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 15,
        width: '90%',
        paddingLeft: 10,
        fontSize:20,
        color: '#000'
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    heading: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'orange',
        textAlign: 'right',
        paddingRight: 20,
    },
    itemRow: {
        flexDirection: 'row',
        paddingLeft: 20,
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
        marginBottom: 70
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
        color: '#000',
    },
    loginPanel: {
        position: 'absolute',
        bottom: 100,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }
});
const globalButtons = StyleSheet.create({
    iconButtonWrapper :{
        marginLeft: 20,
        marginRight: 20,
    },
    iconButton: {
        marginLeft: 10
    },
    deleteIconButton: {
        marginLeft: 20,
        marginTop: 10
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
        fontSize: 25,
        paddingLeft:10,
        paddingRight: 10,
        color: 'blue'
    },
    bottomButtonsWrapper: {
        position: 'absolute',
        bottom:0,
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgba(250, 250, 250, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5
    },
    loginButton: {
        flex: 1,
        marginTop: 32,
        marginHorizontal: 30,
        backgroundColor: "#333",
        borderRadius: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 20,
        padding: 20
    }
});
export { globalStyles, globalButtons, iconStyles, headerStyles, subHeaderStyles }
