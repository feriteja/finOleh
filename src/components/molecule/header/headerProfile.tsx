import React from 'react';
import {StyleSheet, TextInput, Text, View, Dimensions} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../assets/theme/light';

const {height, width} = Dimensions.get('window');

interface Props {
  data: {recomendation: string};
}

const header: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>@ myNameHere </Text>
      </View>
      <View style={styles.navIcon}>
        <IonIcon
          style={styles.iconStyle}
          name="heart"
          size={25}
          color={Colors.gray4}
        />
        <IonIcon
          style={styles.iconStyle}
          name="mail"
          size={25}
          color={Colors.gray4}
        />
        <IonIcon
          style={styles.iconStyle}
          name="notifications"
          size={25}
          color={Colors.gray4}
        />
      </View>
    </View>
  );
};

export default header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    top: 30,
    height: 50,
    width,
    zIndex: 999,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  inputContainer: {
    borderWidth: 0.4,
    borderColor: Colors.gray6,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: Colors.gray7,
  },
  textInput: {
    width: 230,
    height: 30,
    padding: 0,
    marginLeft: 5,
    alignSelf: 'baseline',
  },
  navIcon: {
    flexDirection: 'row',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconStyle: {
    textShadowColor: '#ababab',
    textShadowRadius: 1,
    textShadowOffset: {height: 0.4, width: 0.4},
  },
});
