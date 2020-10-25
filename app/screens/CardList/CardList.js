import React from 'react';
import { Body, Header, Left, Icon, Container, Title, H1, Content, Text, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Database from '../../database/Database';
import FlipCard from 'react-native-flip-card'

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default class CardList extends React.Component {
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
        console.log("Card List Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        await Database.openDatabase();
        let results = await Database.getDailyCards(this.state.day);
        var totalItems = results.length;
        console.log(totalItems);
        var deck = [];
        for (var i = 0; i < totalItems; ++i) {
            var answer = results.item(i).hiragana + " - " + results.item(i).english;
            var card = {
                id: i,
                kanji: results.item(i).kanji,
                answer: answer,
            }
            deck.push(card)
        }
        this.cards = deck;
        this.setState({isReady: true});
    }


    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate("Weekly");
    }

    static navigationOptions = {
        title: 'CardList',
        headerShown: false,
    };

    renderCardList() {
        const { navigate } = this.props.navigation;

        const cards = this.cards;

        const renderedCards = cards.map(element => {
            return (
                <ListItem avatar key={element.id}>
                    <Body>
                        <Text>{element.kanji}</Text>
                        <Text>{element.answer}</Text>
                    </Body>
                </ListItem>
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
                <Title>Details</Title>
              </Body>
  
            </Header>
                <ScrollView>
                <List>
                    {renderedCards}
                </List>
                </ScrollView>
          </Container>
        );

    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderCardList() : (
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
