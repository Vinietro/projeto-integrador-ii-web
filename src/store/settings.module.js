import { ProductsService } from "@/common/api.service";
import { FETCH_PRODUCT } from "./actions.type";
import { SET_PRODUCT } from "./mutations.type";

export const state = {
  product: {}
};

export const actions = {
  [FETCH_PRODUCT](context, productSlug) {
    return ProductsService.get(productSlug)
      .then(({ data }) => {
        context.commit(SET_PRODUCT, data.product);
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
export const mutations = {
  [SET_PRODUCT](state, product) {
    state.product = product;
  }
};

export default {
  state,
  actions,
  mutations
};
