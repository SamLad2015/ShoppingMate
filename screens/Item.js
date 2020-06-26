import React, { Component }  from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons} from '../styles/Styles';
import {updateItemCount} from "../actions/items";
import ItemsService from "../services/itemsService";


class Item extends Component {
    constructor(props) {
        super(props);
        this.state= {
            item: props.item
        }
        if (props.listId >= 0) {
            this.getListItem(props.listId, props.item.value)
                .then(item => item && this.setState({item: item}));
        }
    }
    async getListItem(listId, itemCode) {
        const itemsService = new ItemsService();
        return  await itemsService.getListItemFromStorage(listId,itemCode);
    }
    onChangeCount = (item, step) => {
        const {updateItemCount} = this.props;
        if (step === 'incr') {
            item.count += 1;
        } else {
            item.count -= 1;
        }
        this.setState(item);
        updateItemCount({item: item});
    }
    render() {
        return (
            <View style={globalStyles.itemRow}>
                <View style={globalButtons.counterButtonWrapper}>
                    <Text style={globalStyles.listLabel}>{this.state.item.label}</Text>
                </View>
                <View style={globalButtons.counterButtonWrapper}>
                    <TouchableOpacity
                        onPress={() => {this.onChangeCount(this.state.item, 'decr')}}>
                        <Text style={globalButtons.counterButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={globalButtons.counterButtonText}>{this.state.item.count}</Text>
                    <TouchableOpacity
                        onPress={() => {this.onChangeCount(this.state.item, 'incr')}}>
                        <Text style={globalButtons.counterButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default connect(null, {updateItemCount})(Item)
