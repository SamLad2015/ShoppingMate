import React, { Component }  from 'react';
import {StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {addList} from "../actions/lists";
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles} from '../styles/Styles';
import moment from 'moment';
import ItemsService from "../services/itemsService";
import {updateItemCount} from "../actions/items";
import Item from "./Item";
import Icon from "react-native-vector-icons/FontAwesome";

class List extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        this.state = {
            list: {
                id: -1,
                label: 'List: ' + moment().format('DD/MM/YYYY'),
                items: []
            }
        };
        if (listId >= 0) {
            this.getList(listId).then(list => this.setState({list: list}));
        }
    }
    static navigationOptions = {
        headerTitle: (<Icon.Button
            size={iconStyles.size}
            backgroundColor="transparent"
            name="shopping-cart">
        </Icon.Button>),
        headerStyle: { backgroundColor: '#800000' },
        headerTitleStyle: globalStyles.subHeading,
        headerRight: () => (
            <Text style={globalStyles.heading}>Shopping Mate</Text>
        )
    };
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
            items: this.props.lists.list ? this.props.lists.list.items: [],
            createdOn: moment().toISOString()
        }).then(addedList => {
            addList(addedList);
            navigate('Lists');
        });
    }
    render() {
        const image = require('../assets/bg2.jpg');
        const { lists } = this.props;
        const list = lists && lists.list ? lists.list : this.state.list;
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={image} style={globalStyles.bgImage}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({list: {id: list.id, label: text}})}
                        value={this.state.list.label}
                    />
                    <View style={globalStyles.listWrapper}>
                        <FlatList data={list.items || []}
                                  renderItem={({item}) =>
                                      <Item listId={list.id} item={item} updateItemCount={updateItemCount} />
                                  }
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='green'
                                backgroundColor='transparent'
                                size={iconStyles.size}
                                name="check"
                                onPress={() => this.saveList()}>
                            </Icon.Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='transparent'
                                size={iconStyles.size}
                                name="cart-plus"
                                onPress={() => navigate('Items')}>
                            </Icon.Button>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderColor: '#666',
        borderBottomWidth: 1,
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        width: '90%',
        paddingLeft: 10,
        fontSize:20,
    },
});
const mapStateToProps = state => ({
    lists: state.lists,
    item: state.item
});
export default connect(mapStateToProps, {addList,updateItemCount})(List)
