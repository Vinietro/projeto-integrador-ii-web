<template>
  <div>
    <div v-if="isLoading" class="article-preview">Carregando alimentos...</div>
    <div v-else>
      <div v-if="products.length === 0" class="article-preview">
        Nenhum alimento aqui... ainda.
      </div>
      <RwvProductPreview
        v-for="(product, index) in products"
        :product="product"
        :key="product.name + index"
      />
      <VPagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvProductPreview from "./VProductPreview";
import VPagination from "./VPagination";
import { FETCH_PRODUCTS } from "../store/actions.type";

export default {
  name: "RwvProductList",
  components: {
    RwvProductPreview,
    VPagination
  },
  props: {
    ingredient: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      currentPage: 1
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      if (this.ingredient) {
        filters.ingredient = this.ingredient;
      }
      return {
        type,
        filters
      };
    },
    pages() {
      if (this.isLoading || this.productsCount <= this.itemsPerPage) {
        return [];
      }

      console.log(this.productsCount, this.itemsPerPage);

      return [
        ...Array(Math.ceil(this.productsCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["productsCount", "isLoading", "products"])
  },
  watch: {
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchProducts();
    },
    ingredient() {
      this.resetPagination();
      this.fetchProducts();
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      this.$store.dispatch(FETCH_PRODUCTS, this.listConfig);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
