import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {globalButtons, globalStyles, iconStyles} from '../styles/Styles';
import Header from "./Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                email: '',
                password: '',
                errorMessage: null
            }
        };
    }
    handleLogin = () => {
        const {email, password} = this.state.loginDetails;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Lists'))
            .catch(error => this.setState({
            loginDetails: {errorMessage: error.message}
        }));
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
                    <View style={styles.welcome}>
                        <View style={styles.success}>
                            <Text style={[styles.introText, styles.welcomeText]}>Welcome</Text>
                        </View>
                        <View style={styles.error}>
                            {this.state.loginDetails.errorMessage &&
                            <Text style={[styles.introText, styles.errorText]}>{this.state.loginDetails.errorMessage}</Text>}
                        </View>
                    </View>
                    <View style={styles.loginPanel}>
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Email Address"
                            onChangeText={text => this.setState({loginDetails: {email: text, password: this.state.loginDetails.password}})}
                            value={this.state.loginDetails.email}
                        />
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            style={[globalStyles.textInput, styles.loginTextInput]}
                            placeholder="Password"
                            onChangeText={text => this.setState({loginDetails: {email: this.state.loginDetails.email, password: text}})}
                            value={this.state.loginDetails.password}
                        />
                        <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUp}>
                            <Text>
                                New to ShoppingMate? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
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
    },
    welcome: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    success: {
        flex: 1,
        textAlign: 'center'
    },
    error: {
        flex: 1,
    },
    introText: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center'
    },
    welcomeText: {
        color: 'green'
    },
    errorText: {
        color: 'red'
    },
    signUp: {
        flex: 1,
        marginTop: 32
    },
    signUpLink: {
        fontWeight: "700",
        color: "#E9446A",
        fontSize: 15
    },
    loginButton: {
        flex: 1,
        marginTop: 32,
        marginHorizontal: 30,
        backgroundColor: "#333",
        borderRadius: 4,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    loginButtonText: {
        color: '#FFF',
        fontSize: 20,
        padding: 20
    }
});
export default connect(null, null)(Login)
