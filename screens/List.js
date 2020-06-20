import React, { Component }  from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {setItems} from "../actions/items";
import {connect} from "react-redux";
import {globalStyles, globalButtons} from '../styles/Styles';

class List extends Component {
    constructor(props) {
        super(props);
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
    render() {
        const { items, listName } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <TextInput
                    style={styles.textInput}
                    value={listName}
                />
                <View style={styles.listWrapper}>
                    <FlatList data={items.items}
                              renderItem={({item}) =>
                                  <View style={styles.itemRow}>
                                      <View style={styles.counterButtonWrapper}>
                                          <Text style={styles.listLabel}>{item.label}</Text>
                                      </View>
                                      <View style={styles.counterButtonWrapper}>
                                          <TouchableOpacity
                                              onPress={this.onChangeCount(item, 'incr')}>
                                              <Text style={styles.counterButtonText}>-</Text>
                                          </TouchableOpacity>
                                          <Text style={styles.counterButtonText}>{item.count || 1}</Text>
                                          <TouchableOpacity
                                              onPress={this.onChangeCount(item, 'decr')}>
                                              <Text style={styles.counterButtonText}>+</Text>
                                          </TouchableOpacity>
                                      </View>
                                  </View>
                              }
                    />
                </View>
                <View style={styles.bottomButtonsWrapper}>
                    <TouchableOpacity style={globalButtons.redButton}
                                      onPress={() => navigate('Lists')}>
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
    textInput: {
        height: 40,
        borderColor: '#666',
        borderWidth: 1,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 5,
        width: '90%',
        borderRadius: 10,
        paddingLeft: 10,
    },
    itemRow: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 1,
        backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    counterButtonWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    counterButtonText: {
        fontWeight: 'bold',
        fontSize: 30,
        paddingLeft:10,
        paddingRight: 10,
        color: '#fff',
    },
    bottomButtonsWrapper: {
        position: 'absolute',
        bottom:15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 40,
        marginBottom: 75,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    list : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: 'rgba(250, 250, 250, 1)',
        opacity: 1,
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        flex: 1,
        marginTop: 10,
        color: '#fff',
    }
});
const mapStateToProps = state => ({
    items: state.items,
    listName: state.listName || 'My List',
});
export default connect(mapStateToProps, {setItems})(List)
