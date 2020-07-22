import React, {Component} from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated, AsyncStorage} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import {connect} from "react-redux";
import * as firebase from "firebase";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";

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
        firebase.auth().signInWithEmailAndPassword(email.trim(), password)
            .then((response) => AsyncStorage.setItem('user',JSON.stringify(response.user), null)
                .then(() => this.handleAccountSetUp(response.user)))
            .catch(error => {
                this.fadeIn();
                this.setState({
                loginDetails: {
                    errorMessage: error.message
                }
            })});
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
                duration: 3000,
            }
        ).start(() => {
            this.setState({
                loginDetails: {
                    errorMessage: null
                }
            });
        });
    }

    static navigationOptions = headerStyles;
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={globalStyles.loginPanel}>
                        <View style={globalStyles.textInputWrapper}>
                            <TextInput
                                autoCapitalize="none"
                                style={[globalStyles.textInput, globalStyles.loginTextInput]}
                                placeholder="Email Address"
                                onChangeText={text => this.setState({loginDetails: {email: text, password: this.state.loginDetails.password}})}
                                value={this.state.loginDetails.email}
                            />
                            <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                              onPress={() => this.setState({loginDetails:
                                                      {email: '', password: this.state.loginDetails.password}
                                              })}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size - 7}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.textInputWrapper}>
                            <TextInput
                                secureTextEntry
                                autoCapitalize="none"
                                style={[globalStyles.textInput, globalStyles.loginTextInput]}
                                placeholder="Password"
                                onChangeText={text => this.setState({loginDetails: {email: this.state.loginDetails.email, password: text}})}
                                value={this.state.loginDetails.password}>
                            </TextInput>
                            <Text style={[globalStyles.bottomText, globalStyles.signUpWrapper]}
                                  onPress={() => this.props.navigation.navigate('ResetPassword')}>
                                <Text style={styles.signUpLink}>Forgot?</Text>
                            </Text>
                        </View>
                        <View style={[globalStyles.textInputWrapper, globalStyles.buttonWrapper]}>
                            <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleLogin}>
                                <Text style={globalButtons.loginButtonText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.loginDetails.errorMessage && <Animated.View style={[globalStyles.textInputWrapper, globalStyles.buttonWrapper, {opacity: this.state.fadeIn}]}>
                            <Text style={[globalStyles.introText, globalStyles.errorText]}>{this.state.loginDetails.errorMessage}</Text>
                        </Animated.View>}
                        <TouchableOpacity style={styles.signUp} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.bottomText}>
                                New to ShoppingMate? <Text style={styles.signUpLink}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Lists')}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    signUp: {
        flex: 1,
        marginTop: 20,
        alignSelf: 'center'
    },
    signUpLink: {
        fontWeight: "700",
        color: "pink",
        fontSize: 15
    },
    bottomText: {
        color: '#fff'
    }
});
export default connect(null, null)(Login)
