import React, { Component } from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <TouchableOpacity>
                    <Icon.Button
                        iconStyle={styles.profileButton}
                        backgroundColor='transparent'
                        size={25}
                        name="user"
                        onPress={() => {
                            this.props.navigation.navigate('Login')
                        }}>
                    </Icon.Button>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    profileButton: {
        color: '#ffffff',
        marginTop: 5,
        marginBottom: 5,
    }
});
