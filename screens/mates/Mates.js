import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, headerStyles, swipeStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeMate} from "../../actions/mates";
import GetBgImageUrl from "../../configs/asset.config";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";
import MateProfile from "./MateProfile";
import FirebaseService from "../../services/firebaseService";
import Loading from "../common/Loading";

class Mates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: null
        }
    }
    static navigationOptions = headerStyles;
    addListToMate = (mateId) => {
        const {mates} = this.props;
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        if (listId > -1) {
            _.find(mates, {id: mateId}).lists.push(listId);
            this.setState({mates});
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
        const { navigate } = this.props.navigation;
        const {mates} = this.props;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl('bg1.jpg')} style={globalStyles.bgImage}>
                    <View style={styles.lists}>
                        <View style={styles.listWrapper}>
                            {!mates.requests && <Loading />}
                            {mates.requests && mates.requests.length > 0 &&
                                <View>
                                    <Text style={styles.title}>Requests Received</Text>
                                    <FlatList data={mates.requests}
                                             keyExtractor={(item) => item.uid.toString()}
                                             renderItem={this.renderItem}
                                    />
                                </View>
                            }
                        </View>
                        <View style={styles.listWrapper}>
                            {!mates.mates && <Loading />}
                            {mates.mates && mates.mates.length > 0 &&
                                <View>
                                    <Text style={styles.title}>Requests Sent</Text>
                                    <FlatList data={mates.mates}
                                                 keyExtractor={(item) => item.uid.toString()}
                                                 renderItem={this.renderItem}
                                    />
                                </View>
                            }
                        </View>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Lists')}>
                            <Fontisto name='check'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => {
                            navigate('AddMate')}}>
                            <Fontisto name='person'
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
    itemRow: {
        flex: 1
    },
    lists: {
        flex: 1,
        width: '100%'
    },
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
        fontSize: 15,
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
const mapStateToProps = state => ({
    mates: state.mates,
    uid: state.uid
});
export default connect(mapStateToProps, {removeMate})(Mates)
