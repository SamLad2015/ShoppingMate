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
import {globalStyles, globalButtons, iconStyles} from '../styles/Styles';
import * as _ from "lodash";
import {removeList, setList} from "../actions/lists";
import moment from "moment";
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from "./Header";
import ItemsService from "../services/itemsService";

class Lists extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: () => <Header/>,
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading,
    };
    deleteList(list) {
        const itemsService = new ItemsService();
        const { removeList } = this.props;
        itemsService.deleteListFromStorage(list).then(() => {
            removeList(list);
        });
    }
    render() {
        const {lists, setList} = this.props;
        const image = require('../assets/bg1.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(lists.lists, 'createdOn', 'desc')}
                                  keyExtractor={(item) => item.id.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.itemRow}>
                                          <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                                                                setList(item)
                                                                navigate('List', {
                                                                    listId: item.id
                                                                })
                                                            }}>
                                              <View style={styles.listDetails}>
                                                  <Text style={[globalStyles.listLabel, styles.listLabel]}>{item.label}</Text>
                                                  <Text style={styles.dateTimeStampLabel}>{moment(item.createdOn).format('ddd, DD MMM YYYY hh:mm A')}</Text>
                                              </View>
                                              <View style={styles.deleteIcon}>
                                                  <Icon.Button
                                                      iconStyle={globalButtons.deleteIconButton}
                                                      color='white'
                                                      backgroundColor='transparent'
                                                      size={25}
                                                      name="minus-circle"
                                                      onPress={() => this.deleteList(item)}>
                                                  </Icon.Button>
                                              </View>
                                          </TouchableOpacity>
                                      </View>
                                  }
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='transparent'
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
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingBottom: 10,
        marginBottom: 15,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
        backgroundColor: '#000',
        borderRadius: 10
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 20,
        marginBottom: 75,
        paddingLeft: 10,
        paddingRight: 10
    },
    listDetails: {
        flex: 0.8
    },
    deleteIcon: {
        flex: 0.2
    },
    listLabel: {
        fontSize: 15,
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
