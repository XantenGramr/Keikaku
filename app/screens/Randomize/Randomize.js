import React, { useState } from 'react';
import { Body, Container, Title, Header, Content, Text, Thumbnail, StyleProvider, Button, ListItem, CheckBox } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import styles from './styles/styles';

export default class Randomize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        
        let kanjiStates = await Database.getKanjiStates();
        var length = kanjiStates.length;
        
        for (var i = 0; i < length; ++i) {
            var day = kanjiStates.item(i).day;
            var status = kanjiStates.item(i).status ? true : false;

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
        await Database.updateKanjiState(day, state);

        day = "Monday";
        state = this.state.mon;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        day = "Tuesday";
        state = this.state.tue;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        day = "Wednesday";
        state = this.state.wed;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        day = "Thursday";
        state = this.state.thu;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        day = "Friday";
        state = this.state.fri;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        day = "Saturday";
        state = this.state.sat;
        if (state) {
            days.push(day);
        }
        await Database.updateKanjiState(day, state);

        return days;
    }

    _randomize = async () => {
        let totalItems = await Database.generateCopyTableAndCountItems();
        console.log(totalItems);
      
        var days = await this.getDayArray();
        var numberOfDays = days.length;

        var quotient = Math.floor(totalItems / numberOfDays);
        var modulo = totalItems % numberOfDays;

        for( var i = 0; i < numberOfDays; ++i) {
            let limit = 0;
            if (modulo > 0) {
                limit = quotient + 1;
                --modulo;
            } else {
                limit = quotient;
            }
            await Database.generateScheduledTable(days[i], limit);
        }
    }

    randomize = () => {
        // Alert.alert("Hold on!", "Are you sure you want to go randomize?", [
        //     {
        //       text: "Cancel",
        //       onPress: () => null,
        //       style: "cancel"
        //     },
        //     { text: "YES", onPress: () => {
        //         this._randomize();
        //         const { navigate } = this.props.navigation;
        //         navigate("Weekly");
        //       }}
        //   ]);
        this._randomize();
    }


    static navigationOptions = {
        title: 'Randomize',
        headerShown: false,
    };

    renderSchedule() {
        const { navigate } = this.props.navigation;
        return (
            <LinearGradient
                colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                style={styles.linearGradient}
                >
                 <ListItem onPress={() => this.setState({ sun: !this.state.sun })}>
                     <CheckBox checked={this.state.sun}/>
                     <Body>
                         <Text>Sunday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ mon: !this.state.mon })}>
                     <CheckBox checked={this.state.mon}/>
                     <Body>
                         <Text>Monday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ tue: !this.state.tue })}>
                     <CheckBox checked={this.state.tue}/>
                     <Body>
                         <Text>Tueday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ wed: !this.state.wed })}>
                     <CheckBox checked={this.state.wed}/>
                     <Body>
                         <Text>Wednesday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ thu: !this.state.thu })}>
                     <CheckBox checked={this.state.thu}/>
                     <Body>
                         <Text>Thursday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ fri: !this.state.fri })}>
                     <CheckBox checked={this.state.fri}/>
                     <Body>
                         <Text>Friday</Text>
                     </Body>
                 </ListItem>
                 <ListItem onPress={() => this.setState({ sat: !this.state.sat })}>
                     <CheckBox checked={this.state.sat}/>
                     <Body>
                         <Text>Saturday</Text>
                     </Body>
                 </ListItem>
                 <Grid>
                     <Row size={1}></Row>
                     <Row size={1}>
                        <Button style={{flex:1}} large rounded block randomize onPress={this.randomize}>
                            <Text style={{fontFamily: 'PineappleParty'}}>Randomize</Text>
                        </Button>
                     </Row>
                     <Row size={1}>
                        <Button style={{flex:1}} large rounded block goback onPress={() => navigate('Home')}>
                            <Text style={{fontFamily: 'PineappleParty'}}>Go Back</Text>
                        </Button>
                     </Row>
                     <Row size={1}></Row>
                 </Grid>
            </LinearGradient>
    );
    }

    render() {
        const { navigate } = this.props.navigation;

        return this.state.isReady ? this.renderSchedule() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text>Loading</Text>
                </LinearGradient>
        )
    }

}

