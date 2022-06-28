<template>
  <div class="article-meta">
    <img :src="product.User.image" />
    <div class="info">
      Adicionado por {{ product.User.name }} em
      <span class="date">{{ product.createdAt | date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RwvProductMeta",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>
