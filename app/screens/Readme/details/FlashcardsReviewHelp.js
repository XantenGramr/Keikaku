import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Title, Header, Text, Body, ListItem, CheckBox, Content, Left, Container, Toast } from 'native-base';
import { Card, CardItem, Thumbnail, Button, Icon, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RText from './customtext/RText';
import styles from '../../../components/Styles';

export default class FlashcardsReviewHelp extends React.Component {
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
                    <Text style={styles.readmeTitle}>Flashcard Concept</Text>

                    <Text> </Text><Text> </Text><Text> </Text>
                    <RText>Keikaku's main function is to help you schedule </RText>
                    <RText>and divide your reviewers for N4.  </RText>
                    <RText>No algorithms included for checking your answer.  </RText>
                    <Text> </Text>
                    <Text style={styles.readmeTitle}>How to use the flashcards </Text>
                    <Text> </Text>

                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/flashcards.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>
                    <Text> </Text>

                    <RText>Functions:</RText>
                    <Text> </Text>
                    <RText>1. Swipe Left / Swipe Right</RText>
                    <RText> This will allow you to move through the cards.</RText>
                    <RText> Swiping right will move you to the next card and  </RText>
                    <RText> Swiping left will move you back to the previous card.</RText>
                    <Text> </Text>
                    <RText>2. Touch the card</RText>
                    <RText> Touching the card will flip the card and show you the back side.</RText>
                    <RText> Touching it again will flip you back to the front side.</RText>

                    <Text> </Text>
                    <RText>2. Incorrect and Correct Button</RText>
                    <RText> 
                        The point of these buttons is to record all your incorrect answers 
                        so you can review them again until you master it.
                    </RText>
                    <RText>
                        The correct answers will not be shown anymore until
                        you either Reset Progress or Randomize.
                    </RText>
                    <Text> </Text>
                    <RText>
                        ***Note: you can change to incorrect or correct any number of times
                        until you press the back button on the top left or until you close the app.
                    </RText>
                    <Text> </Text><Text> </Text>
                    <RText></RText>
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

