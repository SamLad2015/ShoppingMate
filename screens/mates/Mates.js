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
import {globalStyles, globalButtons, iconStyles, headerStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeList, setList} from "../../actions/lists";
import Icon from 'react-native-vector-icons/FontAwesome';
import GetBgImageUrl from "../../configs/asset.config";
import MatesService from "../../services/matesService";
import Swipeout from "react-native-swipeout";

class Mates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mates: []
        }
        this.getList().then(mates => this.setState({mates}));
    }
    static navigationOptions = headerStyles;
    async getList() {
        const matesService = new MatesService();
        return await matesService.getMatesFromStorage();
    }
    renderItem = ({item, index}) => {
        const { navigate } = this.props.navigation;
        const swipeButtons = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteList(item) }
        }];
        return (
            <Swipeout right={swipeButtons}
                      style={styles.itemRow}
                      autoClose='true'
                      backgroundColor= 'transparent'>
                <View>
                    <TouchableOpacity style={globalButtons.counterButtonWrapper} onPress={() => {
                        setList(item)
                        navigate('List', {
                            listId: item.id
                        })
                    }}>
                        <View style={styles.listDetails}>
                            <Text style={styles.listLabel}>{item.name}</Text>
                            <Text style={styles.listCountLabel}>{item.listCount}</Text>
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
                                borderRadius={iconStyles.size + 5}
                                size={iconStyles.size}
                                name="user"
                                onPress={() => {
                                    setList(undefined)
                                    navigate('Mate', {
                                        listId: -1
                                    })
                                }}>
                            </Icon.Button>
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
        marginBottom: 15,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: .5
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 20,
        marginBottom: 75
    },
    listDetails: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 15
    },
    listLabel: {
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 10,
        color: '#fff',
        paddingTop: 5
    },
    listCountLabel: {
        fontSize: 12,
        color: '#000',
        marginTop: 17,
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
