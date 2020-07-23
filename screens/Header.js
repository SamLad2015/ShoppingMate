import React, { Component } from 'react';
import { Image, View } from 'react-native';
import {globalStyles} from "../styles/Styles";

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Image source={require('../assets/icon.png')} style={globalStyles.headerBgImage} />
            </View>
        );
    }
}

