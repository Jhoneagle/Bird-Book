import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {createObservation} from '../reducers/ObservationsReducer';

class CreateObservationView extends Component {
  static navigationOptions = {
    title: 'New observation',
  };

  constructor(props) {
    super(props);
    this.state = {
      species: '',
      rarity: 'Common',
      notes: '',
      latitude: null,
      longitude: null,
    };
    this.setDate = this.setDate.bind(this);
  }

  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  success(pos) {
    const crd = pos.coords;
    this.setState({latitude: crd.latitude, longitude: crd.longitude});
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  create = () => {
    return () => {
      navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        this.options,
      );

      const object = {
        species: this.state.species,
        rarity: this.state.rarity,
        notes: this.state.notes,
        timestamp: new Date(),
        latitude: this.state.latitude,
        longitude: this.state.longitude,
      };

      this.props.createObservation(object);
      this.props.navigation.goBack();
    };
  };

  cancel = () => {
    return () => {
      this.props.navigation.goBack();
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Species name</Label>
              <Input
                onChangeText={value => {
                  this.setState({species: value});
                }}
                value={this.state.species}
              />
            </Item>
            <Item floatingLabel>
              <Label>Notes</Label>
              <Input
                onChangeText={value => {
                  this.setState({notes: value});
                }}
                value={this.state.notes}
              />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.picker}
                placeholder="Select type: "
                placeholderStyle={styles.picker_placeholder}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="Common" value="Common" />
                <Picker.Item label="Rare" value="Rare" />
                <Picker.Item label="Extremely rare" value="Extremely rare" />
              </Picker>
            </Item>
          </Form>
          <Button full success style={styles.submit} onPress={this.create()}>
            <Text>Add</Text>
          </Button>
          <Button full danger style={styles.submit} onPress={this.cancel()}>
            <Text>Add</Text>
          </Button>
        </Content>
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
  submit: {
    margin: 5,
  },
});

export default connect(
  null,
  {createObservation},
)(CreateObservationView);
