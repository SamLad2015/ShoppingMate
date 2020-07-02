import React, { Component } from 'react';
import {ImageBackground, TextInput, TouchableOpacity, View} from 'react-native';
import {globalButtons, globalStyles, iconStyles} from '../styles/Styles';
import Header from "./Header";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetails: {
                username: '',
                password: ''
            }
        };
    }
    static navigationOptions = {
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading,
        headerBackTitle: null,
        headerRight: () => <Header/>
    };
    render() {
        const image = require('../assets/bg1.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View>
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="User Name"
                            onChangeText={text => this.setState({loginDetails: {username: text, password: this.state.loginDetails.password}})}
                            value={this.state.loginDetails.username}
                        />
                        <TextInput
                            style={globalStyles.textInput}
                            placeholder="Password"
                            onChangeText={text => this.setState({loginDetails: {username: this.state.loginDetails.username, password: text}})}
                            value={this.state.loginDetails.password}
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='green'
                                backgroundColor='transparent'
                                size={iconStyles.size}
                                name="check"
                                onPress={() => {
                                    navigate('Lists')
                                }}>
                            </Icon.Button>
                        </TouchableOpacity>
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
export default connect(null, null)(Login)
