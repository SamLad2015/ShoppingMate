import React, { Component }  from 'react';
import {View, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet} from 'react-native';
import {addList} from "../../actions/lists";
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, headerStyles} from '../../styles/Styles';
import moment from 'moment';
import ItemsService from "../../services/itemsService";
import {updateItemCount} from "../../actions/items";
import Item from "./Item";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";

class List extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        this.state = {
            id: -1,
            label: 'List: ' + moment().format('DD/MM/YYYY'),
            items: []
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
            id: this.state.id,
            label: this.state.label,
            items: this.props.lists.list ? this.props.lists.list.items: [],
            createdOn: moment().toISOString()
        }).then(addedList => {
            addList(addedList);
            navigate('Lists');
        });
    }
    render() {
        const { lists } = this.props;
        const list = lists && lists.list ? lists.list : this.state;
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={globalStyles.loginPanel}>
                    <View style={[globalStyles.textInputWrapper, styles.buttonWrapper]}>
                        <TextInput
                            style={globalStyles.textInput}
                            onChangeText={text => this.setState({id: list.id, label: text})}
                            value={this.state.label}
                        />
                        <TouchableOpacity style={[globalStyles.signUpWrapper, globalStyles.closeButton]}
                                          onPress={() => this.setState({label: ''})}>
                            <Fontisto name='close-a'
                                      size={iconStyles.size - 7}
                                      color='#fff'/>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.listWrapper}>
                        <FlatList data={list.items || []}
                                  keyExtractor={(item) => item.value.toString()}
                                  renderItem={({item}) =>
                                      <Item listId={list.id} item={item} updateItemCount={updateItemCount} />
                                  }
                        />
                    </View>
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={this.saveList}>
                            <Fontisto name='check'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Items')}>
                            <Fontisto name='shopping-bag'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    buttonWrapper: {
        marginTop: 10
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
    item: state.item
});
export default connect(mapStateToProps, {addList,updateItemCount})(List)
