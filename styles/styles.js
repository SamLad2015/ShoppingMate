import { StyleSheet } from 'react-native';

const iconStyles = {
    size: 20
};
const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: 'yellow',
        textAlign: 'right'
    },
    subHeading: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        color: 'white',
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
});
const globalButtons = StyleSheet.create({
    iconButtonWrapper :{
        marginLeft: 20,
        marginRight: 20,
    },
    iconButton: {
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
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
        backgroundColor: 'white',
        paddingTop: 5,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export { globalStyles, globalButtons, iconStyles }
