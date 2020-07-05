import React, {Component} from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import {AsyncStorage} from "react-native";

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
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(this.doLogin);
    }
    doLogin = () => {
        const {email, password} = this.state.loginDetails;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((response) => AsyncStorage.setItem('user',JSON.stringify(response.user), null).then(() => this.props.navigation.navigate('Lists')))
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
                    <View style={styles.welcome}>
                        <View style={styles.error}>
                            {this.state.loginDetails.errorMessage &&
                            <Text style={[styles.introText, styles.errorText]}>{this.state.loginDetails.errorMessage}</Text>}
                        </View>
                    </View>
                    <View style={globalStyles.loginPanel}>
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
                        <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleLogin}>
                            <Text style={globalButtons.loginButtonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signUp} onPress={() => this.props.navigation.navigate('Register')}>
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
                                backgroundColor='#fff'
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
    loginTextInput: {
        textAlign: 'right'
    },
    welcome: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    success: {
        flex: 1
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
    }
});
export default connect(null, null)(Login)
