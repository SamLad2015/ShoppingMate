import React, { Component }  from 'react';
import SelectMultiple from 'react-native-select-multiple';
import {StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity} from 'react-native';
import {allItems} from '../data/items.json';
import { connect } from 'react-redux';
import { setItems } from '../actions/items';
import {globalButtons, globalStyles} from "../styles/Styles";
import * as _ from 'lodash';

class Items extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        title: 'Items'
    };
    onSelectionsChange = (selectedItems) => {
        this.setState({selectedItems});
    }
    render() {
        let { lists, setItems } = this.props;
        const { navigate } = this.props.navigation;
        const renderLabel = (item) => {
            return (
                <View style={styles.list}>
                    <Text style={styles.listLabel}>{item}</Text>
                </View>
            )
        };

        return (
            <View style={[globalStyles.container, styles.container]}>
                <Text style={styles.text}>Shopping List</Text>
                <SelectMultiple
                    style={styles.listWrapper}
                    items={_.orderBy(allItems, 'label')}
                    renderLabel={renderLabel}
                    selectedItems={lists.list ? lists.list.items : []}
                    onSelectionsChange={setItems} />
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity style={globalButtons.redButton}
                                          onPress={() => {
                                              navigate('List');
                                          }}>
                            <Text style={globalButtons.redButtonText}>Add Items</Text>
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
        bottom: 20,
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 80,
        marginBottom: 75,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    list : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: 10,
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
});
export default connect(mapStateToProps, {setItems})(Items)

