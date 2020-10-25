import React, { Component } from 'react';
import { Header, Icon, Button, Left, Body, Title } from 'native-base';
import PropTypes from 'prop-types';

export default class CustomHeader extends Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate(this.props.backButtonTo);
    }

    render() {
        return (
            <Header>
                <Left>
                <Button transparent onPress={this.goBack}>
                    <Icon name="arrow-back" type="Ionicons" />
                </Button>
                </Left>
                <Body>
                    <Title>{this.props.title}</Title>
                </Body>
            </Header>
        );
    }
}