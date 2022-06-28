<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ product.title }}</h1>
        <RwvProductMeta :product="product" :actions="true"></RwvProductMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row product-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(product.body)"></div>
          <ul class="tag-list">
            <li
              v-for="(ingredient, index) of product.ingredientList"
              :key="ingredient + index"
            >
              <RwvIngredient
                :name="ingredient"
                className="tag-default tag-pill tag-outline"
              ></RwvIngredient>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        <RwvProductMeta :product="product" :actions="true"></RwvProductMeta>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import marked from "marked";
import store from "@/store";
import RwvProductMeta from "@/components/ProductMeta";
import RwvIngredient from "@/components/VIngredient";
import { FETCH_PRODUCT } from "@/store/actions.type";

export default {
  name: "rwv-product",
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    RwvProductMeta,
    RwvIngredient
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([store.dispatch(FETCH_PRODUCT, to.params.slug)]).then(() => {
      next();
    });
  },
  computed: {
    ...mapGetters(["product", "currentUser", "isAuthenticated"])
  },
  methods: {
    parseMarkdown(content) {
      return marked(content);
    }
  }
};
</script>
