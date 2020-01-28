import React, {Component} from 'react';
import {Body, Card, CardItem, Text} from 'native-base';
import {StyleSheet} from 'react-native';

export default class Waiting extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <Text style={styles.warning}>Loading... Pls wait!</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  warning: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
  card: {
    margin: 1,
  },
});
