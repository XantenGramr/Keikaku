import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    objects: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    linearGradient: {
        flex: 1,
    },

    card: {
        width: 320,
        height: 470,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.5,
    },

    headerText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 38,
        color:'white'
    },

    titleText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 65,
        color:'white'
    },

    text: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 38,
        color:'white'
    },

    listText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 25,
        color:'white'
    },

    cardListText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 25,
        color:'black'
    },
    tabText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 25,
        color:'black'
    },
    readmeText: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 30,
        color:'white'
    },
    readmeTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Lemon Juice',
        fontSize: 40,
        color:'white'
    },
});

export default styles;