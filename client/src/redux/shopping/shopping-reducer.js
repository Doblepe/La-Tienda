import * as actionsTypes from './shopping-types';
const INITIAL_STATE = {
    products: [{
        title: "Hombre prueba",
        url_img: "https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800",
        price: 14.8,
        collection: "male",
    }

    ], // {id, title, url_img, price}
    cart: [],  // {id, title, url_img, price, qty}
    currentItem: null,
}
const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionsTypes.ADD_TO_CART:
            //Get items data from the producst array.
            const item = state.products.find(prod => prod.id === action.payload.id);
            // check if item is already in cart
            const inCart = state.cart.find(item => item.id === action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart ? state.cart.map(item => item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item) : [...state.cart, { ...item, qty: 1 }]

            }
        case actionsTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id),
            }
        case actionsTypes.ADJUST_QTY:
            return {
                ...state,
                cart: state.cart.map(item => item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item)

            }
        case actionsTypes.LOAD_CURREMT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }
        default:
            return state;
    }

}
export default shopReducer;