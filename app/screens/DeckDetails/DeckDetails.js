import React from 'react';
import { Header, Left, Body, Icon, Container, Title, H1, Content, Text, Thumbnail, StyleProvider, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default class DeckDetails extends React.Component {
    constructor(props){
        super(props);
        var index = props.navigation.state.params.day;
        this.state = {
            isReady: false,
            day: days[index],
            totalCards: 0,
            statistics: "",
            score: "",
            remaining: "",
            done: ""
        }
        console.log(this.state.day);
    }

    componentDidMount() {
        console.log("DeckDetails Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        await Database.openDatabase();
        let results = await Database.getDailyCards(this.state.day);
        var totalItems = results.length;
        console.log(totalItems);
        this.setState({totalCards: totalItems});
        var string = "Total Items: " + totalItems;
        
        var correct = 0;
        var wrong = 0;
        var remaining = 0;
        var done = 0;
        for (var i = 0; i < totalItems; ++i) {
            var status = results.item(i).status;
            if (status === 0) {
                ++remaining;
            } else if (status === 1) {
                ++correct;
                ++done;
            } else if (status === 2) {
                ++wrong;
                ++done;
            }
        }

        var score  = "Correct: " + correct + " | Incorrect: " + wrong;
        var remainingItems = "Remaining Items : " + remaining;
        var completed = "Completed Items : " + done;

        this.setState({
            statistics: string,
            score: score,
            remaining: remainingItems, 
            done: completed
        });
        console.log(this.state.statistics);
        this.setState({isReady: true});
        console.log(results);
    }

    startReview = () => {
        var day = this.state.day;
        console.log(day);
        
        const { navigate } = this.props.navigation;

        navigate('Review', {
            day: day,
        });
    }

    checkCards = () => {
        var day = this.state.day;
        console.log(day);
        
        const { navigate } = this.props.navigation;

        navigate('CardList', {
            day: day,
        });
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate("Weekly");
    }

    static navigationOptions = {
        title: 'DeckDetails',
        headerShown: false,
    };
    

    renderDeckDetails() {
        const { navigate } = this.props.navigation;
        const { route } = this.props;

        return (
            <Container>
            <Header>
              <Left>
              <Button transparent onPress={this.goBack}>
                <Icon name="arrow-back" type="Ionicons" />
                </Button>
              </Left>
              <Body>
                <Title>Details</Title>
              </Body>
  
            </Header>
            <LinearGradient
                      colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                      style={styles.linearGradient}
                      >
                    <Row size={1}></Row>
                    <Row size={4} style={{ flex:1, justifyContent:"center"}}>
                        <Text style={{ fontFamily: 'PineappleParty', fontSize: 53 }}>{this.state.day}</Text>
                    </Row>
                    <Row size={1}></Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={{fontSize: 25}}>{this.state.statistics}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={{fontSize: 25}}>{this.state.score}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={{fontSize: 25}}>{this.state.remaining}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={{fontSize: 25}}>{this.state.done}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block start onPress={this.checkCards}>
                            <Text style={{fontFamily: 'PineappleParty'}}>Check Cards</Text>
                        </Button>
                    </Row>
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block start onPress={this.startReview}>
                            <Text style={{fontFamily: 'PineappleParty'}}>Start Review</Text>
                        </Button>
                    </Row>
                    <Row size={1}></Row>
                       
              </LinearGradient>
          </Container>
        );

    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderDeckDetails() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text>Loading</Text>
                </LinearGradient>
        )
        

    }

}

const styles = StyleSheet.create({
    objects: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    linearGradient: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});