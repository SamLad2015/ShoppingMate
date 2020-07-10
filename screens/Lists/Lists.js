import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    FlatList,
    Button
} from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, subHeaderStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeList, setList} from "../../actions/lists";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "../Header";
import ItemsService from "../../services/itemsService";
import Profile from "../Profile";
import GetBgImageUrl from "../../configs/asset.config";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";

class Lists extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) =>  ({
        headerTitle: () => <Profile navigation={navigation}/>,
        headerStyle: { backgroundColor: '#640E27' },
        headerTitleStyle: subHeaderStyles,
        headerRight: () => <Header/>
    });
    sendList(list) {
        const { navigate } = this.props.navigation;
        navigate('Mates', {
            listId: list.id
        })
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
    renderItem = ({item, index}) => {
        const { navigate } = this.props.navigation;
        let swipeButtons = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteList(item) }
        }];
        if (item.items && item.items.length > 0) {
            const sendButton = {
                text: 'Send',
                backgroundColor: '#228B22',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.sendList(item) }
            };
            swipeButtons.unshift(sendButton);
        }
        return (
            <Swipeout right={swipeButtons}
                      style={styles.itemRow}
                      autoClose='true'
                      backgroundColor= 'transparent'>
                <View>
                    <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                        setList(item)
                        navigate('List', {
                            listId: item.id
                        })
                    }}>
                        <View style={styles.listDetails}>
                            <View>
                                <Text style={[globalStyles.listLabel, styles.listLabel]}>{item.label}</Text>
                                <Text style={styles.dateTimeStampLabel}>{this.getDateLabel(item.createdOn)}</Text>
                            </View>
                            <View>
                                {item.items && item.items.length > 0 && <Text style={styles.itemsCountLabel}>{item.items.length}</Text>}
                            </View>
                        </View>
                    </TouchableOpacity>
               </View>
            </Swipeout>
                );
    }
    render() {
        const {lists, setList} = this.props;
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(lists.lists, 'createdOn', 'desc')}
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
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => {
                            setList(undefined)
                            navigate('Mates', {
                                listId: -1
                            })}}>
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
        paddingLeft: 20,
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
        paddingBottom: 5
    },
    dateTimeStampLabel: {
        fontSize: 12,
        color: 'yellow',
        fontStyle: 'italic'
    },
    itemsCountLabel: {
        fontSize: 12,
        color: '#000',
        marginTop: 12,
        marginLeft: 10,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingLeft: 0,
        paddingTop: 2,
        height: 20,
        width: 20,
        backgroundColor: '#00FFEF',
        textAlign: 'center'
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
    list: state.list
});
export default connect(mapStateToProps, {setList, removeList})(Lists)
