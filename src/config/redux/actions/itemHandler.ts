import firestore from '@react-native-firebase/firestore';
import * as action from './index';

const getItemList = () => {
  return async (dispatch: any) => {
    const datas1 = await firestore().collection('shop').get();

    const datas1Map = datas1.docs.map((data1, data1Index) => {
      return data1;
    });

    const datas1List = datas1Map.map((data) => {
      return {...data.data(), shopRef: data.ref.path, shopUID: data.id};
    });

    const data1ListItem = datas1Map.map((data) =>
      data.ref.collection('item').get(),
    );

    const promA = Promise.all(data1ListItem)
      .then((dataA) =>
        dataA.map((dataB, indexB) =>
          dataB.docs.map((dataC) => {
            return {
              ...dataC.data(),
              shop: datas1List[indexB],
              ref: dataC.ref.path,
              uid: dataC.id,
            };
          }),
        ),
      )
      .then((dataED) => [].concat.apply([], dataED));

    promA.then((data) => dispatch({type: action.GET_ITEM, payload: data}));

    return promA;
  };
};

const clearItemList = {
  type: action.CLEAR_ITEM,
};

export {getItemList, clearItemList};
