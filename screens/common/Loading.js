import React, {PureComponent} from 'react';
import {BarIndicator} from 'react-native-indicators';
import {View, StyleSheet} from "react-native";

export default class Loading extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <BarIndicator color='white' />
            </View>
        );
    }
}
const styles = StyleSheet.create({
   container: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }
});
