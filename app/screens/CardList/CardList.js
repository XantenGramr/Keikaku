import React from 'react';
import { Body, Header, Left, Icon, Container, Title, H1, Content, Text, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import Database from '../../database/Database';
import FlipCard from 'react-native-flip-card'
import CustomHeader from '../../components/CustomHeader';
import styles from '../../components/Styles';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export default class CardList extends React.Component {
    cards = [];
    constructor(props){
        super(props);
        var day = props.navigation.state.params.day;
        var topic = props.navigation.state.params.topic;
        this.state = {
            isReady: false,
            day: day,
            topic: topic,
            front: "-",
            isWrong: false,
            isCorrect: false,
        }
    }

    componentDidMount() {
        console.log("Card List Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        await Database.openDatabase();
        let results = await Database.getDailyCards(this.state.day, this.state.topic);
        var totalItems = results.length;
        var deck = [];
        for (var i = 0; i < totalItems; ++i) {
            // var answer = results.item(i).hiragana + " - " + results.item(i).english;
            var front = results.item(i).back;
            var card = {
                id: i,
                front: results.item(i).front,
                back: front,
            }
            deck.push(card)
        }
        this.cards = deck;
        this.setState({isReady: true});
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
                        <Text style={styles.cardListText}>{element.front}</Text>
                        <Text style={styles.cardListText}>{element.back}</Text>
                    </Body>
                </ListItem>
            );
        })

        return (
            <Container>
            <CustomHeader
                    navigation={this.props.navigation}
                    title="Card List"
                    backButtonTo="DeckDetails"
                    currentPage="CardList"/>
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

