import React, {Component} from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import {AsyncStorage} from "react-native";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
            user: null,
            loginDetails: {
                email: '',
                password: '',
                errorMessage: null
            }
        };
    }
    handleLogin = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(this.doLogin);
    }
    doLogin = () => {
        const {email, password} = this.state.loginDetails;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => AsyncStorage.setItem('user',JSON.stringify(response.user), null).then(() => this.handleAccountSetUp(response.user)))
            .catch(error => this.setState({
                loginDetails: {
                    errorMessage: error.message
                }
            }));
    }
    handleAccountSetUp(user) {
        if (user.emailVerified) {
            this.props.navigation.navigate('Lists');
        } else {
            this.fadeIn();
            this.setState({
                loginDetails: {
                    errorMessage:'Please verify your account on the link sent to your registered email.'
                }
            });
        }
    }
    fadeIn() {
        this.state.fadeIn.setValue(0)
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 1,
                duration: 1000,
            }
        ).start(() => this.fadeOut());
    }

    fadeOut() {
        Animated.timing(
            this.state.fadeIn,
            {
                toValue: 0,
                duration: 2000,
            }
        ).start();
    }

    static navigationOptions = headerStyles;
    render() {
        const image = require('../../assets/bg0.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View style={globalStyles.loginPanel}>
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
                            placeholder="Email Address"
                            onChangeText={text => this.setState({loginDetails: {email: text, password: this.state.loginDetails.password}})}
                            value={this.state.loginDetails.email}
                        />
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
                            placeholder="Password"
                            onChangeText={text => this.setState({loginDetails: {email: this.state.loginDetails.email, password: text}})}
                            value={this.state.loginDetails.password}
                        />
                        <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleLogin}>
                            <Text style={globalButtons.loginButtonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUp} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text>
                                New to ShoppingMate? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUp} onPress={() => this.props.navigation.navigate('ResetPassword')}>
                            <Text>
                                Forgotten Password? <Text style={styles.signUpLink}>Reset</Text>
                            </Text>
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
                    <Animated.View style={[styles.error, {opacity: this.state.fadeIn}]}>
                        {this.state.loginDetails.errorMessage &&
                        <Text style={[globalStyles.introText, styles.errorText]}>{this.state.loginDetails.errorMessage}</Text>}
                    </Animated.View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    error: {
        backgroundColor: '#fff',
        height: 75,
        position: 'absolute',
        bottom: 0
    },
    errorText: {
        color: 'red'
    },
    signUp: {
        flex: 1,
        marginTop: 15
    },
    signUpLink: {
        fontWeight: "700",
        color: "#800000",
        fontSize: 15
    }
});
export default connect(null, null)(Login)
