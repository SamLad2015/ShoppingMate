import React, { Component }  from 'react';
import SelectMultiple from 'react-native-select-multiple';
import {StyleSheet, View, Text, Button, ImageBackground, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { setItems } from '../../actions/items';
import {globalButtons, globalStyles, headerStyles, iconStyles} from "../../styles/Styles";
import * as _ from 'lodash';
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";

class Items extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
        this.getAllItems().then(items => this.setState({items}));
    }
    static navigationOptions = headerStyles;
    async getAllItems() {

    }
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
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <SelectMultiple
                        style={styles.listWrapper}
                        items={_.orderBy(this.state.items, 'label')}
                        renderLabel={renderLabel}
                        selectedItems={lists.list ? lists.list.items : []}
                        onSelectionsChange={setItems} />
                        <View style={globalButtons.bottomButtonsWrapper}>
                            <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('List')}>
                                <Fontisto name='check'
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
        marginBottom: 50,
        opacity: 0.7
    },
    list : {
        flex: 1,
        alignItems: 'stretch',
        borderRadius: 10,
        opacity: 1,
        color: '#fff'
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        paddingLeft: 5,
        paddingRight: 5
    }
});
const mapStateToProps = state => ({
    lists: state.lists,
});
export default connect(mapStateToProps, {setItems})(Items)

