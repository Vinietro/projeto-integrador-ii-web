import Vue from "vue";
import { ProductsService } from "@/common/api.service";
import {
  FETCH_PRODUCT,
  PRODUCT_PUBLISH,
  PRODUCT_EDIT,
  PRODUCT_EDIT_ADD_INGREDIENT,
  PRODUCT_EDIT_REMOVE_INGREDIENT,
  PRODUCT_DELETE,
  PRODUCT_RESET_STATE
} from "./actions.type";
import {
  RESET_STATE,
  SET_PRODUCT,
  INGREDIENT_ADD,
  INGREDIENT_REMOVE
} from "./mutations.type";

const initialState = {
  product: {
    name: "",
    image: "",
    ingredientList: []
  }
};

export const state = { ...initialState };

export const actions = {
  async [FETCH_PRODUCT](context, productSlug, prevProduct) {
    // avoid extronuous network call if product exists
    if (prevProduct !== undefined) {
      return context.commit(SET_PRODUCT, prevProduct);
    }
    const { data } = await ProductsService.get(productSlug);
    context.commit(SET_PRODUCT, data.product);
    return data;
  },
  [PRODUCT_PUBLISH]({ state }) {
    return ProductsService.create(state.product);
  },
  [PRODUCT_DELETE](context, slug) {
    return ProductsService.destroy(slug);
  },
  [PRODUCT_EDIT]({ state }) {
    return ProductsService.update(state.product.slug, state.product);
  },
  [PRODUCT_EDIT_ADD_INGREDIENT](context, ingredient) {
    context.commit(INGREDIENT_ADD, ingredient);
  },
  [PRODUCT_EDIT_REMOVE_INGREDIENT](context, ingredient) {
    context.commit(INGREDIENT_REMOVE, ingredient);
  },
  [PRODUCT_RESET_STATE]({ commit }) {
    commit(RESET_STATE);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PRODUCT](state, product) {
    state.product = product;
  },
  [INGREDIENT_ADD](state, ingredient) {
    state.product.ingredientList = state.product.ingredientList.concat([
      ingredient
    ]);
  },
  [INGREDIENT_REMOVE](state, ingredient) {
    state.product.ingredientList = state.product.ingredientList.filter(
      t => t !== ingredient
    );
  },
  [RESET_STATE]() {
    for (let f in state) {
      Vue.set(state, f, initialState[f]);
    }
  }
};

const getters = {
  product(state) {
    return state.product;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
