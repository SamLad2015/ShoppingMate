import React, { Component }  from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground} from 'react-native';
import {addList} from "../../actions/lists";
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, headerStyles} from '../../styles/Styles';
import moment from 'moment';
import ItemsService from "../../services/itemsService";
import {updateItemCount} from "../../actions/items";
import Item from "./Item";
import Icon from "react-native-vector-icons/FontAwesome";
import GetBgImageUrl from "../../configs/asset.config";

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
            this.getList(listId).then(list => this.setState({list}));
        }
    }
    static navigationOptions = headerStyles;

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
        const { lists } = this.props;
        const list = lists && lists.list ? lists.list : this.state.list;
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl('bg2.jpg')} style={globalStyles.bgImage}>
                    <TextInput
                        style={globalStyles.textInput}
                        onChangeText={text => this.setState({list: {id: list.id, label: text}})}
                        value={this.state.list.label}
                    />
                    <View style={globalStyles.listWrapper}>
                        <FlatList data={list.items || []}
                                  keyExtractor={(item) => item.value.toString()}
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
                                backgroundColor='#fff'
                                size={iconStyles.size}
                                borderRadius={iconStyles.size + 5}
                                name="check"
                                onPress={() => this.saveList()}>
                            </Icon.Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <Icon.Button
                                iconStyle={globalButtons.iconButton}
                                color='black'
                                backgroundColor='#fff'
                                size={iconStyles.size}
                                borderRadius={iconStyles.size + 5}
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
const mapStateToProps = state => ({
    lists: state.lists,
    item: state.item
});
export default connect(mapStateToProps, {addList,updateItemCount})(List)
