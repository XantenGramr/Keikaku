import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Header, Icon, Button, Left, Body, Title, Right } from 'native-base';

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate(this.props.backButtonTo);
    }

    goToReadme = () => {
        const { navigate } = this.props.navigation;
        navigate('Readme', {
            currentPage: this.props.currentPage,
        });
    }

    render() {
        if (this.props.isReadme) {
            return (
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name="arrow-back" type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.text}>{this.props.title}</Title>
                    </Body>
                </Header>
            );
        }
        else if (this.props.backButtonTo) {
            return (
                <Header>
                    <Left>
                        <Button transparent onPress={this.goBack}>
                            <Icon name="arrow-back" type="Ionicons" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.text}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button block onPress={this.goToReadme}>
                            <Icon name="book" type="Ionicons" />
                        </Button>
                    </Right>
                </Header>
            );
        } else {
            return (
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title style={styles.text}>{this.props.title}</Title>
                    </Body>
                    <Right>
                        <Button block onPress={this.goToReadme}>
                            <Icon name="book" type="Ionicons" />
                            <Text uppercase={false} style={styles.text}>Readme!</Text>
                        </Button>
                    </Right>
                </Header>
            );
        }
        
    }
}


const styles = StyleSheet.create({
    text: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 50
    }
});