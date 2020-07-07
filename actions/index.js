import firebase from '../firebase';

export function getCarts() {
  return (dispatch) => {
    firebase
      .database()
      .ref('/cart')
      .on('value', (snapshot) => {
        dispatch({
          type: 'CART_FETCH',
          payload: snapshot.val(),
        });

        // dispatch({
        //   type: "BLOGS_LOADING_STATUS",
        //   payload: false,
        // });
      });
  };
}

export function postCart(title, price) {
  console.log('--------', title, price);
  return (dispatch) => {
    firebase
      .database()
      .ref('/cart')
      .push({title, price})
      .catch((error) => console.error('dsaf ', error));
  };
}

export function deleteCart(key) {
  return (dispatch) => {
    firebase.database().ref(`/cart/${key}`).remove();
  };
}
