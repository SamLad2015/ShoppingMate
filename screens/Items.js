import React, { Component }  from 'react';
import SelectMultiple from 'react-native-select-multiple';
import {StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity} from 'react-native';
import {allItems} from '../data/items.json';
import { connect } from 'react-redux';
import { setItems } from '../actions/items';
import {globalButtons, globalStyles} from "../styles/Styles";
import * as _ from 'lodash';
import Icon from "react-native-vector-icons/FontAwesome";

class Items extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        headerTitle: (<Icon.Button
            fontSize="20"
            backgroundColor="transparent"
            name="list">
        </Icon.Button>),
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading,
        headerRight: () => (
            <Text style={globalStyles.heading}>Shopping Mate</Text>
        )
    };
    onSelectionsChange = (selectedItems) => {
        this.setState({selectedItems});
    }
    render() {
        const image = require('../assets/bg3.jpg');
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
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <SelectMultiple
                        style={styles.listWrapper}
                        items={_.orderBy(allItems, 'label')}
                        renderLabel={renderLabel}
                        selectedItems={lists.list ? lists.list.items : []}
                        onSelectionsChange={setItems} />
                        <View style={globalButtons.bottomButtonsWrapper}>
                            <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                                <Icon.Button
                                    iconStyle={globalButtons.iconButton}
                                    backgroundColor="green"
                                    name="check"
                                    onPress={() => navigate('List')}>
                                </Icon.Button>
                            </TouchableOpacity>
                        </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    text: {
        fontFamily: 'notoserif',
        fontWeight: 'bold',
        fontSize: 30,
        color: 'red',
        position: 'absolute',
        top: 20,
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        marginBottom: 70
    },
    list : {
        flex: 1,
        alignItems: 'stretch',
        borderRadius: 10
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        paddingLeft: 5,
        paddingRight: 5,
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
});
export default connect(mapStateToProps, {setItems})(Items)

