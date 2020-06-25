import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7,
    },
    heading: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red',
        position: 'absolute',
        top: 20,
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
        marginTop: 30,
        marginBottom: 75,
    },
    list : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        opacity: 1,
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1,
        marginTop: 10,
        color: '#000',
    }
});
const globalButtons = StyleSheet.create({
    redButton: {
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        minWidth: 150,
    },
    redButtonText: {
        backgroundColor: 'red',
        color: '#fff',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        borderRadius: 5,
        textAlign: 'center',
    },
    counterButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    counterButtonText: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft:10,
        paddingRight: 10,
    },
    bottomButtonsWrapper: {
        position: 'absolute',
        bottom:15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
export { globalStyles, globalButtons }
