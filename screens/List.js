import React, { Component }  from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {addList} from "../actions/lists";
import {connect} from "react-redux";
import {globalStyles, globalButtons} from '../styles/Styles';
import moment from 'moment';
import ItemsService from "../services/itemsService";

class List extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        this.state = {
            list: {
                id: -1,
                label: 'List: ' + moment().format('DDMMYYYY'),
                items: []
            }
        };
        if (listId >= 0) {
            this.getList(listId).then(list => this.setState({list: list}));
        }
    }
    static navigationOptions = {
        title: 'List',
    };
    onChangeCount = (item, step) => {
        if (step === 'incr') {
            item.count += 1;
        } else {
            item.count -= 1;
        }
    }
    async getList(listId) {
        const itemsService = new ItemsService();
        return  await itemsService.getListFromStorage(listId);
    }
    saveList = () => {
        const itemsService = new ItemsService();
        const { navigate } = this.props.navigation;
        const { addList } = this.props;
        itemsService.saveListIntoStorage({
            id: this.state.list.id,
            label: this.state.list.label,
            items: this.props.lists.list ? this.props.lists.list.items: []
        }).then(addedList => {
            addList(addedList);
            navigate('Lists');
        });
    }
    render() {
        const { lists } = this.props;
        const list = lists && lists.list ? lists.list : this.state.list;
        const { navigate } = this.props.navigation;
        return (
            <View style={[globalStyles.container, styles.container]}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.setState({list: {id: -1, label: text}})}
                    value={this.state.list.label}
                />
                <View style={globalStyles.listWrapper}>
                    <FlatList data={list.items || []}
                              renderItem={({item}) =>
                                  <View style={globalStyles.itemRow}>
                                      <View style={globalButtons.counterButtonWrapper}>
                                          <Text style={globalStyles.listLabel}>{item.label}</Text>
                                      </View>
                                      <View style={globalButtons.counterButtonWrapper}>
                                          <TouchableOpacity
                                              onPress={this.onChangeCount(item, 'incr')}>
                                              <Text style={globalButtons.counterButtonText}>-</Text>
                                          </TouchableOpacity>
                                          <Text style={globalButtons.counterButtonText}>{item.count || 1}</Text>
                                          <TouchableOpacity
                                              onPress={this.onChangeCount(item, 'decr')}>
                                              <Text style={globalButtons.counterButtonText}>+</Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              }
                    />
                </View>
                <View style={globalButtons.bottomButtonsWrapper}>
                    <TouchableOpacity style={globalButtons.redButton}
                                      onPress={() => this.saveList()}>
                        <Text style={globalButtons.redButtonText}>Save List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalButtons.redButton}
                                      onPress={() => navigate('Items')}>
                        <Text style={globalButtons.redButtonText}>Pick Items +</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    textInput: {
        height: 50,
        borderColor: '#666',
        borderWidth: 1,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        width: '90%',
        borderRadius: 10,
        paddingLeft: 10,
        fontSize:20,
    },
});
const mapStateToProps = state => ({
    lists: state.lists
});
export default connect(mapStateToProps, {addList})(List)
