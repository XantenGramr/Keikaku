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

    text: {
        fontFamily: Platform.OS === 'ios' ? 'Pineapple Party - Personal Use' : 'Bittermilk'
    }
});

export default styles;