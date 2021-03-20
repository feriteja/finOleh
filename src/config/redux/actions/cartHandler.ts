import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as action from './index';

export const getCart = () => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const dataCartArray = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .get();

      const dataCartList = dataCartArray.docs.map((data) => data.data());

      const dataCartDetailPromises = dataCartList.map(async (promise) => {
        const dataCart = await firestore().doc(promise.ref).get();
        const dataItemShop = await firestore().doc(promise.shop).get();
        return {
          ...dataCart.data(),
          number: promise.number,
          shop: dataItemShop.data(),
          uid: dataCart.id,
        };
      });

      Promise.all(dataCartDetailPromises).then((dataCart) =>
        dispatch({type: action.GET_CART, payload: dataCart}),
      );
    } catch (error) {}
  };
};

export const cleanCart = {
  type: action.CLEAR_CART,
};

export const addCartItem = ({
  uid,
  ref,
  shop,
  data,
}: {
  uid: string;
  ref: string;
  shop: any;
  data: any;
}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;
    try {
      const dataExist = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .doc(uid)
        .get();

      if (dataExist.exists) {
        firestore()
          .collection('user')
          .doc(uidUser)
          .collection('cart')
          .doc(uid)
          .set({ref, shop: shop.shopRef, number: dataExist.data().number + 1});
        dispatch({
          type: action.ADD_CART_ITEM,
          uid,
          payload: {
            ...data,
            number: dataExist.data().number + 1,
          },
        });
      } else {
        firestore()
          .collection('user')
          .doc(uidUser)
          .collection('cart')
          .doc(uid)
          .set({ref, number: 1, shop: shop.shopRef});
        dispatch({
          type: action.ADD_CART_ITEM,
          uid,
          payload: {
            ...data,
            number: 1,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCountCart = ({
  uidItem,
  type,
  number,
}: {
  uidItem: string;
  type: 'min' | 'plus';
  number: number;
}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;

    try {
      const itemData = await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .doc(uidItem)
        .get();

      if (type === 'plus') {
        await itemData.ref.set({
          ...itemData.data(),
          number,
        });

        dispatch({
          type: action.UPDATE_CART_ITEM,
          payload: number,
          action: 'plus',
          uidItem,
        });
      } else if (type === 'min') {
        await itemData.ref.set({
          ...itemData.data(),
          number,
        });

        dispatch({
          type: action.UPDATE_CART_ITEM,
          payload: number,
          action: 'min',
          uidItem,
        });
      }
    } catch (error) {}
  };
};

export const deleteCartItem = ({uidItem}: {uidItem: string}) => {
  return async (dispatch: any) => {
    const uidUser = auth().currentUser?.uid;

    try {
      await firestore()
        .collection('user')
        .doc(uidUser)
        .collection('cart')
        .doc(uidItem)
        .delete();

      dispatch({type: action.DELETE_CART_ITEM, payload: uidItem});
    } catch (error) {}
  };
};
