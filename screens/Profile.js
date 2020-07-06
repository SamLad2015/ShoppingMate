import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, View, AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: null
        }
    }
    componentDidMount() {
        const {navigation} = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            AsyncStorage.getItem('user', null).then((user) => {
                this.setState({displayName: user ? JSON.parse(user).displayName.split(' ')[0] : null});
            });
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    handleRedirect = () => {
        const {navigate} = this.props.navigation;
        if (this.state.displayName) {
            navigate('Logout');
        } else {
            navigate('Login');
        }
    }
    render() {
        return (
            <View style={styles.profileView}>
                <TouchableOpacity style={styles.profileViewButton}>
                    <Icon.Button
                        iconStyle={this.state.displayName ? styles.profileButtonActive : styles.profileButton}
                        backgroundColor='#800000'
                        size={25}
                        name="user"
                        onPress={this.handleRedirect}>
                        {this.state.displayName || 'Login'}
                    </Icon.Button>
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
        color: '#ffffff'
    },
    profileButtonActive: {
        color: '#83f52c'
    },
    profileName : {
        color: '#ffffff'
    }
});
