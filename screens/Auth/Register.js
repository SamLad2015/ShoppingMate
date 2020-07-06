import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import Header from "../Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            email: '',
            password: '',
            errorMessage: null
        };
    }
    handleSignUp = () => {
        const {fullName, email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredentials) => {
                return userCredentials.user.updateProfile({
                    displayName: fullName
                }).then(() => {
                    this.props.navigation.navigate('Login');
                });
            })
            .catch(error => this.setState({
                errorMessage: error.message
            }));
    }
    static navigationOptions = headerStyles;
    render() {
        const image = require('../../assets/bg0.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View style={styles.error}>
                        {this.state.errorMessage &&
                        <Text style={[styles.introText, styles.errorText]}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.regPanel}>
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Full Name"
                            onChangeText={fullName => this.setState({fullName})}
                            value={this.state.fullName}
                        />
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Email Address"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Password"
                            onChangeText={password => this.setState({password})}
                            value={this.state.password}
                        />
                        <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleSignUp}>
                            <Text style={globalButtons.loginButtonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='#fff'
                                size={iconStyles.size}
                                borderRadius={iconStyles.size + 5}
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
    register :{
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    registerText: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black'
    },
    error: {
        flex: 1,
    },
    introText: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center'
    },
    regPanel: {
        position: 'absolute',
        bottom: 100,
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
export default connect(null, null)(Register)
