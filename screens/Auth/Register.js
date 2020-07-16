import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
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
            .catch(error => this.setState({
                errorMessage: error.message
            }));
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
        fbService.addItem('users', userToAdd)
    }
    static navigationOptions = headerStyles;
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.error}>
                        {this.state.errorMessage &&
                        <Text style={[globalStyles.introText, styles.errorText]}>{this.state.errorMessage}</Text>}
                    </View>
                    <View style={styles.regPanel}>
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
                            placeholder="Full Name"
                            onChangeText={fullName => this.setState({fullName})}
                            value={this.state.fullName}
                        />
                        <TextInput
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
                            placeholder="Email Address"
                            onChangeText={email => this.setState({email})}
                            value={this.state.email}
                        />
                        <TextInput
                            secureTextEntry
                            autoCapitalize="none"
                            style={[globalStyles.textInput, globalStyles.loginTextInput]}
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
    regPanel: {
        position: 'absolute',
        bottom: 80,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    }
});
export default connect(null, null)(Register)
