import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {bottomParamList} from 'config/router/mainRoute';
import {rootParamList} from 'config/router/index';

export type homeNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<bottomParamList, 'home'>,
  StackNavigationProp<rootParamList>
>;
