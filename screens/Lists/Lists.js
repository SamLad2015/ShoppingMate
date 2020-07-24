import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    FlatList,
    Alert,
    AsyncStorage
} from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, subHeaderStyles, swipeStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeList, setList} from "../../actions/lists";
import {setUser, setMates, setRequests, setFriends} from "../../actions/mates";
import moment from "moment";
import Header from "../Header";
import ItemsService from "../../services/itemsService";
import Profile from "../Profile";
import GetBgImageUrl from "../../configs/asset.config";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";
import MateProfile from "../mates/MateProfile";
import FirebaseService from "../../services/firebaseService";
import Loading from "../common/Loading";

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow : null,
            matesLoading: false
        };
    }
    static navigationOptions = ({ navigation }) =>  ({
        headerTitle: () => <Profile navigation={navigation}/>,
        headerStyle: { backgroundColor: '#640E27' },
        headerTitleStyle: subHeaderStyles,
        headerRight: () => <Header/>
    });
    showLoginAlert = () => {
        const title = 'Please Log-in';
        const message = 'Please Log in to view mates';
        Alert.alert(title, message);
    }
    checkUserUid = async() => {
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                return JSON.parse(user);
            } else {
                return null;
            }
        } catch (e) {
            return null;
        }
    }
    goToMates = async() => {
        const {setUser} = this.props;
        const { navigate } = this.props.navigation;
        this.checkUserUid().then((user) => {
            if (user && user.uid) {
                setUser(user.uid);
                this.getMates(user.uid).then(() => {
                    navigate('Mates');
                });
            } else {
                this.showLoginAlert();
            }
        });
    }
    sendList(listId) {
        const { navigate } = this.props.navigation;
        this.setState({closed: false});
        this.onSwipeClose(listId);
        navigate('Mates', {
            listId: listId
        });
    }
    deleteList(list) {
        const itemsService = new ItemsService();
        const { removeList } = this.props;
        itemsService.deleteListFromStorage(list).then(() => {
            removeList(list);
        });
    }
    getDateLabel = (createdOn) => {
        const dateDiff = moment().diff(moment(createdOn), 'days');
        if (dateDiff === 0) {
            return 'Today at ' + moment(createdOn).format('hh:mm A');
        }
        if (dateDiff === 1) {
            return 'Yesterday at ' + moment(createdOn).format('hh:mm A');
        }
       return moment(createdOn).format('ddd, DD MMM YYYY hh:mm A');
    }
    onSwipeOpen = (rowId) => {
        this.setState({ activeRow: rowId });
    }
    onSwipeClose = (rowId) => {
        if (rowId === this.state.activeRow) {
            this.setState({ activeRow: null });
        }
    }
    getMates(uid) {
        const promises = this.getMatesRequests(uid);
        this.setState({matesLoading : true});
        const {setMates, setRequests, setFriends} = this.props;
        return promises.then(matesPromises => {
            this.setState({
                friends:matesPromises[1],
                invites: matesPromises[2],
                requests: matesPromises[0],
                matesLoading: false
            });
            setFriends(matesPromises[1]);
            setMates(matesPromises[2]);
            setRequests(matesPromises[0]);
        });
    }
    async getMatesRequests(uid) {
        const promises = [];
        const fbService = new FirebaseService();
        promises.push(await fbService.getInvites(uid));
        promises.push(await fbService.getMates(uid));
        promises.push(await fbService.getRequests(uid));
        return promises;
    }
    renderItem = ({item, index}) => {
        const { setList} = this.props;
        const { navigate } = this.props.navigation;
        const mate = null;
        let swipeButtons = [{
            component: (
                <TouchableOpacity style={globalButtons.swipeIconButton} onPress={() => this.deleteList(item)}>
                    <Fontisto name='trash'
                              size={iconStyles.size}
                              color='#fff'/>
                </TouchableOpacity>
            ),
            backgroundColor: swipeStyles.red,
            underlayColor: swipeStyles.underlayColor
        }];
        if (item.items && item.items.length > 0) {
            const sendButton = {
                component: (
                    <TouchableOpacity style={globalButtons.swipeIconButton} onPress={() => this.sendList(item.id)}>
                        <Fontisto name='share-a'
                                  size={iconStyles.size}
                                  color='#fff'/>
                    </TouchableOpacity>
                ),
                backgroundColor: swipeStyles.green,
                underlayColor: swipeStyles.underlayColor
            };
            swipeButtons.unshift(sendButton);
        }
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
                      <View>
                         <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                                setList(item);
                                navigate('List', {
                                    listId: item.id
                                })
                         }}>
                            <View style={styles.listDetails}>
                                <View>
                                    <Text style={[styles.itemsCountLabel, !item.items || item.items.length === 0 ? styles.noItemsCountLabel : '']}>
                                        {item.items ? item.items.length : 0}
                                    </Text>
                                </View>
                               <View>
                                  <Text style={[globalStyles.listLabel, styles.listLabel]}>{item.label}</Text>
                                  <Text style={styles.dateTimeStampLabel}>{this.getDateLabel(item.createdOn)}</Text>
                               </View>
                                {mate && <MateProfile mate={mate} isSmall={true} />}
                            </View>
                         </TouchableOpacity>
                      </View>
            </Swipeout>
                );
    }
    render() {
        const { navigate } = this.props.navigation;
        const {lists, setList} = this.props;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(lists.lists, 'createdOn', 'desc')}
                                  keyExtractor={item => item.id.toString()}
                                  renderItem={this.renderItem}
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => {
                            setList(undefined)
                            navigate('List', {
                                listId: -1
                            })}}>
                            <Fontisto name='shopping-bag-1'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.bottomButton}
                                          onPress={() => this.goToMates()}>
                            {!this.state.matesLoading && <Fontisto name='persons'
                                          size={iconStyles.size}
                                          color='#fff'/>}
                            {this.state.matesLoading && <Loading />}
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemRow: {
        paddingLeft: 10,
        borderBottomColor: '#000',
        borderBottomWidth: .5
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginBottom: 75
    },
    listDetails: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    listLabel: {
        fontSize: 17,
        color: '#fff',
        paddingBottom: 5,
        marginTop: 5
    },
    dateTimeStampLabel: {
        fontSize: 12,
        color: 'yellow',
        fontStyle: 'italic',
        marginBottom: 5
    },
    itemsCountLabel: {
        fontSize: 25,
        color: '#000',
        marginTop: 5,
        marginRight: 10,
        fontWeight: 'bold',
        borderRadius: 22,
        paddingLeft: 0,
        paddingTop: 4,
        height: 44,
        width: 44,
        backgroundColor: '#00FFEF',
        textAlign: 'center'
    },
    noItemsCountLabel: {
        backgroundColor: '#666666'
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
    mates: state.mates,
    list: state.list,
    uid: state.uid
});
export default connect(mapStateToProps, {setList, removeList, setUser, setMates, setRequests, setFriends})(Lists)
