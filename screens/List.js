import React, { Component }  from 'react';
import { StyleSheet, View, Text, Button, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
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
        const { items } = this.props;
        const { navigate } = this.props.navigation;
        const image = require('../assets/bg2.jpg');
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <Text style={globalStyles.heading}>Shopping List</Text>
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
                    <TouchableOpacity style={globalButtons.redButton}
                                      onPress={() => navigate('Items')}>
                        <Text style={globalButtons.redButtonText}> Add Items +</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
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
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 80,
        marginBottom: 60,
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
});
export default connect(mapStateToProps, {setItems})(List)
