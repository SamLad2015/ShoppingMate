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

class Lists extends Component {
    constructor(props) {
        const itemsService = new ItemsService();
        super(props);
    }
    /*componentDidMount() {
        const { navigation } = this.props;
        const itemsService = new ItemsService();
        this.focusListener = navigation.addListener('didFocus', () => {
            itemsService.getListsFromStorage().then(lists => {
                this.setState({lists: JSON.parse(lists)});
            });
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }*/

    render() {
        const {lists, setList} = this.props;
        const image = require('../assets/bg1.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <Text style={globalStyles.heading}>Shopping List</Text>
                    <View style={globalStyles.listWrapper}>
                        <FlatList data={lists.lists}
                                  renderItem={({item}) =>
                                      <View style={globalStyles.itemRow}>
                                          <View style={globalButtons.counterButtonWrapper}>
                                              <Text style={globalStyles.listLabel}>{item.label}</Text>
                                              <TouchableOpacity style={globalButtons.redButton}
                                                                onPress={() => {
                                                                    setList(item)
                                                                    navigate('List', {
                                                                        listId: item.id
                                                                    })
                                                                }}>
                                                  <Text style={globalButtons.redButtonText}>>></Text>
                                              </TouchableOpacity>
                                          </View>
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
const mapStateToProps = state => ({
    lists: state.lists,
    list: state.list
});
export default connect(mapStateToProps, {setList})(Lists)
