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

    render() {
        const {lists, setList} = this.props;
        const image = require('../assets/bg1.jpg');
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <Text style={globalStyles.heading}>Shopping List</Text>
                    <View style={styles.listWrapper}>
                        <FlatList data={lists.lists}
                                  renderItem={({item}) =>
                                      <View style={styles.itemRow}>
                                          <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                                                                setList(item)
                                                                navigate('List', {
                                                                    listId: item.id
                                                                })
                                                            }}>
                                              <Text style={[globalStyles.listLabel, styles.listLable]}>{item.label}</Text>
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
    listLable: {
        fontSize: 25,
        color: '#fff'
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
    list: state.list
});
export default connect(mapStateToProps, {setList})(Lists)
