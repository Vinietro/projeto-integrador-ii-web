<template>
  <div class="home-tag">
    <RwvProductList :ingredient="ingredient"></RwvProductList>
  </div>
</template>

<script>
import RwvProductList from "@/components/ProductList";

export default {
  name: "RwvHomeIngredient",
  components: {
    RwvProductList
  },
  computed: {
    ingredient() {
      return this.$route.params.ingredient;
    }
  }
};
</script>
