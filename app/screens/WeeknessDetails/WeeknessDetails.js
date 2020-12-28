import React from 'react';
import { Toast, Header, Left, Body, Icon, Container, Title, H1, Content, Text, Thumbnail, StyleProvider, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import CustomHeader from '../../components/CustomHeader';
import styles from '../../components/Styles';

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Weekness"];

export default class WeeknessDetails extends React.Component {
    constructor(props){
        super(props);
        var day = props.navigation.state.params.day;
        var topic = props.navigation.state.params.topic;

        console.log("Weekness Details : " + topic);
        this.state = {
            isReady: false,
            topic: topic,
            day: day,
            totalCards: 0,
            statistics: "",
            score: "",
            remaining: "",
            done: ""
        }
    }

    navigationSubcription;

    componentDidMount() {
        console.log("WeeknessDetails Screen Init");
        this.navigationSubscription = this.props.navigation.addListener('didFocus', this.onFocus);

        this._init();
        return true;
    }

    componentWillUnmount() {
        this.navigationSubscription.remove();
    }

    onFocus = (payload) => {
        this.setState({isReady: false});
        this._init();
    }

    _init = async () => {

        console.log("WD STart : " + this.state.topic);

        await Database.openDatabase();        
        await Database.prepareWeekness(this.state.topic);

        console.log(this.state.topic);
        
        let results = await Database.getDailyCards(this.state.day, this.state.topic);
        var totalItems = results.length;
        this.setState({totalCards: totalItems});
        var string = "Total Items: " + totalItems;
        
        var correct = 0;
        var wrong = 0;
        var remaining = 0;
        var done = 0;
        for (var i = 0; i < totalItems; ++i) {
            var status = results.item(i).status;
            if (status === 2) {
                ++remaining;
            }
        }

        var score  = "Correct: " + correct + "   Incorrect: " + wrong;
        var remainingItems = "Remaining Items : " + remaining;
        var completed = "Completed Items : " + done;

        this.setState({
            statistics: string,
            score: score,
            remaining: remainingItems, 
            done: completed
        });
        this.setState({isReady: true});
    }

    startReview = () => {
        var day = this.state.day;
        var topic = this.state.topic;
        
        const { navigate } = this.props.navigation;

        navigate('WeeknessReview', {
            day: day,
            topic: topic,
        });
    }

    checkCards = () => {
        var day = this.state.day;
        var topic = this.state.topic;
        
        const { navigate } = this.props.navigation;

        navigate('WeeknessCardList', {
            day: day,
            topic: topic,
        });
    }

    _reset = async () => {
        var topic = this.state.topic;
        await Database.resetWeekness(topic);
    }

    resetWeekness = () => {
        Alert.alert("Hold on!", "Reset Weekness will reset all your progress, proceed?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
                this._reset();
                // const { navigate } = this.props.navigation;
                this._init();
                Toast.show({
                    text: "Weekness Reset Done!",
                    duration: 2000
                })
                // navigate("WeeknessDetails");
              }}
          ]);
    }

    static navigationOptions = {
        title: 'WeeknessDetails',
        headerShown: false,
    };
    

    renderWeeknessDetails() {
        const { navigate } = this.props.navigation;
        const { route } = this.props;

        return (
            <Container>
            <CustomHeader
                    navigation={this.props.navigation}
                    title="Details"
                    backButtonTo="Weekly"/>

            <LinearGradient
                      colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                      style={styles.linearGradient}
                      >
                    <Row size={1}></Row>
                    <Row size={3} style={{ flex:1, justifyContent:"center"}}>
                        <Text style={styles.titleText}>{this.state.day}</Text>
                    </Row>
                    <Row size={1}></Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={styles.text}>{this.state.statistics}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                    </Row>
                    <Row size={1}>
                        <Col size={1}></Col>
                        <Col size={8}>
                            <Text style={styles.text}>{this.state.remaining}</Text>
                        </Col>
                    </Row>
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block start onPress={this.resetWeekness}>
                            <Text uppercase={false} style={styles.text}>Reset Weekness</Text>
                        </Button>
                    </Row>
                    <Row size={1}>
                    </Row>
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block start onPress={this.checkCards}>
                            <Text uppercase={false} style={styles.text}>Check Cards</Text>
                        </Button>
                    </Row>
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block start onPress={this.startReview}>
                            <Text uppercase={false} style={styles.text}>Start Review</Text>
                        </Button>
                    </Row>
                    <Row size={1}></Row>
                       
              </LinearGradient>
          </Container>
        );

    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderWeeknessDetails() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text>Loading</Text>
                </LinearGradient>
        )
        

    }

}
