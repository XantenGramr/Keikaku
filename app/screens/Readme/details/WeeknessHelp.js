import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Title, Header, Text, Body, ListItem, CheckBox, Content, Left, Container, Toast } from 'native-base';
import { Card, CardItem, Thumbnail, Button, Icon, Right } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RText from './customtext/RText';
import styles from '../../../components/Styles';

export default class WeeknessHelp extends React.Component {
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
                    <Text style={styles.readmeTitle}>Weekness Concept</Text>

                    <Text> </Text><Text> </Text><Text> </Text>
                    <RText>Study style concept: </RText>
                    <RText>
                        All of your weakness (incorrect cards) will be compiled
                        in a single deck per topic.
                    </RText>
                    <RText>This will allow you to review all of your weakness at the end of the week.</RText>
                    <Text> </Text>
                    <Text style={styles.readmeTitle}>Suggested Usage of Weekness </Text>
                    <Text> </Text>
                    <RText>1. Randomize at the start of the week. </RText>
                    <RText>2. Make sure to review the cards on the selected days. </RText>
                    <RText>3. Review WEEKness at the end of the day. </RText>
                    <RText>4. Review WEEKness at the end of the week. </RText>
                    <RText>5. Repeat step 1 until all you strengthen all your weekness </RText>
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

