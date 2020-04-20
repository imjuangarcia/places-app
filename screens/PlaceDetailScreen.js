import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PlaceDetailScreen = (props) => {
  const test = true;

  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = (navData) => ({
  headerTitle: navData.navigation.getParam('placeTitle'),
});

const styles = StyleSheet.create({});

export default PlaceDetailScreen;
