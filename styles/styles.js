import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
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
        flex: .5,
        justifyContent: 'center',
    },
    redButtonText: {
        backgroundColor: 'red',
        color: '#fff',
        fontWeight: 'bold',
        padding: 10,
        fontSize: 20,
        borderRadius: 5
    },
});
export { globalStyles, globalButtons }
