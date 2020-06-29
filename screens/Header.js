import React, { Component } from 'react';
import { Text } from 'react-native';
import {globalStyles} from '../styles/Styles';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: (<Text style={globalStyles.heading}>Shopping Mate</Text>),
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading
    };
    render() {
        return (
            <Text style={globalStyles.heading}>Shopping Mate</Text>
        );
    }
}

