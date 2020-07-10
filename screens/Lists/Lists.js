import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground,
    FlatList
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

class Lists extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) =>  ({
        headerTitle: () => <Profile navigation={navigation}/>,
        headerStyle: { backgroundColor: '#800000' },
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
        const swipeButtons = [{
                text: 'Send',
                backgroundColor: '#228B22',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.sendList(item) }
            },{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteList(item) }
        }];
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
                            <Text style={[globalStyles.listLabel, styles.listLabel]}>{item.label}</Text>
                            <Text style={styles.dateTimeStampLabel}>{this.getDateLabel(item.createdOn)}</Text>
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
                                  keyExtractor={(item) => item.id.toString()}
                                  renderItem={this.renderItem}
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='#fff'
                                borderRadius={iconStyles.size + 5}
                                size={iconStyles.size}
                                name="shopping-basket"
                                onPress={() => {
                                    setList(undefined)
                                    navigate('List', {
                                        listId: -1
                                    })
                                }}>
                            </Icon.Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='#fff'
                                borderRadius={iconStyles.size + 5}
                                size={iconStyles.size}
                                name="users"
                                onPress={() => {
                                    setList(undefined)
                                    navigate('Mates', {
                                        listId: -1
                                    })
                                }}>
                            </Icon.Button>
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
        marginBottom: 15,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: .5
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 20,
        marginBottom: 75
    },
    listDetails: {
        flex: 1,
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
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
    list: state.list
});
export default connect(mapStateToProps, {setList, removeList})(Lists)
