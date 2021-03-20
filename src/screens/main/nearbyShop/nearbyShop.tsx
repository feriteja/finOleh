import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const nearbyShop: React.FC = ({navigation}) => {
  const [myLocation, setMyLocation] = useState<any>(null);

  const mapRef = useRef<MapView>(null);

  const checkGPS = async () => {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: 'Use Location ?',
      ok: 'YES',
      cancel: 'NO',
    });

    if (Object.is(check.status, 'enabled')) {
      Geolocation.getCurrentPosition(
        (info) => {
          setMyLocation(info);
        },
        (error) => {
          navigation.navigate('home');
          console.warn('GPS no response');
        },
        {enableHighAccuracy: true, timeout: 40000},
      );

      Geolocation.watchPosition(
        (a: any) => {
          setMyLocation(a);
        },
        (error: any) => {},
        {
          enableHighAccuracy: true,
          timeout: 1000,
          distanceFilter: 0,
          maximumAge: 0,
        },
      );
    }
  };

  // const watchPosition = () => {

  // };

  useEffect(() => {
    checkGPS();
    // watchPosition();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  if (myLocation == null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>wait</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsCompass={true}
        style={{height: height * 1.25, width}}
        initialRegion={{
          latitude: myLocation?.coords?.latitude || 0,
          longitude: myLocation?.coords?.longitude || 0,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}></MapView>
      <TouchableOpacity
        onPress={() =>
          mapRef?.current?.animateCamera({
            center: {
              latitude: myLocation?.coords?.latitude,
              longitude: myLocation?.coords?.longitude,
            },
          })
        }
        style={{position: 'absolute', top: 50, right: 20}}>
        <IconMaterial name="my-location" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default nearbyShop;
