import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const confirmPurchase: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Confirm</Text>
    </View>
  );
};

export default confirmPurchase;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
