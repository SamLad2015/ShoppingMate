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
import moment from "moment";

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
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl('bg1.jpg')} style={globalStyles.bgImage}>
                    <View style={styles.listWrapper}>
                        <FlatList data={_.orderBy(this.state.mates, 'createdOn', 'desc')}
                                  keyExtractor={(item) => item.id.toString()}
                                  renderItem={({item}) =>
                                      <View style={styles.itemRow}>
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
                                              <View style={styles.deleteIcon}>
                                                  <Icon.Button
                                                      iconStyle={globalButtons.deleteIconButton}
                                                      color='white'
                                                      backgroundColor='transparent'
                                                      size={iconStyles.size + 7}
                                                      name="minus-circle"
                                                      onPress={() => this.deleteList(item)}>
                                                  </Icon.Button>
                                              </View>
                                          </TouchableOpacity>
                                      </View>
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
        flexDirection: 'row',
        paddingLeft: 10,
        paddingBottom: 10,
        marginBottom: 15,
        borderBottomColor: '#c0c0c0',
        borderBottomWidth: 1,
        backgroundColor: '#000',
        borderRadius: 10,
    },
    listWrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
        marginTop: 20,
        marginBottom: 75,
        paddingLeft: 10,
        paddingRight: 10
    },
    listDetails: {
        flex: 0.8,
        flexDirection: 'row'
    },
    deleteIcon: {
        flex: 0.2,
        alignItems: 'flex-end'
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
        fontSize: 15,
        color: '#000',
        marginTop: 15,
        marginLeft: 10,
        fontWeight: 'bold',
        borderRadius: 12,
        paddingLeft: 0,
        paddingTop: 1,
        height: 24,
        width: 24,
        backgroundColor: '#83f52c',
        textAlign: 'center'
    }
});
const mapStateToProps = state => ({
    lists: state.lists
});
export default connect(mapStateToProps, {setList, removeList})(Mates)
