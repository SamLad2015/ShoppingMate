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
                <TouchableOpacity>
                    <Icon.Button
                        iconStyle={styles.profileButton}
                        backgroundColor='transparent'
                        size={25}
                        name="user"
                        onPress={this.handleRedirect}>
                        {this.state.displayName}
                    </Icon.Button>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    profileView: {
        flex:1
    },
    profileButton: {
        color: '#ffffff',
        marginTop: 5,
        marginBottom: 5,
    },
    profileName : {
        color: '#ffffff'
    }
});
