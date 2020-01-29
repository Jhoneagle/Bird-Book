import React, {PureComponent} from 'react';
import {Card, CardItem, Text} from 'native-base';
import {format} from 'date-fns';
import {StyleSheet, View} from 'react-native';

export default class Observation extends PureComponent {
  render() {
    const item = this.props.item;

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Name: {item.species}</Text>
          </CardItem>
          <CardItem>
            <Text>
              Observation done: {format(new Date(item.timestamp), 'PPpp')}
            </Text>
          </CardItem>
          <CardItem>
            <Text>Rarity: {item.rarity}</Text>
          </CardItem>
          <CardItem bordered>
            <Text numberOfLines={3}>{item.notes}</Text>
          </CardItem>
          <View style={styles.toRow}>
            <CardItem footer>
              <Text>Latitude: {item.latitude.substring(0, 9)}</Text>
            </CardItem>
            <CardItem footer>
              <Text>Longitude: {item.longitude.substring(0, 9)}</Text>
            </CardItem>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  toRow: {
    flexDirection: 'row',
  },
});
