<template>
  <div class="article-preview">
    <img :src="product.image" :alt="product.name" height="100" />
    <h1 v-text="product.name" />
    <IngredientList :ingredients="product.Ingredients" />
    <RwvProductMeta isPreview :product="product" />
  </div>
</template>

<script>
import RwvProductMeta from "./ProductMeta";
import IngredientList from "./IngredientList";

export default {
  name: "RwvProductPreview",
  components: {
    RwvProductMeta,
    IngredientList
  },
  props: {
    product: { type: Object, required: true }
  }
};
</script>
