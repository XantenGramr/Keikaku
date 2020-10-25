import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header, Icon, Button, Left, Body, Title } from 'native-base';

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate(this.props.backButtonTo);
    }

    render() {
        if (this.props.backButtonTo) {
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
        } else {
            return (
                <Header>
                    <Left>
                    </Left>
                    <Body>
                        <Title style={styles.text}>{this.props.title}</Title>
                    </Body>
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