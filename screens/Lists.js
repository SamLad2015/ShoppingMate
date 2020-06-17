import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';

export default class Lists extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Lists',
    };
    render() {
        const image = require('../assets/bg1.jpg');
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}>Shopping List</Text>
                    <Button
                        title="Add Item + "
                        onPress={() => navigate('List')}
                    />
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red',
        position: 'absolute',
        top: 20,
    },
    button: {
        flex: .5,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7,
    }
});
