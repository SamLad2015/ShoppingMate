import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {globalStyles} from "../styles/Styles";
import ActivityIndicator from "react-native-web/dist/exports/ActivityIndicator";
import * as firebase from 'firebase';


export default class LoadingIndicator extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
           const { navigate } = this.props.navigation;
           navigate(user ? "Lists" : "Login");
        });
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <Text>Loading...</Text>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
}

