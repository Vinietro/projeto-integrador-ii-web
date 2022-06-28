import { IngredientsService, ProductsService } from "@/common/api.service";
import { FETCH_PRODUCTS, FETCH_INGREDIENTS } from "./actions.type";
import {
  FETCH_START,
  FETCH_END,
  SET_INGREDIENTS,
  UPDATE_PRODUCT_IN_LIST
} from "./mutations.type";

const state = {
  ingredients: [],
  products: [],
  isLoading: true,
  productsCount: 0
};

const getters = {
  productsCount(state) {
    return state.productsCount;
  },
  products(state) {
    return state.products;
  },
  isLoading(state) {
    return state.isLoading;
  },
  ingredients(state) {
    return state.ingredients;
  }
};

const actions = {
  [FETCH_PRODUCTS]({ commit }, params) {
    commit(FETCH_START);
    return ProductsService.query(params.type, params.filters)
      .then(({ data }) => {
        commit(FETCH_END, data);
      })
      .catch(error => {
        throw new Error(error);
      });
  },
  [FETCH_INGREDIENTS]({ commit }) {
    return IngredientsService.get()
      .then(({ data }) => {
        commit(SET_INGREDIENTS, data.ingredients);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { products, productsCount }) {
    state.products = products;
    state.productsCount = productsCount;
    state.isLoading = false;
  },
  [SET_INGREDIENTS](state, ingredients) {
    state.ingredients = ingredients;
  },
  [UPDATE_PRODUCT_IN_LIST](state, data) {
    state.products = state.products.map(product => {
      if (product.slug !== data.slug) {
        return product;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      product.favorited = data.favorited;
      product.favoritesCount = data.favoritesCount;
      return product;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
