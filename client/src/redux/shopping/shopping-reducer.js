import * as actionsTypes from './shopping-types';
const INITIAL_STATE = {
    products: [{
        title: "Hombre prueba",
        url_img: "https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800https://img01.ztat.net/article/spp-media-p1/8136fd6b0df83443ad967354f94a56f4/6197007ff24b457c92a573f4b48951e8.jpg?imwidth=1800",
        price: 14.8,
        collection: "male",
        id: 1
    }, {
        title: "VIMILINA HALTERNECK - Vestido de cóctel",
        url_img: "https://img01.ztat.net/article/spp-media-p1/1ff715a8248c38099d896e7049a8bc7a/c08f982eb20049e796683c93fd291366.jpg?imwidth=1800",
        price: 27.28,
        collection: "female",
        id: 2
    }, { title: "Falda acampanada", url_img: "https://img01.ztat.net/article/spp-media-p1/2874919838dd34638938d96a99524236/6134a85ce583453a8fea531be09ae28a.jpg?imwidth=1800", price: 22.8, collection: "female", id: 3 },
    { title: "ALPHA ORIGINAL KHAKI SKINNY - Pantalones chinos", url_img: "https://img01.ztat.net/article/spp-media-p1/759c784d74784e62a023d2fc08b83490/adb3e989606049d79bbdaabaad6be191.jpg?imwidth=1800", price: 75.69, collection: "male", id: 4 },
    { title: "Equipación selección", url_img: "https://img01.ztat.net/article/spp-media-p1/c546764829bb301f9855902079161d4d/876010c9fd5a4aebb0a3063e8b3122cd.jpg?imwidth=1800", price: 123.5, collection: "kid", id: 5 },
    { title: "ELEONOR - Blazer", url_img: "https://img01.ztat.net/article/spp-media-p1/f734e5cabf513694aa372675b5a04c56/63dd77dbdc4440edb86cb81b132ae5f1.jpg?imwidth=1800", price: 49.99, collection: "female", id: 6 },
    { title: "BABY SET UNISEX - Regalos para bebés", url_img: "https://img01.ztat.net/article/spp-media-p1/cbc71495e9ea3dc8811f57ad54755aa8/7fde3ee0df1d489b89f809574093e73f.jpg?imwidth=1800&filter=packshot", price: 36.43, collection: "kid", id: 7 },
    { title: "Zapatillas infantiles YC373SNW ", url_img: "https://img01.ztat.net/article/spp-media-p1/c3435ec08b71374fb7abb41abee2c4c7/4f6e4e133b624e0c930d8ddb8db04433.jpg?imwidth=1800&filter=packshot", price: 33.43, collection: "kid", id: 8 },
    { title: "JDYNEW - Shorts", url_img: "https://img01.ztat.net/article/spp-media-p1/1e4edb0a192c39ccb6223dbd975afd06/6884590cb26a4941b478f57414282b79.jpg?imwidth=1800", price: 22.43, collection: "female", id: 9 },
    { title: "FLAMINGUY - Traje ", url_img: "https://img01.ztat.net/article/spp-media-p1/b099a94887f03a70aae49d2226b53f14/a3fe2b5509d449f8bf92be97fe5a15a1.jpg?imwidth=1800", price: 56.33, collection: "male", id: 10 },
    { title: "Pijama", url_img: "https://img01.ztat.net/article/spp-media-p1/bbdf49a56c2e494cbecaca3fba1ed582/f06a492457f949a9805edca541028e6e.jpg?imwidth=1800", price: 33.43, collection: "male", id: 11 },
    { title: "NKFVINAYA - Mono", url_img: "https://img01.ztat.net/article/spp-media-p1/d59adb438a0944738d0e90c084213ad6/1fd83b58b82c42a691a6a3dda1229f0f.jpg?imwidth=1800&filter=packshot", price: 22.44, collection: "Kid", id: 12 }
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
                cart: state.cart.map(item => item.id === action.payload.id ? { ...item, qty: +action.payload.qty } : item)

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