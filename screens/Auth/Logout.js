import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import Header from "../Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import {AsyncStorage} from "react-native";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: null,
            email: null
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('user', null).then(user => {
            user = JSON.parse(user);
            this.setState( {
                displayName: user ? user.displayName : null,
                email: user ? user.email : null,
            });
        });
    }
    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            this.setState({displayName : null, email: null});
        });
        AsyncStorage.setItem('user', '', null).then(() => this.props.navigation.navigate('Login'));
    }
    static navigationOptions = headerStyles;
    render() {
        const image = require('../../assets/bg0.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View style={styles.welcome}>
                        <View style={styles.success}>
                            <Text style={[styles.introText, styles.welcomeText]}>Welcome {this.state.displayName || ''}</Text>
                            <Text style={[styles.introText, styles.emailText]}>
                                You are currently registered with Email:
                                <Text style={styles.userEmail}> {this.state.email || ''} </Text>
                                click on Sign Out to log out.
                            </Text>
                        </View>
                    </View>
                    <View style={globalStyles.loginPanel}>
                        <TouchableOpacity style={globalButtons.loginButton} onPress={this.handleLogout}>
                            <Text style={globalButtons.loginButtonText}>Sign Out</Text>
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
    welcome: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    success: {
        flex: 1
    },
    emailText: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 50
    },
    introText: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center'
    },
    welcomeText: {
        color: 'black'
    },
    userEmail: {
        paddingLeft: 5,
        paddingRight: 5,
        color: 'blue'
    }
});
export default connect(null, null)(Logout)
