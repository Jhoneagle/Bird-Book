import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Text,
  Button,
  List,
  ListItem,
  Item,
  Picker,
  Icon,
  Form,
  Card,
  CardItem,
} from 'native-base';
import {connect} from 'react-redux';
import {updateSort} from '../reducers/SortReducer';
import {format} from 'date-fns';

class ListObservationsView extends Component {
  static navigationOptions = {
    title: 'Bird observations',
  };

  onValueChange(value: string) {
    this.props.updateSort(value);
  }

  render() {
    return (
      <Container>
        <Button
          transparent
          style={styles.navigationButton}
          onPress={() => {
            this.props.navigation.navigate('NewObservation');
          }}>
          <Text>Add new observation</Text>
        </Button>

        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={styles.picker}
              placeholder="Select type: "
              placeholderStyle={styles.picker_placeholder}
              placeholderIconColor="#007aff"
              selectedValue={this.props.sorter}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Time" value="time" />
              <Picker.Item label="Species" value="name" />
              <Picker.Item label="Rarity" value="rarity" />
            </Picker>
          </Item>
        </Form>
        <List
          initialNumToRender={7}
          dataArray={this.props.observations}
          renderRow={item => (
            <ListItem>
              <Card>
                <CardItem header>
                  <Text>{item.species}</Text>
                </CardItem>
                <CardItem>
                  <Text>{format(new Date(item.timestamp), 'PPpp')}</Text>
                </CardItem>
                <CardItem>
                  <Text>{item.notes}</Text>
                </CardItem>
                <CardItem>
                  <Text>{item.rarity}</Text>
                </CardItem>
                <CardItem footer>
                  <Text>
                    latitude: {item.latitude} and longitude: {item.longitude}
                  </Text>
                </CardItem>
              </Card>
            </ListItem>
          )}
          keyExtractor={(item, index) => item.species + index}
          extraData={this.props.refresh}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: undefined,
    margin: 5,
  },
  picker_placeholder: {
    color: '#bfc6ea',
  },
  navigationButton: {
    alignSelf: 'center',
    margin: 30,
  },
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  function sortArray(array, by) {
    if (by === 'time') {
      return Array.from(array).sort(function(a, b) {
        const aTime = new Date(a.timestamp);
        const bTime = new Date(b.timestamp);

        if (aTime < bTime) {
          return 1;
        } else if (aTime > bTime) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (by === 'name') {
      return Array.from(array).sort(function(a, b) {
        return a.species.localeCompare(b.species);
      });
    } else if (by === 'rarity') {
      return Array.from(array).sort(function(a, b) {
        if (a.rarity === b.rarity) {
          return a.species.localeCompare(b.species);
        } else if (
          a.rarity === 'Common' ||
          (a.rarity === 'Rare' && b.rarity === 'Extremely rare')
        ) {
          return 1;
        } else {
          return -1;
        }
      });
    } else {
      return Array.from(array);
    }
  }

  const sorted = sortArray(state.observations, state.sorter);
  const refresh = state.observations !== sorted;

  return {
    observations: sorted,
    sorter: state.sorter,
    refresh: refresh,
  };
};

export default connect(
  mapStateToProps,
  {updateSort},
)(ListObservationsView);
