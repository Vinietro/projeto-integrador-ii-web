<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(ingredient, index) of ingredients"
      :key="index"
    >
      <span v-text="ingredient.name" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "IngredientList",
  props: {
    ingredients: Array
  }
};
</script>
