import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import GetLocation from 'react-native-get-location';
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
      latitude: '',
      longitude: '',
      loading: false,
      errorLocation: '',
    };
  }

  onValueChange(value: string) {
    this.setState({
      rarity: value,
    });
  }

  requestLocation = () => {
    this.setState({loading: true});

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
    })
      .then(location => {
        this.setState({
          loading: false,
          latitude: location.latitude.toString(),
          longitude: location.longitude.toString(),
          errorLocation: '',
        });
      })
      .catch(ex => {
        const {code, message} = ex;
        console.warn(code, message);

        this.setState({
          loading: false,
          errorLocation:
            'Something went wrong! please check your location settings and try again.',
        });
      });
  };

  create = () => {
    return () => {
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
              <Label>Species' name</Label>
              <Input
                bordered
                onChangeText={value => {
                  this.setState({species: value});
                }}
                value={this.state.species}
              />
            </Item>
            <Item stackedLabel>
              <Label>Notes</Label>
              <Input
                numberOfLines={4}
                multiline={true}
                bordered
                style={styles.notes_form}
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
                placeholder="Select rarity: "
                placeholderStyle={styles.picker_placeholder}
                placeholderIconColor="#007aff"
                selectedValue={this.state.rarity}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="Common" value="Common" />
                <Picker.Item label="Rare" value="Rare" />
                <Picker.Item label="Extremely rare" value="Extremely rare" />
              </Picker>
            </Item>

            {this.state.loading ? (
              <ActivityIndicator />
            ) : (
              <Text>{this.state.errorLocation}</Text>
            )}

            <Button
              disabled={this.state.loading}
              onPress={this.requestLocation}>
              <Text>Get Location</Text>
            </Button>

            <Item floatingLabel>
              <Label>Latitude</Label>
              <Input
                bordered
                onChangeText={value => {
                  this.setState({latitude: value});
                }}
                value={this.state.latitude}
              />
            </Item>
            <Item floatingLabel>
              <Label>Longitude</Label>
              <Input
                bordered
                onChangeText={value => {
                  this.setState({longitude: value});
                }}
                value={this.state.longitude}
              />
            </Item>
          </Form>

          <Button full success style={styles.submit} onPress={this.create()}>
            <Text>Create</Text>
          </Button>

          <Button full danger style={styles.submit} onPress={this.cancel()}>
            <Text>Cancel</Text>
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
  notes_form: {
    textAlignVertical: 'top',
    height: 100,
  },
  toRow: {
    flexDirection: 'row',
  },
});

export default connect(
  null,
  {createObservation},
)(CreateObservationView);
