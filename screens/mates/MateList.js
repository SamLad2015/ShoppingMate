import React, { Component } from 'react';
import Loading from "../common/Loading";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalButtons, globalStyles, iconStyles, swipeStyles} from "../../styles/Styles";
import Fontisto from "react-native-vector-icons/Fontisto";
import Swipeout from "react-native-swipeout";
import MateProfile from "./MateProfile";
import FirebaseService from "../../services/firebaseService";

export default class MateList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: null
        }
    }
    deleteMate = (mate) => {
        const {removeMate} = this.props;
        const fbService = new FirebaseService();
        fbService.removeItem('mates', mate.id).then(() => removeMate(mate.uid));
    }
    onSwipeOpen = (rowId) => {
        this.setState({ activeRow: rowId });
    }
    onSwipeClose = (rowId) => {
        if (rowId === this.state.activeRow) {
            this.setState({ activeRow: null });
        }
    }
    renderItem = ({item, index}) => {
        const swipeButtons = [{
            component: (
                <TouchableOpacity style={globalButtons.swipeIconButton} onPress={() => this.deleteMate(item)}>
                    <Fontisto name='trash'
                              size={iconStyles.size}
                              color='#fff'/>
                </TouchableOpacity>
            ),
            backgroundColor: swipeStyles.red,
            underlayColor: swipeStyles.underlayColor,
            autoClose: true
        }];
        return (
            <Swipeout right={swipeButtons}
                      style={styles.itemRow}
                      close={this.state.activeRow!==item.id}
                      autoClose={true}
                      onOpen={() => this.onSwipeOpen(item.id)}
                      onClose={() => this.onSwipeClose(item.id)}
                      rowId={item.id}
                      sectionId={1}
                      backgroundColor= 'transparent'>
                <View style={styles.matesRow}>
                    <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                        this.addListToMate(item.id);
                    }}>
                        <View style={styles.mates}>
                            <View style={globalStyles.mateProfile}>
                                <MateProfile mate={item} isSmall={false} />
                            </View>
                            {!item.approved && <View style={styles.invitationStatus}>
                                <Text style={!item.approved && styles.invitationPending}>Pending</Text>
                            </View>}
                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeout>
        );
    }
    render() {
        const {mates} = this.props;
        return (
            <View style={styles.listWrapper}>
                {!mates && <Loading />}
                {mates && mates.length > 0 &&
                <View>
                    <Text style={styles.title}>Requests Received</Text>
                    <FlatList data={mates}
                              keyExtractor={(item) => item.uid.toString()}
                              renderItem={this.renderItem}
                    />
                </View>
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    listWrapper: {
        width: '100%'
    },
    title: {
        fontSize: 17,
        padding: 20,
        color: 'yellow',
        fontWeight: 'bold'
    },
    cancelMate: {
        marginTop: 5
    },
    invitationStatus: {
        flex: 0.3,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 20,
        alignContent: 'flex-end'
    },
    invitationPending: {
        color: 'orange',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    matesRow: {
        borderTopColor: '#000',
        borderTopWidth: .5,
        borderBottomColor: '#000',
        borderBottomWidth: .5
    },
    mates: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 20
    }
});

