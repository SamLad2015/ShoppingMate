import React, { Component } from 'react';
import {AsyncStorage, ImageBackground, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {globalStyles} from "../../styles/Styles";
import * as firebase from "firebase";
import {globalButtons, iconStyles} from "../../styles/Styles";
import Icon from "react-native-vector-icons/FontAwesome";

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            passwordResetLinkSent: false
        };
    }
    componentDidMount() {
        AsyncStorage.setItem('user', null, null);
    }
    resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            this.setState({passwordResetLinkSent : true});
        });
    }
    render() {
        const image = require('../../assets/bg0.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    {!this.state.passwordResetLinkSent && <View style={globalStyles.loginPanel}>
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
                            placeholder="Email Address"
                            onChangeText={email => this.setState( {email: email})}
                            value={this.state.email}
                        />
                        <TouchableOpacity style={globalButtons.loginButton} onPress={this.resetPassword}>
                            <Text style={globalButtons.loginButtonText}>Reset Password</Text>
                        </TouchableOpacity>
                    </View>}
                    {this.state.passwordResetLinkSent && <View style={globalStyles.loginPanel}>
                        <View style={globalStyles.success}>
                            <Text style={[globalStyles.introText, globalStyles.emailText]}>
                                Your reset password link has been emailed to your email
                                <Text style={globalStyles.userEmail}> {this.state.email} </Text>
                            </Text>
                        </View>
                    </View>}
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
