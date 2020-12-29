import React, { useState } from 'react';
import { Tabs, Tab, ScrollableTab, Footer, FooterTab, Text, Button, ListItem, CheckBox, Icon, Left, Container, Toast } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import styles from '../../components/Styles';
import CustomHeader from '../../components/CustomHeader';

import Intro from './details/Intro';
import RandomizeHelp from './details/RandomizeHelp';
import CardScheduleHelp from './details/CardScheduleHelp';
import FlashcardsReviewHelp from './details/FlashcardsReviewHelp';
import WeeknessHelp from './details/WeeknessHelp';

export default class Randomize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            lastPage: props.navigation.state.params.currentPage,
        }
    }

    componentDidMount() {
        console.log("Readme Screen Init");
        this._init();
        return true;
    }

    goHome = () => {
        const { navigate } = this.props.navigation;
        navigate("Home");
    }

    _init = async () => {
        this.setState({isReady: true});
    }

    static navigationOptions = {
        title: 'Readme',
        headerShown: false,
    };

    renderReadme() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <CustomHeader
                    navigation={this.props.navigation}
                    title="Readme"
                    backButtonTo={this.state.lastPage}
                    isReadme="true"/>
          <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="Intro">
                        <Intro/>
                    </Tab>
                    <Tab heading="Randomize">
                        <RandomizeHelp/>
                    </Tab>
                    <Tab heading="Cards Schedules">
                        <CardScheduleHelp/>
                    </Tab>
                    <Tab heading="Flashcards Review">
                        <FlashcardsReviewHelp/>
                    </Tab>
                    <Tab heading="Weekness">
                        <WeeknessHelp/>
                    </Tab>
                </Tabs>
                     
            </LinearGradient>
            <Footer>
            <FooterTab>
                <Button onPress={this.goHome} full>
                    <Text>Start Keikaku!</Text>
                </Button>
            </FooterTab>
            </Footer>
        </Container>
            
    );
    }

    render() {
        const { navigate } = this.props.navigation;

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

