import React from 'react';
import {
  TouchableOpacity,
  BackHandler,
  DeviceEventEmitter,
  ToastAndroid,
  View,
  Text,
} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Cart, Home, NearbyShop, Profile} from '../../screens/main';
import IonIcon from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather';
import Colors from '../../assets/theme/light';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {useSelector} from 'react-redux';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

export type bottomParamList = {
  home: undefined;
  nearbyShop: undefined;
  cart: undefined;
  profile: undefined;
};

interface Props {
  navigation: any;
}

const Toast = ({visible, message}: {visible: Boolean; message: string}) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    return null;
  }
  return null;
};

const BottomNav = createBottomTabNavigator<bottomParamList>();

const mainRoute: React.FC<Props> = ({navigation}) => {
  const auth = useSelector((state) => state.auth);
  const cart: [] = useSelector((state) => state.cart);

  const checkGPS = async () => {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: 'Use Location ?',
      ok: 'YES',
      cancel: 'NO',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, //true => To prevent the location services window from closing when it is clicked outside
      preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    }).catch((error: any) => error);

    return Object.is(check.status, 'enabled');
  };

  const toTheMapScreen = async () => {
    const permission = await checkGPS();

    permission ? (
      navigation.navigate('nearbyShop')
    ) : (
      <Toast visible message="Denied" />
    );
  };

  const checkPermissionMap = () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.warn(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then((result) => {
                if (result == RESULTS.GRANTED) {
                  toTheMapScreen();
                }
              })
              .catch(() => console.warn('rejected'));

            break;
          case RESULTS.LIMITED:
            console.warn(
              'The permission is limited: some actions are possible',
            );
            break;
          case RESULTS.GRANTED:
            toTheMapScreen();
            break;
          case RESULTS.BLOCKED:
            console.warn(
              'The permission is denied and not requestable anymore',
            );
            break;
        }
      })
      .catch((error) => {
        // …
      });
  };

  return (
    <BottomNav.Navigator tabBarOptions={{activeTintColor: Colors.secondary}}>
      <BottomNav.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <IonIcon name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="nearbyShop"
        component={NearbyShop}
        options={{
          tabBarLabel: 'Nearby Shop',
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => checkPermissionMap()} />
          ),
          tabBarIcon: ({color, size}) => (
            <IconFA5 name="store-alt" size={25} color={color} />
          ),
        }}
      />
      <BottomNav.Screen
        name="cart"
        component={Cart}
        options={{
          tabBarLabel: 'My Cart',
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() =>
                auth.auth
                  ? navigation.navigate('cart')
                  : navigation.navigate('profile')
              }
            />
          ),
          tabBarIcon: ({color, size}) => (
            <View>
              {cart.length > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -10,
                    top: -3,
                    backgroundColor: Colors.primary3,
                    borderRadius: 999,
                    zIndex: 99,
                    padding: 3,
                  }}>
                  <Text style={{color: Colors.gray7, fontSize: 11}}>
                    {cart.length}
                  </Text>
                </View>
              )}
              <IconFeather name="shopping-bag" size={25} color={color} />
            </View>
          ),
        }}
      />
      <BottomNav.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <IconFeather name="user" size={25} color={color} />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

export default mainRoute;
