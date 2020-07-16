import React, {PureComponent} from 'react';
import {BarIndicator} from 'react-native-indicators';
import {View, StyleSheet} from "react-native";
import {iconStyles} from "../../styles/Styles";

export default class Loading extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <BarIndicator color='white' size={iconStyles.size} />
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
