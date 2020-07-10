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
import Icon from 'react-native-vector-icons/FontAwesome';
import GetBgImageUrl from "../../configs/asset.config";
import MatesService from "../../services/matesService";
import Swipeout from "react-native-swipeout";
import Fontisto from "react-native-vector-icons/Fontisto";

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
    onSwipeOpen = (rowId) => {
        this.setState({ activeRow: rowId });
    }
    onSwipeClose = (rowId) => {
        if (rowId === this.state.activeRow) {
            this.setState({ activeRow: null });
        }
    }
    renderItem = ({item, index}) => {
        const { navigate } = this.props.navigation;
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
                            setList(item);
                            navigate('List', {
                                listId: item.id
                            })
                        }}>
                        <View style={styles.mateRow}>
                            <View style={styles.mateIcon}>
                                <Fontisto name={item.gender} size={25}color='#fff' />
                            </View>
                            <View style={styles.listDetails}>
                                <Text style={styles.listLabel}>{item.name}</Text>
                                <Text style={styles.listCountLabel}>{item.listCount}</Text>
                            </View>
                        </View>
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
    },
    mateRow: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20
    },
    mateIcon: {
        flex: 0.1
    },
    listDetails: {
        flex: 0.9,
        flexDirection: 'row',
        marginLeft: 15
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    listCountLabel: {
        fontSize: 12,
        color: '#000',
        marginTop: 2,
        marginLeft: 10,
        fontWeight: 'bold',
        borderRadius: 10,
        paddingLeft: 0,
        paddingTop: 1,
        height: 20,
        width: 20,
        backgroundColor: '#228B22',
        textAlign: 'center'
    }
});
const mapStateToProps = state => ({
    lists: state.lists
});
export default connect(mapStateToProps, {setList, removeList})(Mates)
