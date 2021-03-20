import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  height?: number;
  width?: number;
  backgroundColor?: string;
}

const gap: React.FC<Props> = ({
  height = 0,
  width = 0,
  backgroundColor = 'transparent',
}) => {
  return <View style={{height, width, backgroundColor}} />;
};

export default gap;
