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
} from 'native-base';
import {connect} from 'react-redux';

class ListObservationsView extends Component {
  static navigationOptions = {
    title: 'Bird observations',
  };

  constructor(props) {
    super(props);
    this.state = {
      shorter: 'time',
    };
  }

  onValueChange(value: string) {
    this.setState({
      shorter: value,
    });
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
              selectedValue={this.state.shorter}
              onValueChange={this.onValueChange.bind(this)}>
              <Picker.Item label="Time" value="time" />
              <Picker.Item label="Species" value="name" />
              <Picker.Item label="Rarity" value="rarity" />
            </Picker>
          </Item>
        </Form>
        <List
          data={this.props.observations}
          renderItem={({item, index, separators}) => (
            <ListItem>
              <Text>
                I am {item.species} with {item.latitude} and {item.longitude}
              </Text>
            </ListItem>
          )}
          keyExtractor={(item, index) => item.species + index}
          extraData={this.props.observations}
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
  return {
    observations: state.observations,
  };
};

export default connect(mapStateToProps)(ListObservationsView);
