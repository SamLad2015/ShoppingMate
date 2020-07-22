import React, { Component } from 'react';
import {Animated, AsyncStorage, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {globalStyles, headerStyles} from "../../styles/Styles";
import * as firebase from "firebase";
import {globalButtons, iconStyles} from "../../styles/Styles";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeIn: new Animated.Value(0),
            fadeOut: new Animated.Value(1),
            email: '',
            passwordResetLinkSent: false,
            errorMessage: null
        };
    }
    componentDidMount() {
        AsyncStorage.setItem('user', null, null);
    }
    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({passwordResetLinkSent : true});
        }, (error) => {
            this.fadeIn();
            this.setState({
                errorMessage: error.message
            });
        });
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
                    {!this.state.passwordResetLinkSent && <View style={globalStyles.loginPanel}>
                        <View style={globalStyles.textInputWrapper}>
                            <TextInput
                                autoCapitalize="none"
                                style={[globalStyles.textInput, globalStyles.loginTextInput]}
                                placeholder="Email Address"
                                onChangeText={email => this.setState( {email})}
                                value={this.state.email}
                            />
                            <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                              onPress={() => this.setState({email: ''})}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size - 7}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </View>
                        <View style={[globalStyles.textInputWrapper, globalStyles.buttonWrapper]}>
                            <TouchableOpacity style={[globalButtons.loginButton, {width: 180}]} onPress={this.resetPassword}>
                                <Text style={globalButtons.loginButtonText}>Reset Password</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.errorMessage && <Animated.View style={[globalStyles.textInputWrapper, globalStyles.buttonWrapper, {opacity: this.state.fadeIn}]}>
                            <Text style={[globalStyles.introText, globalStyles.errorText]}>{this.state.errorMessage}</Text>
                        </Animated.View>}
                        {this.state.passwordResetLinkSent && <View style={globalStyles.forgetPasswordPanel}>
                            <View style={globalStyles.success}>
                                <Text style={globalStyles.successText}>
                                    Your reset password link has been emailed to your email
                                    <Text style={globalStyles.userEmail}> {this.state.email} </Text>
                                </Text>
                            </View>
                        </View>}
                    </View>}
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
