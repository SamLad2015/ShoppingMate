import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {globalStyles} from '../styles/Styles';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View><Text style={globalStyles.heading}>Shopping Mate</Text></View>
        );
    }
}

