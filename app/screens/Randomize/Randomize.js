import React, { useState } from 'react';
import { Body, Title, Header, Text, Button, ListItem, CheckBox, Icon, Left, Container, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import styles from '../../components/Styles';
import CustomHeader from '../../components/CustomHeader';

export default class Randomize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            isReady: false,
            sun: false,
            mon: false,
            tue: false,
            wed: true,
            thu: true,
            fri: true,
            sat: false,
        }
    }

    componentDidMount() {
        console.log("Randomize Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        await Database.openDatabase();
        
        let states = await Database.getStates();
        var length = states.length;
        
        for (var i = 0; i < length; ++i) {
            var day = states.item(i).day;
            var status = states.item(i).status ? true : false;

            switch (day) {
                case 'Sunday':
                    this.setState({sun: status});
                    break;
                case 'Monday':
                    this.setState({mon: status});
                    break;
                case 'Tuesday':
                    this.setState({tue: status});
                    break;
                case 'Wednesday':
                    this.setState({wed: status});
                    break;
                case 'Thursday':
                    this.setState({thu: status});
                    break;
                case 'Friday':
                    this.setState({fri: status});
                    break;
                case 'Saturday':
                    this.setState({sat: status});
                    break;
            }
        }
        
        this.setState({isReady: true});
    }

    getDayArray = async () => {
        var days = [];
        var day = "";
        var state = 0;
        var sqlQuery = "";

        day = "Sunday";
        state = this.state.sun;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Monday";
        state = this.state.mon;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Tuesday";
        state = this.state.tue;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Wednesday";
        state = this.state.wed;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Thursday";
        state = this.state.thu;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Friday";
        state = this.state.fri;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        day = "Saturday";
        state = this.state.sat;
        if (state) {
            days.push(day);
        }
        await Database.updateState(day, state);

        return days;
    }

    _randomize = async () => {
        let totalItems = await Database.generateCopyTableAndCountItems();
        console.log(totalItems);
      
        var days = await this.getDayArray();
        var numberOfDays = days.length;

        var topics = ['Kanji', 'Verb', 'Vocab'];
        for( var i = 0; i < totalItems.length; ++i) {
            console.log(totalItems[i]);
            var totalItem = totalItems[i];
            var quotient = Math.floor(totalItem / numberOfDays);
            var modulo = totalItem % numberOfDays;

            for( var j = 0; j < numberOfDays; ++j) {
                let limit = 0;
                if (modulo > 0) {
                    limit = quotient + 1;
                    --modulo;
                } else {
                    limit = quotient;
                }
                await Database.generateScheduledTable(days[j], limit, topics[i]);
            }
        }
    }

    randomize = () => {
        Alert.alert("Hold on!", "Randomize will reset all your progress, proceed?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => {
                this._randomize();
                const { navigate } = this.props.navigation;
                Toast.show({
                    text: "Data Randomized!",
                    duration: 2000
                })
                navigate("Home");
              }}
          ]);
    }

    static navigationOptions = {
        title: 'Randomize',
        headerShown: false,
    };

    renderSchedule() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <CustomHeader
                    navigation={this.props.navigation}
                    title="Schedule"
                    backButtonTo="Home"/>
          <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
            <ListItem onPress={() => this.setState({ sun: !this.state.sun })}>
                     <CheckBox checked={this.state.sun}/>
                     <Body>
                         <Text style={styles.listText}>Sunday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ mon: !this.state.mon })}>
                     <CheckBox checked={this.state.mon} onPress={() => this.setState({ mon: !this.state.mon })}/>
                     <Body>
                         <Text style={styles.listText}>Monday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ tue: !this.state.tue })}>
                     <CheckBox checked={this.state.tue} onPress={() => this.setState({ tue: !this.state.tue })}/>
                     <Body>
                         <Text style={styles.listText}>Tueday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ wed: !this.state.wed })}>
                     <CheckBox checked={this.state.wed} onPress={() => this.setState({ wed: !this.state.wed })}/>
                     <Body>
                         <Text style={styles.listText}>Wednesday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ thu: !this.state.thu })}>
                     <CheckBox checked={this.state.thu} onPress={() => this.setState({ thu: !this.state.thu })}/>
                     <Body>
                         <Text style={styles.listText}>Thursday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ fri: !this.state.fri })}>
                     <CheckBox checked={this.state.fri} onPress={() => this.setState({ fri: !this.state.fri })}/>
                     <Body>
                         <Text style={styles.listText}>Friday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ sat: !this.state.sat })}>
                     <CheckBox checked={this.state.sat} onPress={() => this.setState({ sat: !this.state.sat })}/>
                     <Body>
                         <Text style={styles.listText}>Saturday</Text>
                     </Body>
                 </ListItem>
                 <Grid>
                     <Row size={1}></Row>
                     <Row size={1}>
                        <Button style={{flex:1}} large rounded block randomize onPress={this.randomize}>
                            <Text uppercase={false} style={styles.text}>Randomize</Text>
                        </Button>
                     </Row>
                     <Row size={1}>
                        <Button style={{flex:1}} large rounded block goback onPress={() => navigate('Home')}>
                            <Text uppercase={false} style={styles.text}>Go Back</Text>
                        </Button>
                     </Row>
                     <Row size={1}></Row>
                 </Grid>
                     
            </LinearGradient>
        </Container>
            
    );
    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderSchedule() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text style={styles.text}>Loading</Text>
                </LinearGradient>
        )
    }

}

