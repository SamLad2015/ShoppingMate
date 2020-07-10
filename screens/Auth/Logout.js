import React, { Component } from 'react';
import {ImageBackground, StyleSheet, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {globalButtons, globalStyles, headerStyles, iconStyles} from '../../styles/Styles';
import Header from "../Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import {AsyncStorage} from "react-native";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";

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
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.welcome}>
                        <View style={globalStyles.success}>
                            <Text style={[globalStyles.introText, styles.welcomeText]}>Welcome {this.state.displayName || ''}</Text>
                            <Text style={[globalStyles.introText, globalStyles.emailText]}>
                                You are currently registered with Email:
                                <Text style={globalStyles.userEmail}> {this.state.email || ''} </Text>
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
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Lists')}>
                            <Fontisto name='close-a'
                                      size={iconStyles.size}
                                      color='#fff'/>
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
        position: 'absolute',
        bottom: 170
    },
    welcomeText: {
        color: '#fff'
    }
});
export default connect(null, null)(Logout)
