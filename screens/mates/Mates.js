import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, headerStyles, swipeStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeList, setList} from "../../actions/lists";
import GetBgImageUrl from "../../configs/asset.config";
import MatesService from "../../services/matesService";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";
import MateProfile from "./MateProfile";

class Mates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mates: [],
            activeRow: null
        }
        this.getList().then(mates => this.setState({mates}));
    }
    static navigationOptions = headerStyles;
    async getList() {
        const matesService = new MatesService();
        return await matesService.getMatesFromStorage();
    }
    addListToMate = (mateId) => {
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        if (listId > -1) {
            let mates = this.state.mates;
            _.find(mates, {id: mateId}).lists.push(listId);
            this.setState({mates});
        }
    }
    onSwipeOpen = (rowId) => {
        this.setState({ activeRow: rowId });
    }
    onSwipeClose = (rowId) => {
        if (rowId === this.state.activeRow) {
            this.setState({ activeRow: null });
        }
    }
    renderItem = ({item, index}) => {
        const swipeButtons = [{
            component: (
                <TouchableOpacity style={globalButtons.swipeIconButton} onPress={() => this.deleteList(item)}>
                    <Fontisto name='trash'
                              size={iconStyles.size}
                              color='#fff'/>
                </TouchableOpacity>
            ),
            backgroundColor: swipeStyles.red,
            underlayColor: swipeStyles.underlayColor,
            autoClose: true
        }];
        return (
            <Swipeout right={swipeButtons}
                      style={styles.itemRow}
                      close={this.state.activeRow!==item.id}
                      autoClose={true}
                      onOpen={() => this.onSwipeOpen(item.id)}
                      onClose={() => this.onSwipeClose(item.id)}
                      rowId={item.id}
                      sectionId={1}
                      backgroundColor= 'transparent'>
                <View>
                    <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                            this.addListToMate(item.id);
                        }}>
                        <MateProfile mate={item} isSmall={false} />
                    </TouchableOpacity>
                </View>
            </Swipeout>
        );
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl('bg1.jpg')} style={globalStyles.bgImage}>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(this.state.mates, 'createdOn', 'desc')}
                                  keyExtractor={(item) => item.id.toString()}
                                  renderItem={this.renderItem}
                        />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={this.saveList}>
                            <Fontisto name='check'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => {
                            setList(undefined)
                            navigate('Mates', {
                                listId: -1
                            })}}>
                            <Fontisto name='person'
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
    itemRow: {
        paddingLeft: 20,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: .5
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginBottom: 75
    }
});
const mapStateToProps = state => ({
    lists: state.lists
});
export default connect(mapStateToProps, {setList, removeList})(Mates)
