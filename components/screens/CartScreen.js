import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getCarts, deleteCart} from '../../actions';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

class Item extends Component {
  componentDidMount() {
    this.props.getCarts();
  }

  render() {
    let total = 0;

    this.props.listOfCarts.forEach((item) => {
      total = total + parseInt(item.price);
    });

    return (
      <ScrollView>
        <FlatList
          data={this.props.listOfCarts}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({item}) => (
            <View style={styles.containerStyle}>
              <View style={styles.textStyle}>
                <Text style={{color: '#2e2f30'}}>{item.title}</Text>
                <View style={styles.priceStyle}>
                  <Text style={{color: '#2e2f30', fontSize: 14}}>
                    {item.price} ৳
                  </Text>
                </View>
              </View>

              <View style={styles.counterStyle}>
                <Icon.Button
                  name="ios-remove"
                  size={25}
                  color="#fff"
                  backgroundColor="#fff"
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#bbb',
                    height: 30,
                    width: 30,
                  }}
                  iconStyle={{marginRight: 0}}
                />

                <Text>{1}</Text>

                <Icon.Button
                  name="ios-add"
                  size={25}
                  color="#fff"
                  backgroundColor="#fff"
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#bbb',
                    height: 30,
                    width: 30,
                  }}
                  iconStyle={{marginRight: 0}}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.props.deleteCart(item.key)}>
                  <Icon
                    name="md-trash"
                    size={30}
                    color="red"
                    iconStyle={{marginRight: 0}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 20,
          }}>
          <Text style={{fontSize: 20}}>Total = {total} ৳</Text>
        </View>

        <View
          style={{
            backgroundColor: '#f39c12',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            borderRadius: 3,
          }}>
          <Text style={{color: '#fff', fontSize: 24}}>Go to checkout</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  lastItemStyle: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
    padding: 10,
    fontSize: 14,
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 60,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
});

function mapStateToProps(state) {
  const listOfCarts = _.map(state.cartList.cartList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });

  return {
    listOfCarts,
  };
}

export default connect(mapStateToProps, {getCarts, deleteCart})(Item);
