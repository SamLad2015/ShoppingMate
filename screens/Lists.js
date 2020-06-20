import React, { Component } from 'react';
import {StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity} from 'react-native';
import {setItems} from "../actions/items";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {globalStyles, globalButtons} from '../styles/Styles';

class Lists extends Component {
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
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <Text style={globalStyles.heading}>Shopping List</Text>
                    <TouchableOpacity style={globalButtons.redButton}
                        onPress={() => navigate('List')}>
                        <Text style={globalButtons.redButtonText}> Add List +</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    items: state.items,
});

export default connect(mapStateToProps, null)(Lists)
