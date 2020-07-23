import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text, Animated} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import {connect} from "react-redux";
import * as firebase from "firebase";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";
import FirebaseService from "../../services/firebaseService";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
            fullName: '',
            email: '',
            password: '',
            errorMessage: null
        };
    }
    handleSignUp = () => {
        const {fullName, email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
            .then((userCredentials) => {
                return userCredentials.user.updateProfile({
                    displayName: fullName.trim()
                }).then(() => this.handleAccountSetUp(userCredentials.user));
            })
            .catch(error => {
                this.fadeIn();
                this.setState({
                errorMessage: error.message
            })});
    }
    handleAccountSetUp(user) {
        user.sendEmailVerification().then(() => {
            this.addUserToFbDb(user);
            this.props.navigation.navigate('Login');
        });
    }
    addUserToFbDb(user) {
        const userToAdd = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            gender: 'male',
            emailVerified: false
        }
        const fbService = new FirebaseService();
        fbService.addItem('users', user.uid, userToAdd);
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
                errorMessage: null
            });
        });
    }
    static navigationOptions = headerStyles;
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    {this.state.errorMessage && <Animated.View style={[globalStyles.errorPanel, {opacity: this.state.fadeIn}]}>
                        <Text style={[globalStyles.introText, globalStyles.errorText]}>{this.state.errorMessage}</Text>
                    </Animated.View>}
                    <View style={globalStyles.loginPanel}>
                        <View style={globalStyles.textInputWrapper}>
                            <TextInput
                                autoCapitalize="none"
                                style={[globalStyles.textInput, globalStyles.loginTextInput]}
                                placeholder="Full Name"
                                onChangeText={fullName => this.setState({fullName})}
                                value={this.state.fullName}
                            />
                            <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                              onPress={() => this.setState({fullName: ''})}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size - 7}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyles.textInputWrapper}>
                            <TextInput
                                autoCapitalize="none"
                                style={[globalStyles.textInput, globalStyles.loginTextInput]}
                                placeholder="Email Address"
                                onChangeText={email => this.setState({email})}
                                value={this.state.email}
                            />
                            <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                              onPress={() => this.setState({email: ''})}>
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
                                onChangeText={password => this.setState({password})}
                                value={this.state.password}
                            />
                            <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                              onPress={() => this.setState({password: ''})}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size - 7}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </View>
                        <View style={[globalStyles.textInputWrapper, globalStyles.buttonWrapper]}>
                            <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleSignUp}>
                                <Text style={globalButtons.loginButtonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Login')}>
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
    }
});
export default connect(null, null)(Register)
