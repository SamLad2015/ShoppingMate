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
import moment from "moment";
import Header from "../Header";
import ItemsService from "../../services/itemsService";
import Profile from "../Profile";
import GetBgImageUrl from "../../configs/asset.config";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";
import MatesService from "../../services/matesService";
import MateProfile from "../mates/MateProfile";

class Lists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow : null,
            mates: []
        };
        this.getMatesList().then(mates => this.setState({mates}));
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
    doCheckLogin = async() => {
        const { navigate } = this.props.navigation;
        try {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                navigate('Mates', {
                    uid: JSON.parse(user).uid
                });
            } else {
                this.showLoginAlert();
            }
        } catch (e) {
            this.showLoginAlert();
        }
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
    async getMatesList() {
        const matesService = new MatesService();
        return await matesService.getMatesFromStorage();
    }
    renderItem = ({item, index}) => {
        const { setList} = this.props;
        const { navigate } = this.props.navigation;
        const mate = _.find(this.state.mates, (m) => {
            return m.lists.indexOf(item.id) > -1;
        });
        let swipeButtons = [{
            component: (
                <TouchableOpacity style={globalButtons.swipeIconButton} onPress={() => this.deleteList(item)}>
                    <Fontisto name='trash'
                              size={iconStyles.size}
                              color='#fff'/>
                </TouchableOpacity>
            ),
            backgroundColor: swipeStyles.green,
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
                backgroundColor: swipeStyles.red,
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
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => this.doCheckLogin()}>
                            <Fontisto name='persons'
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
        paddingLeft: 10,
        borderBottomColor: '#c0c0c0',
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
    list: state.list
});
export default connect(mapStateToProps, {setList, removeList})(Lists)
