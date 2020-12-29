import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Title, Header, Text, Body, ListItem, CheckBox, Content, Left, Container, Toast } from 'native-base';
import { Card, CardItem, Thumbnail, Button, Icon, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RText from './customtext/RText';
import styles from '../../../components/Styles';

export default class CardScheduleHelp extends React.Component {
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
                    <Text style={styles.readmeTitle}>Card Schedule</Text>

                    <Text> </Text><Text> </Text><Text> </Text>
                    <RText>After randomization, schedules can be seen </RText>
                    <RText>when you press any of the topic in home screen </RText>
                    <Text> </Text>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/home_to_topic.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>
                    <Text> </Text>

                    <RText>Inside the topic page:</RText>
                    <RText>Buttons will appear for each of the days </RText>
                    <RText>checked during the Randomization procedure </RText>
                    <Text> </Text>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/topic_page.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>
                    <Text> </Text>

                    <RText>Pressing any of those buttons will move you </RText>
                    <RText>to the Deck Details screen. </RText>
                    <RText>Deck Detail screen shows the progress for that day</RText>
                    <Text> </Text>
                    <Grid>
                        <Col size={1}></Col>
                        <Col size={2}>
                            <Image
                                resizeMode='stretch'
                                source={require('./images/details_page.png')}
                                style={{height: 400, width: 200}}/>
                        </Col>
                        <Col size={2}></Col>
                    </Grid>
                    <Text> </Text>

                    <RText>Details shown are the ff: </RText>
                    <RText> - Total Items</RText>
                    <RText> - Correct Items</RText>
                    <RText> - Incorrect Items</RText>
                    <RText> - Remaining Items</RText>
                    <RText> - Completed Items</RText>
                    <Text> </Text>
                    <RText>There are also buttons available in this screen </RText>
                    <RText>1. Reset Progress</RText>
                    <RText>   - This will remove all progress done for this day.</RText>
                    <RText>2. Check Cards</RText>
                    <RText>   - This will show a list of all the cards for this day.</RText>
                    <RText>2. Start Review</RText>
                    <RText>   - This will start the showing the flashcards.</RText>
                    <Text> </Text>
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

