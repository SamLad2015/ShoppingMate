import React , {Component} from 'react';
import {globalButtons, globalStyles, headerStyles, iconStyles} from "../../styles/Styles";
import {
    View,
    Animated,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";
import FirebaseService from "../../services/firebaseService";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Loading from "../common/Loading";
import {connect} from "react-redux";
import {addMate} from "../../actions/mates";

class AddMate extends Component {
    constructor() {
        super();
        this.state ={
            email: '',
            errorMessage: null,
            mate: null,
            loading: false
        };
    }
    searchMate = () => {
        this.setState({loading: true});
        const fbService = new FirebaseService();
        fbService.searchItem('users', 'email', '==', this.state.email.trim())
            .then((mate) => {
                this.setState({mate: mate, loading: false});
            });
    }
    addMate = () => {
        const {mates, addMate} = this.props;
        const {navigate} = this.props.navigation;
        this.state.mate.mateUid = mates.uid;
        this.state.mate.approved = false;
        const fbService = new FirebaseService();
        fbService.addItemAutoGenId('mates', this.state.mate).then(() => {
            addMate(this.state.mate);
            navigate('Mates');
        });
    }
    static navigationOptions = headerStyles;
    render() {
        const {mates} = this.props;
        const {navigate} = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.mateLookUpPanel}>
                        <View style={styles.searchPanel}>
                            <View style={styles.mateSearchInput}>
                                <TextInput
                                    autoCapitalize="none"
                                    style={globalStyles.textInput}
                                    placeholder="Add by Email"
                                    onChangeText={email => this.setState( {email})}
                                    value={this.state.email}
                                />
                            </View>
                            <View style={styles.searchIconWrapper}>
                                <TouchableOpacity onPress={() => this.searchMate()}>
                                    <Fontisto name='search'
                                              size={iconStyles.size - 5}
                                              color='#fff'/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.loading && <Loading />}
                        {!this.state.loading && this.state.mate &&
                        <View style={styles.mates}>
                            <View style={styles.mateProfile}>
                                <TouchableOpacity style={styles.profileWrapper} onPress={() => this.addMate()}>
                                    <View style={styles.addMateIcon}>
                                        {(mates.uid !== this.state.mate.uid) && <Icon name='account-plus' size={iconStyles.size} color='#fff' type='material-community' />}
                                        {(mates.uid === this.state.mate.uid) && <Icon name='account' size={iconStyles.size} color='#fff' type='material-community' />}
                                    </View>
                                    <View style={styles.mateName}>
                                        <Text style={styles.addText}>{this.state.mate.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    </View>
                    <View style={globalButtons.bottomButtonsWrapper}>
                        <TouchableOpacity style={globalButtons.iconButtonWrapper}>
                            <TouchableOpacity style={globalButtons.bottomButton} onPress={() => navigate('Mates')}>
                                <Fontisto name='close-a'
                                          size={iconStyles.size}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={[globalStyles.error, {opacity: this.state.fadeIn}]}>
                        {this.state.errorMessage &&
                        <Text style={[globalStyles.introText, globalStyles.errorText]}>{this.state.errorMessage}</Text>}
                    </Animated.View>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mateLookUpPanel: {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
        paddingTop: 20
    },
    searchPanel: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    mateSearchInput: {
        flex: 0.9,
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    },
    searchIconWrapper: {
        flex: 0.1,
        alignItems: 'flex-start',
        marginTop: 20,
        marginRight: 5
    },
    mates: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 20,
        top: 100
    },
    mateProfile: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10
    },
    profileWrapper: {
        flex: 1,
        flexDirection: 'row'
    },
    addMateIcon: {
        flex: 0.1,
        marginTop: 5
    },
    mateName: {
        flex: 0.9
    },
    addText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingTop: 5
    }
});
const mapStateToProps = state => ({
    mates: state.mates,
    uid: state.uid
});
export default connect(mapStateToProps, {addMate})(AddMate)
