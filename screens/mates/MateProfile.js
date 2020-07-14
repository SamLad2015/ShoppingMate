import React, {Component} from 'react';
import {Text, View, StyleSheet} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import CommonHelpers from "../../helpers/commonHelpers";

export default class MateProfile extends Component {
    render() {
        const {mate, isSmall} = this.props;
        return (
            <View style={isSmall ? styles.smallMateRow : styles.mateRow}>
                <View style={isSmall ? styles.smallMateIcon : styles.mateIcon}>
                    <Fontisto name={mate.gender || 'male'} size={isSmall ? 15 : 25} color='#fff'/>
                </View>
                <View style={isSmall ? styles.smallListDetails : styles.listDetails}>
                    <Text style={isSmall ? styles.listLabelSmall : styles.listLabel}>
                        {isSmall ? CommonHelpers.getShortDisplayName(mate.name) : mate.name}
                    </Text>
                    {!isSmall && mate.lists && mate.lists.length > 0 &&
                    <Text style={styles.listCountLabel}>{mate.lists.length}</Text>}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mateRow: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
    smallMateRow: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
        alignItems : 'flex-start',
        justifyContent: 'flex-start'
    },
    mateIcon: {
        flex: 0.1
    },
    smallMateIcon: {
        marginLeft: 15,
    },
    listDetails: {
        flex: 0.9,
        flexDirection: 'row',
        marginLeft: 15
    },
    smallListDetails: {
        marginLeft: 10
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    listLabelSmall: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
    },
    listCountLabel: {
        fontSize: 12,
        color: '#000',
        marginTop: 2,
        marginLeft: 10,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingLeft: 0,
        paddingTop: 1,
        height: 20,
        width: 20,
        backgroundColor: '#228B22',
        textAlign: 'center'
    }
});
