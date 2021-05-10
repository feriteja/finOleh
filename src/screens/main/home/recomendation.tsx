import React from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../assets/theme/light';
import {Gap, ItemCard} from '../../../components';
import {useNavigation} from '@react-navigation/core';
import {item} from 'constants/types/dataTypes';
import {homeNavProp} from 'constants/types/navigatorTypes';

interface Props {
  data: item[];
}

const recomendation: React.FC<Props> = ({data}) => {
  const navigation = useNavigation<homeNavProp>();

  return (
    <View>
      <View style={styles.topContainer}>
        <Text style={styles.title}>For You</Text>
        {/* <Pressable onPress={() => console.warn('See more')}>
          <Text style={styles.seeMore}>See more</Text>
        </Pressable> */}
      </View>
      <View style={styles.content}>
        <FlatList
          // horizontal
          keyExtractor={(item, idx) => idx.toString()}
          data={data}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <Gap height={10} />}
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('itemDetail', {item: item});
                }}>
                <ItemCard item={item} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default recomendation;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  seeMore: {
    color: Colors.primary2,
  },
  content: {paddingHorizontal: 10},
  cardContainer: {
    height: 150,
    width: 100,
    borderRadius: 7,
    backgroundColor: 'red',
  },
});
