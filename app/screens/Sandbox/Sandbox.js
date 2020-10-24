import React from 'react';
import { Body, Container, Title, H1, Content, Text, Thumbnail, StyleProvider, Button, List, ListItem, ListView } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Database from '../../database/Database';
import CardFlip from 'react-native-card-flip';

export default class Sandbox extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
    }

    static navigationOptions = {
        title: 'Sandbox',
        headerShown: false,
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <LinearGradient
                    colors={['#4c44d7', '#3c3cff', '#02b4d9' ]}
                    style={styles.linearGradient}
                    >
                <CardFlip style={styles.cardContainer}
                flipDirection={'x'}
                 ref={card => (this.card = card)}>
                    <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.card, styles.card1]}
                    onPress={() => this.card.flip()}>
                    <Text style={styles.label}>AB</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.card, styles.card2]}
                    onPress={() => this.card.flip()}>
                    <Text style={styles.label}>CD</Text>
                    </TouchableOpacity>
                </CardFlip>
            
                     
            </LinearGradient>
        )
        

    }

}

const styles = StyleSheet.create({
    objects: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    linearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    cardContainer: {
      width: 320,
      height: 470,
    },
    card: {
      width: 320,
      height: 470,
      backgroundColor: '#FE474C',
      borderRadius: 5,
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.5,
    },
    card1: {
      backgroundColor: '#FE474C',
    },
    card2: {
      backgroundColor: '#FEB12C',
    },
    label: {
      lineHeight: 470,
      textAlign: 'center',
      fontSize: 55,
      fontFamily: 'System',
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
  });
  