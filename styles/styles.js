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
});
export { globalStyles, globalButtons }
