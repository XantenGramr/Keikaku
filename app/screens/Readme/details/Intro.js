import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Title, Header, Text, Body, ListItem, CheckBox, Content, Left, Container, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RText from './customtext/RText';
import styles from '../../../components/Styles';

export default class Intro extends React.Component {
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
                        <Text style={styles.readmeTitle}>Welcome to Keikaku!</Text>
                        <Text> </Text><Text> </Text><Text> </Text>
                        <RText>This is a Flashcard app for N4</RText>
                        <Text> </Text><Text> </Text>
                        <RText>Contains 3 topics:</RText>
                        <Text> </Text>
                        <RText>1. Kanji</RText>
                        <RText>   Format: </RText>
                        <RText>      Front of the card : Kanji</RText>
                        <RText>      Back of the card  : Furigana and English</RText>
                        <Text> </Text><Text> </Text>
                        <RText>2. Verb</RText>
                        <RText>   Format: </RText>
                        <RText>      Front of the card : Kanji and Furigana</RText>
                        <RText>      Back of the card  : English</RText>
                        <Text> </Text><Text> </Text>
                        <RText>3. Vocabularies</RText>
                        <RText>   Format: </RText>
                        <RText>      Front of the card : English</RText>
                        <RText>      Back of the card  : Furigana</RText>
                        <Text> </Text><Text> </Text>
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

