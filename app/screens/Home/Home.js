import React from 'react';
import { Text, Button, Icon, Thumbnail, Header, Container, Left, Body, Title } from 'native-base';
import { Row, Grid, Col } from 'react-native-easy-grid';
import { Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import styles from './styles/styles';

let DATABASE_VERSION = 5;

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: false,
        }
    }

    componentDidMount() {
        console.log("Home Screen Init");
        this._init();
        return true;
    }

    componentWillUnmount() {
        return true;
    }

    _init = async () => {
        console.log("Start2");
        await Database.openDatabase();
        
        let installedVersion = await Database.getVersion();
        console.log(installedVersion);

        if (installedVersion != DATABASE_VERSION) {
            console.log("Need to update DB");

            await Database.updateDatabase(DATABASE_VERSION);
        } else {
            console.log("NO NEED TO UPDATE");
        }
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
            <Header>
              <Left>
              </Left>
              <Body>
                <Title>Home</Title>
              </Body>
  
            </Header>
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
                                <Text style={styles.text}>Kanji</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block disabled vocabulary>
                                <Text style={styles.text}>Vocabulary</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block grammar onPress={() => navigate('Sandbox')}> 
                                <Text style={styles.text}>Grammar</Text>
                            </Button>
                        </Row>
                        <Row size={1}>
                            <Button style={{flex:1}} large rounded block randomize onPress={() => navigate('Randomize')}>
                                <Text style={styles.text}>Randomize</Text>
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
                     <Text>Loading</Text>
                </LinearGradient>
        )
    }

}

