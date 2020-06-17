import React, { Component }  from 'react';
import SelectMultiple from 'react-native-select-multiple';
import { StyleSheet, View, Text, Button, ImageBackground } from 'react-native';
import * as _ from 'lodash';
import {data} from '../data.json';


export default class Items extends Component {
    state = { selectedItems: [] }
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Items',
    };
    onSelectionsChange = (selectedItems) => {
        this.setState({ selectedItems })
    }
    getLabel(key) {
        return _.find(data, {key: key}).name;
    }
    render() {
        const items = _.map(data, 'key');
        const { navigate } = this.props.navigation;
        const renderLabel = (key, style) => {
            return (
                <View>
                     <View style={styles.list}>
                        <Text style={styles.listLabel}>{this.getLabel(key)}</Text>
                    </View>
                </View>
            )
        };
        const image = require('../assets/bg3.jpg');
        return (
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <Text style={styles.text}>Shopping List</Text>
                    <SelectMultiple
                        style={styles.listWrapper}
                        items={items}
                        renderLabel={renderLabel}
                        selectedItems={this.state.selectedItems}
                        onSelectionsChange={this.onSelectionsChange} />
                        <View style={styles.buttonWrapper}>
                            <Button
                                title="Add to List"
                                onPress={() =>
                                    navigate('List', {selectedItems: this.state.selectedItems})
                                }
                            />
                        </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red',
        position: 'absolute',
        top: 20,
    },
    buttonWrapper: {
        flex: 1,
        position: 'absolute',
        bottom: 15,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
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
        backgroundColor: 'rgba(250, 250, 250, 0)',
        opacity: 1,
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
    }
});

