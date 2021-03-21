import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as action from './index';

interface itemINT {
  name: string;
  price: number;
  originalPrice: number;
  img: string;
  shop: {
    lat: number;
    location: string;
    name: string;
    lng: number;
    shopRef: string;
    shopUID: string;
  };
  ref: string;
  uid: string;
}

export const getFavorite = () => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const getFavData = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('favorite')
        .get();

      const dataFavoriteList = getFavData.docs.map((data) => data.data());

      const dataFavoriteDetailPromises = dataFavoriteList.map(
        async (promise) => {
          const dataFavoriteItem = await firestore().doc(promise.itemRef).get();
          const dataItemShop = await firestore().doc(promise.shopRef).get();
          return {
            ...dataFavoriteItem.data(),
            number: promise.number,
            shop: dataItemShop.data(),
            uid: dataFavoriteItem.id,
          };
        },
      );

      Promise.all(dataFavoriteDetailPromises).then((dataFavorite) =>
        dispatch({type: action.GET_FAVORITE, payload: dataFavorite}),
      );
    } catch (error) {}
  };
};

export const cleanFavorite = {
  type: action.CLEAR_FAVORITE,
};

export const addToFavorite = (item: itemINT) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const dataExist = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('favorite')
        .doc(item.uid)
        .get();

      if (dataExist.exists) {
        await dataExist.ref.delete();
        dispatch({type: action.DELETE_FAVORITE, payload: item.uid});
      } else if (dataExist.exists === false) {
        await dataExist?.ref.set({
          itemRef: item.ref,
          shopRef: item.shop.shopRef,
        });
        dispatch({type: action.ADD_FAVORITE, payload: item});
      }
    } catch (error) {}
  };
};

export const moveToFavorite = ({itemUid}: {itemUid: string}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const cartItem = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .doc(itemUid)
        .get();
      await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('favorite')
        .doc(itemUid)
        .set({...cartItem.data()});

      await cartItem.ref.delete();
      const itemData = await firestore().doc(cartItem.data()?.itemRef).get();
      const shopData = await firestore().doc(cartItem.data()?.shopRef).get();

      const summary = {
        ...itemData.data(),
        shop: shopData.data(),
        uid: itemData.id,
      };

      dispatch({type: action.DELETE_CART_ITEM, payload: itemUid});
      dispatch({type: action.ADD_FAVORITE, payload: summary});
    } catch (error) {}
  };
};

export const deleteFavorite = ({itemUid}: {itemUid: string}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('favorite')
        .doc(itemUid)
        .delete();
      dispatch({type: action.DELETE_FAVORITE, payload: itemUid});
    } catch (error) {}
  };
};

export const moveToCart = ({itemUid}: {itemUid: string}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const cartItem = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('favorite')
        .doc(itemUid)
        .get();
      await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .doc(itemUid)
        .set({...cartItem.data()});

      await cartItem.ref.delete();
      const itemData = await firestore().doc(cartItem.data()?.itemRef).get();
      const shopData = await firestore().doc(cartItem.data()?.shopRef).get();

      const summary = {
        ...itemData.data(),
        shop: {
          ...shopData.data(),
          shopRef: shopData.ref.path,
          shopUID: shopData.id,
        },
        uid: itemData.id,
        number: 1,
      };

      dispatch({type: action.DELETE_FAVORITE, payload: itemUid});
      dispatch({type: action.ADD_CART_ITEM, uid: itemUid, payload: summary});
    } catch (error) {}
  };
};
