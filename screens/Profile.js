import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, View, AsyncStorage} from 'react-native';
import MateProfile from "./mates/MateProfile";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {gender: null, name: 'Login'}
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('user', null).then((user) => {
                this.setState({user: user ? JSON.parse(user) : {gender: null, name: 'Login'}});
            });
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    handleRedirect = () => {
        const {navigate} = this.props.navigation;
        if (this.state.user.name === 'Login') {
            navigate('Login');
        } else {
            navigate('Logout');
        }
    }
    render() {
        return (
            <View style={styles.profileView}>
                <TouchableOpacity style={styles.profileViewButton} onPress={this.handleRedirect}>
                    <MateProfile mate={this.state.user} isSmall={false} />
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    profileView: {
        flex:1,
        width:'60%'
    },
    profileViewButton :{
        flex:1
    },
    profileButton: {
        color: '#7a1130'
    },
    profileButtonActive: {
        color: '#4d0000'
    },
    profileName : {
        color: '#ffffff'
    }
});
