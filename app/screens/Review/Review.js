import React from 'react';
import { Body, Header, Left, Icon, Container, Title, H1, Content, Text, Thumbnail, StyleProvider, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Database from '../../database/Database';
import FlipCard from 'react-native-flip-card'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default class Review extends React.Component {
    cards = [];
    constructor(props){
        super(props);
        var day = props.navigation.state.params.day;
        this.state = {
            isReady: false,
            day: day,
            answer: "-",
            isWrong: false,
            isCorrect: false,
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
        let results = await Database.getBatchOfCards(this.state.day);
        var totalItems = results.length;
        console.log(totalItems);
        var deck = [];
        var actions = [];
        for (var i = 0; i < totalItems; ++i) {
            var answer = results.item(i).hiragana + " - " + results.item(i).english;
            var card = {
                id: i,
                primaryKey: results.item(i).id,
                kanji: results.item(i).kanji,
                answer: answer,
                temp: "",
                isCorrect: false,
                isWrong: false,
            }
            var action = () => console.log(i);
            deck.push(card)
        }
        this.cards = deck;

        this.setState({isReady: true});
    }

    showAnswer = (id) => {
        if (this.state.answer === "-") {
            this.setState({answer: id});
        } else {
            this.setState({answer: "-"});
        }
    }

    saveCorrect = (id, key) => {
        Database.updateCardState(this.state.day, key, 1);
        this.cards[id].isWrong = false;
        this.cards[id].isCorrect = true;
        this.setState({
            isWrong: false,
            isCorrect: true,
        });
    }

    saveWrong = (id, key) => {
        Database.updateCardState(this.state.day, key, 2);
        this.cards[id].isWrong = true;
        this.cards[id].isCorrect = false;
        this.setState({
            isWrong: true,
            isCorrect: false,
        });
    }

    resetState = () => {
        this.setState({
            answer: "-",
            isWrong: false,
            isCorrect: false,
        })
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

        const cards = this.cards;

        const renderedCards = cards.map(element => {
            return (
                <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient} key={element.id}
                    >
                        <Row size={1}></Row>
                        <Row size={6} >
                            <Col size={1}></Col>
                            <Col size={5} style={{ backgroundColor:"white", justifyContent:"center", alignContent:"center"}}>
                                <Row style={{ backgroundColor:"white", justifyContent:"center", alignContent:"center"}}>
                                <FlipCard>
                                    {/* Face Side */}
                                    <View style={styles.face}>
                                        <Text style={{ fontFamily: 'PineappleParty', fontSize: 65 }}>{element.kanji}</Text>
                                        
                                    </View>
                                    {/* Back Side */}
                                    <View style={styles.back}>
                                    <Text style={{ fontFamily: 'PineappleParty', fontSize: 30 }}>{element.answer}</Text>
                                    </View>
                                </FlipCard>
                                </Row>
                            </Col>
                            <Col size={1}></Col>
                        </Row>
                        <Row size={1}></Row>
                        <Row size={1}>
                           <Col size={1}>
                                <Button style={{flex:1}} 
                                    bordered={element.isWrong || this.state.isWrong}
                                    transparent={element.isWrong  || this.state.isWrong} 
                                    disabled={element.isWrong || this.state.isWrong} large rounded block start
                                    onPress={() => this.saveWrong(element.id, element.primaryKey)}>
                                    <Text style={{fontFamily: 'PineappleParty'}}>Incorrect</Text>
                                </Button>
                           </Col>
                           <Col size={1}>
                                <Button style={{flex:1}}
                                    bordered={element.isCorrect || this.state.isCorrect}
                                    transparent={element.isCorrect || this.state.isCorrect} 
                                    disabled={element.isCorrect || this.state.isCorrect} large rounded block start
                                    onPress={() => this.saveCorrect(element.id, element.primaryKey)}>
                                    <Text style={{fontFamily: 'PineappleParty'}}>Correct</Text>
                                </Button>
                           </Col>
                        </Row>
                        <Row size={1}></Row>
                        
                </LinearGradient>
            );
        })

        return (
            <Container>
            <Header>
                <Left>
                <Button transparent onPress={this.goBack}>
                <Icon name="arrow-back" type="Ionicons" />
                </Button>
                </Left>
                <Body>
                <Title>Flashcard</Title>
                </Body>

            </Header>
            <LinearGradient
                        colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                        style={styles.linearGradient}
                        >
                
                <Swiper style={styles.wrapper} 
                    showsButtons={false} 
                    loop={false}
                    loadMinimal={true}
                    showsPagination={false}
                    onScroll={this.resetState}
                    >
                        {renderedCards}
                    </Swiper>
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
                <Text>Loading...</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
      width: 320,
      height: 470,
    },
    card: {
      width: 320,
      height: 470,
      backgroundColor: '#FE474C',
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
    },
    card1: {
      backgroundColor: '#FE474C',
    },
    card2: {
      backgroundColor: '#FEB12C',
    },
    label: {
      lineHeight: 470,
      textAlign: 'center',
      fontSize: 55,
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });