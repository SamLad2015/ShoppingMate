import React , {Component} from 'react';
import {globalButtons, globalStyles, headerStyles, iconStyles} from "../../styles/Styles";
import {
    View,
    Animated,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage
} from "react-native";
import GetBgImageUrl from "../../configs/asset.config";
import Fontisto from "react-native-vector-icons/Fontisto";
import FirebaseService from "../../services/firebaseService";
import MateProfile from "./MateProfile";

export default class AddMate extends Component {
    constructor() {
        super();
        this.state ={
            email: '',
            errorMessage: null,
            mate: null
        };
    }
    searchMate = () => {
        const fbService = new FirebaseService();
        fbService.searchItem('users', 'email', '==', this.state.email)
            .then((mate) => this.setState({mate}));
    }
    addMate = () => {
        const {navigate} = this.props.navigation;
        const { params } = this.props.navigation.state;
        const uid = params ? params.uid : null;
        if (uid) {
            this.state.mate.mateUid = uid;
            this.state.mate.approved = false;
            const fbService = new FirebaseService();
            fbService.addItem('mates', this.state.mate).then(() => {
                navigate('Mates', {uid});
            });
        }
    }
    static navigationOptions = headerStyles;
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={globalStyles.container}>
                <ImageBackground source={GetBgImageUrl()} style={globalStyles.bgImage}>
                    <View style={styles.mateLookUpPanel}>
                        <View style={styles.searchPanel}>
                            <TextInput
                                autoCapitalize="none"
                                style={[globalStyles.textInput, styles.mateSearchInput]}
                                placeholder="Add by Email"
                                onChangeText={email => this.setState( {email})}
                                value={this.state.email}
                            />
                            <TouchableOpacity style={styles.searchIcon} onPress={() => this.searchMate()}>
                                <Fontisto name='search'
                                          size={iconStyles.size}
                                          color='#fff'/>
                            </TouchableOpacity>
                        </View>
                        {this.state.mate &&
                        <View style={styles.mates}>
                            <View style={globalStyles.mateProfile}>
                                <MateProfile mate={this.state.mate} isSmall={false} />
                            </View>
                            <View style={globalButtons.addButtonWrapper}>
                                <TouchableOpacity style={globalButtons.addButton} onPress={() => this.addMate()}>
                                    <Text style={globalButtons.addButtonText}>Add Mate</Text>
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
        flex: 0.9
    },
    searchIcon: {
        flex: 0.1,
        marginLeft: 20
    },
    mates: {
        position: 'absolute',
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: 20,
        top: 100
    }
});
