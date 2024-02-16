import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_LOADING,
    GET_PRODUCTS_FAIL,

    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_LOADING,
    GET_PRODUCT_FAIL,

    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_LOADING,
    FILTER_PRODUCTS_FAIL,

    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,

    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,

    RELATED_PRODUCTS_SUCCESS,
    RELATED_PRODUCTS_FAIL
} from '../actions/types';

const initialState = {
    products: null,
    products_arrival: null,
    products_sold: null,
    product: null,
    related_products: null,
    filtered_products: null,
    error: false,
    loading: false
};

export default function Products(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        //GET PRODUCTS:
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload.products,
                loading: false,
                error: false
            }
        case GET_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                products: null,
                error: false
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null,
                loading: false,
                error: true
            }

        // MAS VENDIDOS
        case GET_PRODUCTS_BY_SOLD_SUCCESS:
            return {
                ...state,
                products_sold: payload.products_sold
            }
        case GET_PRODUCTS_BY_SOLD_FAIL:
            return {
                ...state,
                products_sold: null
            }

        //LO MAS NUEVO
        case GET_PRODUCTS_BY_ARRIVAL_SUCCESS:
            return {
                ...state,
                products_arrival: payload.products
            }
        case GET_PRODUCTS_BY_ARRIVAL_FAIL:
            return {
                ...state,
                products_arrival: null
            }

        //GET PRODUCT:
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                product: payload.product,
                loading: false,
                error: false
            }
        case GET_PRODUCT_LOADING:
            return {
                ...state,
                loading: true,
                product: null,
                error: false
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                product: null,
                loading: false,
                error: true
            }

        // GET FILTER PRODUCTS
        case FILTER_PRODUCTS_SUCCESS:
            return {
                ...state,
                filtered_products: payload.filtered_products,
                loading: false,
                error: false
            }
        case FILTER_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                filtered_products: null,
                error: false
            }
        case FILTER_PRODUCTS_FAIL:
            return {
                ...state,
                filtered_products: null,
                loading: false,
                error: true
            }

        //PRODUCTOS RELACIONADOS
        case RELATED_PRODUCTS_SUCCESS:
            return {
                ...state,
                related_products: payload.related_products
            }
        case RELATED_PRODUCTS_FAIL:
            return {
                ...state,
                related_products: null
            }    
        
        default:
            return state;
    }
}
