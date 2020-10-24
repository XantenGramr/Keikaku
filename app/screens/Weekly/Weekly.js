import React from 'react';
import { Body, Container, Left, Icon, Title, Header, Content, Text, Thumbnail, StyleProvider, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';

export default class Weekly extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: false,
            topic: props.navigation.state.params.topic,
            days: [],
            commands: [
                () => this.goToCards(0),
                () => this.goToCards(1),
                () => this.goToCards(2),
                () => this.goToCards(3),
                () => this.goToCards(4),
                () => this.goToCards(5),
                () => this.goToCards(6)
            ],
        }
        console.log(this.state.topic);
    }

    componentDidMount() {
        console.log("Weekly Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        await Database.openDatabase();
        let results = await Database.getKanjiStates();
        var length = results.length;
        var days = [];

        for (var i = 0; i < length; ++i) {
            var name = results.item(i).day;
            var status = results.item(i).status;
            var day = {
                id: i,
                day: name,
                status: status,
                action: this.state.commands[i],
            };
            days.push(day);
        }
        this.setState({days: days});
        this.setState({isReady: true});
    }

    static navigationOptions = {
        title: 'Weekly',
        headerShown: false,
    };

    goToCards = (name) => {
        console.log(name);
        const { navigate } = this.props.navigation;
        navigate('DeckDetails', {
            day: name,
        })
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate("Home");
    }

    renderWeekly() {
        const { navigate } = this.props.navigation;
        const { route } = this.props;
        const days = this.state.days;
        const renderedButtons = days.map(d => {
            if (d.status === 0) {
                return (
                    <Row size={1} key={d.id}>
                    </Row>
                );
            } else {
                return (
                    <Row size={1} key={d.id}>
                            <Button style={{flex:1}} large rounded block onPress={d.action}>
                            <Text style={{fontFamily: 'PineappleParty'}}>{d.day}</Text>
                        </Button>
                    </Row>
                );
            }
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
                <Title>{this.state.topic}</Title>
              </Body>
  
            </Header>
            <LinearGradient
                      colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                      style={styles.linearGradient}
                      >
                    <Row size={1}></Row>
                    {renderedButtons}
                    <Row size={1}>
                        <Button style={{flex:1}} large rounded block disabled sunday>
                            <Text style={{fontFamily: 'PineappleParty'}}>WEEKness</Text>
                        </Button>
                    </Row>
                    <Row size={1}></Row>
                       
              </LinearGradient>
          </Container>
        );

    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderWeekly() : (
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