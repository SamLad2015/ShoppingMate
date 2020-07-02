import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {globalButtons, globalStyles, iconStyles} from '../styles/Styles';
import Header from "./Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                username: '',
                password: ''
            }
        };
    }
    static navigationOptions = {
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading,
        headerBackTitle: null,
        headerRight: () => <Header/>
    };
    render() {
        const image = require('../assets/bg0.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View style={styles.loginPanel}>
                        <TextInput
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="User Name"
                            onChangeText={text => this.setState({loginDetails: {username: text, password: this.state.loginDetails.password}})}
                            value={this.state.loginDetails.username}
                        />
                        <TextInput
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Password"
                            onChangeText={text => this.setState({loginDetails: {username: this.state.loginDetails.username, password: text}})}
                            value={this.state.loginDetails.password}
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='green'
                                backgroundColor='transparent'
                                size={iconStyles.size}
                                name="check"
                                onPress={() => {
                                    navigate('Lists')
                                }}>
                            </Icon.Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='transparent'
                                size={iconStyles.size}
                                name="remove"
                                onPress={() => {
                                    navigate('Lists')
                                }}>
                            </Icon.Button>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    loginPanel: {
        position: 'absolute',
        bottom: 120,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    loginTextInput: {
        textAlign: 'right'
    }
});
export default connect(null, null)(Login)
