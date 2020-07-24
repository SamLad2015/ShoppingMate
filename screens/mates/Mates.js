import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import {globalStyles, globalButtons, iconStyles, headerStyles, swipeStyles} from '../../styles/Styles';
import * as _ from "lodash";
import {removeMate, acceptRequest, rejectRequest} from "../../actions/mates";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";
import MateList from "./MateList";

class Mates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow: null
        }
    }
    static navigationOptions = headerStyles;
    addListToMate = (mateId) => {
        const {mates} = this.props;
        const { params } = this.props.navigation.state;
        const listId = params ? params.listId : -1;
        if (listId > -1) {
            _.find(mates, {id: mateId}).lists.push(listId);
            this.setState({mates});
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        const { mates, removeMate, acceptRequest, rejectRequest} = this.props;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl('bg1.jpg')} style={globalStyles.bgImage}>
                    <View style={styles.lists}>
                        <MateList uid={mates.uid} mates={mates.friends} removeMate={removeMate} type='friend' />
                        <MateList uid={mates.uid} mates={mates.invites} acceptRequest={acceptRequest} rejectRequest={rejectRequest} type='invite'/>
                        <MateList uid={mates.uid} mates={mates.requests} removeMate={removeMate} type='request' />
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Lists')}>
                            <Fontisto name='check'
                                      size={iconStyles.size}
                                      color='#fff'/>
                        </TouchableOpacity>
                        <TouchableOpacity style={globalButtons.bottomButton} onPress={() => {
                            navigate('AddMate')}}>
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
        flex: 1
    },
    lists: {
        flex: 1,
        width: '100%'
    }
});
const mapStateToProps = state => ({
    mates: state.mates,
    uid: state.uid
});
export default connect(mapStateToProps, {removeMate, acceptRequest, rejectRequest})(Mates)
