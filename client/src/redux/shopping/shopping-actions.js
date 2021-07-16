import * as actionsTypes from './shopping-types';
export const addToCart = (itemID) =>{
    return {
        type: actionsTypes.ADD_TO_CART,
        payload: {
            id: itemID
        }
    }
}
export const removeFromCart = (itemID, value)=>{
    return {
        type: actionsTypes.REMOVE_FROM_CART,
        payload: {
            id: itemID,
        },
    };
};
export const adjustQTY = (itemID, value)=>{
    return {
        type: actionsTypes.ADJUST_QTY,
        payload: {
            id: itemID,
            qty: value
        }
    }
};
export const loadCurrentItem = (item) =>{
    return{
        type: actionsTypes.LOAD_CURREMT_ITEM,
        payload: item
    }
}
