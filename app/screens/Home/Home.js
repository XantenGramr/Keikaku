import React from 'react';
import { Text, Button, Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Image, BackHandler, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import styles from '../../components/Styles';
import CustomHeader from '../../components/CustomHeader';

let DATABASE_VERSION = 10;

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: false,
        }
    }

    componentDidMount() {
        console.log("Home Screen Init");
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
        this._init();
        return true;
    }

    componentWillUnmount() {
        return true;
    }

    backAction = () => {
        Alert.alert("Hold on!", "Do you want to exit app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    _init = async () => {
        await Database.openDatabase();
        
        let installedVersion = await Database.getVersion();

        if (installedVersion != DATABASE_VERSION) {
            console.log("WILL UPDATE THE DB!");

            await Database.updateDatabase(DATABASE_VERSION);

            const { navigate } = this.props.navigation;
                navigate('Readme', {
                    currentPage: "Home",
                });
        } else {
            console.log("NO NEED TO UPDATE!");
        }

        // console.log("TEST");

        // let isFirstTimeOpen = await Database.getFirstTimeOpenStatus();
        // console.log(isFirstTimeOpen);
        this.setState({isReady: true});
    }


    static navigationOptions = {
        title: 'Home',
        headerShown: false,
    };

    renderHomeScreen() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <CustomHeader 
                    navigation={this.props.navigation}
                    title="Home"
                    currentPage="Home"/>
                <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                    <Grid>
                        <Row size={2}>
                            <Image resizeMode={'stretch'} style={{width:'50%'}} source={require('./images/kei.png')}/>
                            <Image resizeMode={'stretch'} style={{width:'50%'}} source={require('./images/kaku.png')}/>
                        </Row>
                        <Row size={2}></Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block kanji 
                                onPress={() => {
                                    navigate('Weekly', {
                                        topic: 'Kanji',
                                    });
                                }}
                                >
                                <Text uppercase={false} style={styles.text}>Kanji</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block verb 
                                    onPress={() => {
                                        navigate('Weekly', {
                                            topic: 'Verb',
                                        });
                                    }}
                                    >
                                <Text uppercase={false} style={styles.text}>Verbs</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block verb 
                                    onPress={() => {
                                        navigate('Weekly', {
                                            topic: 'Vocab',
                                        });
                                    }}
                                    >
                                <Text uppercase={false} style={styles.text}>Vocabularies</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block randomize onPress={() => navigate('Randomize')}>
                                <Text uppercase={false} style={styles.text}>Randomize</Text>
                            </Button>
                        </Row>
                    </Grid>     
              </LinearGradient>
          </Container>
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return this.state.isReady ? this.renderHomeScreen() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text style={styles.text}>Loading</Text>
                </LinearGradient>
        )
    }
}

