import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    FlatList,
    AsyncStorage
} from 'react-native';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {globalStyles, globalButtons} from '../styles/Styles';
import * as _ from "lodash";
import ItemsService from "../services/itemsService";
import {setList, setLists} from "../actions/lists";
import moment from "moment";

class Lists extends Component {
    constructor(props) {
        const itemsService = new ItemsService();
        super(props);
    }

    render() {
        const {lists, setList} = this.props;
        const image = require('../assets/bg1.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <Text style={globalStyles.heading}>Shopping List</Text>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(lists.lists, 'createdOn', 'desc')}
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
                                          </TouchableOpacity>
                                      </View>
                                  }
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.redButton}
                                          onPress={() => {
                                              setList(undefined)
                                              navigate('List', {
                                                  listId: -1
                                              })
                                          }}>
                            <Text style={globalButtons.redButtonText}>Add List +</Text>
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
        marginTop: 100,
        marginBottom: 75,
        paddingLeft: 10,
        paddingRight: 10
    },
    listDetails: {
        flex: 1
    },
    listLabel: {
        fontSize: 25,
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
export default connect(mapStateToProps, {setList})(Lists)
