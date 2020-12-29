import React from 'react';
import { Text } from 'native-base';
import styles from '../../../../components/Styles';

const RText = (props) => {
    return (
         <Text style={styles.readmeText} {...props} >{props.children}</Text>
    )
 }

 export default RText;