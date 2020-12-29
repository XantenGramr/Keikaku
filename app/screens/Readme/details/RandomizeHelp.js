import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Title, Header, Text, Body, ListItem, CheckBox, Content, Left, Container, Toast } from 'native-base';
import { Card, CardItem, Thumbnail, Button, Icon, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RText from './customtext/RText';
import styles from '../../../components/Styles';

export default class RandomizeHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        }
    }

    componentDidMount() {
        console.log("Readme Screen Init");
        this._init();
        return true;
    }

    _init = async () => {
        this.setState({isReady: true});
    }

    renderReadme() {
        return (
        <Container>
          <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                <ScrollView>
                    <Text style={styles.readmeTitle}>Randomize your flashcards!</Text>

                    <Text> </Text><Text> </Text><Text> </Text>
                    <RText>Randomize will let you divide the cards into </RText>
                    <RText>your preferred schedule equally and randomly </RText>
                    <Text> </Text>
                    <RText>Example: </RText>
                    <RText>   You have 100 cards and wants to review </RText>
                    <RText>   on Weekends. </RText>
                    <Text> </Text>
                    <RText>   Randomize will randomly pick cards</RText>
                    <RText>   and set them on the specified days.</RText>
                    <RText>   50 cards on Saturday</RText>
                    <RText>   50 cards on Sunday</RText>
                    <Text> </Text><Text> </Text>

                    <Text style={styles.readmeTitle}>How to Randomize</Text>
                    <Text> </Text>
                    <RText>1. From Home press the Randomize button</RText>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/home_to_randomize.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>

                    <Text> </Text>
                    <RText>2. In the Randomize Screen you can do the ff: </RText>
                    <Text> </Text>
                    <RText>2.1. Set your schedule, check the days you want </RText>
                    <RText>2.2. Once set, click Randomize </RText>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/randomize_steps.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>
                </ScrollView>
            </LinearGradient>
        </Container>
            
    );
    }

    render() {
        return this.state.isReady ? this.renderReadme() : (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                     <Text style={styles.text}>Loading</Text>
                </LinearGradient>
        )
    }

}

