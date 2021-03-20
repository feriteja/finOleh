import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
  Image,
  ImageURISource,
} from 'react-native';
import Colors from '../../../assets/theme/light';

const {width, height} = Dimensions.get('window');

interface dataObj {
  name: string;
  img: ImageURISource;
}

interface Props {
  data: Array<dataObj>;
}

const banner: React.FC<Props> = ({data}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={{height: 270}}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <Image
                source={item.img}
                style={{height: 300, width, resizeMode: 'cover'}}
              />
              <View style={styles.bannerTitle}>
                <Text style={styles.textTitle}>{item.name}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default banner;

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  dot: {
    height: 15,
    width: 15,
    backgroundColor: 'blue',
    borderRadius: 999,
    marginHorizontal: 5,
  },
  bannerTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 40,
    width: undefined,
    backgroundColor: Colors.secondary6,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopRightRadius: 20,
  },
  textTitle: {
    fontSize: 17,
    color: '#111',
    fontWeight: 'bold',
    textShadowColor: '#ababab',
    textShadowRadius: 1,
    textShadowOffset: {height: 0.4, width: 0.4},
  },
});
