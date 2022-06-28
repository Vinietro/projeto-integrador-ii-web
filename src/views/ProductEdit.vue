<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <RwvListErrors :errors="errors" />
          <form @submit.prevent="onPublish(product.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="product.name"
                  placeholder="Nome do alimento"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="product.image"
                  placeholder="URL da imagem do alimento"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Digite o alergênico e aperte enter para adicionar"
                  v-model="ingredientInput"
                  @keypress.enter.prevent="addIngredient(ingredientInput)"
                />
                <div class="tag-list">
                  <span
                    class="tag-default tag-pill"
                    v-for="(ingredient, index) of product.ingredientList"
                    :key="ingredient + index"
                  >
                    <i
                      class="ion-close-round"
                      @click="removeIngredient(ingredient)"
                    >
                    </i>
                    {{ ingredient }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
              :disabled="inProgress"
              class="btn btn-lg pull-xs-right btn-primary"
              type="submit"
            >
              Publicar Alimento
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import RwvListErrors from "@/components/ListErrors";
import {
  PRODUCT_PUBLISH,
  PRODUCT_EDIT,
  PRODUCT_EDIT_ADD_INGREDIENT,
  PRODUCT_EDIT_REMOVE_INGREDIENT,
  PRODUCT_RESET_STATE
} from "@/store/actions.type";

export default {
  name: "RwvProductEdit",
  components: { RwvListErrors },
  props: {
    previousProduct: {
      type: Object,
      required: false
    }
  },
  async beforeRouteUpdate(to, from, next) {
    // Reset state if user goes from /editor/:id to /editor
    // The component is not recreated so we use to hook to reset the state.
    await store.dispatch(PRODUCT_RESET_STATE);
    return next();
  },
  async beforeRouteEnter(to, from, next) {
    // SO: https://github.com/vuejs/vue-router/issues/1034
    // If we arrive directly to this url, we need to fetch the product
    await store.dispatch(PRODUCT_RESET_STATE);
    return next();
  },
  async beforeRouteLeave(to, from, next) {
    await store.dispatch(PRODUCT_RESET_STATE);
    next();
  },
  data() {
    return {
      ingredientInput: null,
      inProgress: false,
      errors: {}
    };
  },
  computed: {
    ...mapGetters(["product"])
  },
  methods: {
    onPublish(name) {
      let action = name ? PRODUCT_EDIT : PRODUCT_PUBLISH;
      this.inProgress = true;
      this.$store
        .dispatch(action)
        .then(() => {
          this.inProgress = false;
          this.$router.push({
            name: "home"
          });
        })
        .catch(({ response }) => {
          this.inProgress = false;
          this.errors = response.data.errors;
        });
    },
    removeIngredient(ingredient) {
      this.$store.dispatch(PRODUCT_EDIT_REMOVE_INGREDIENT, ingredient);
    },
    addIngredient(ingredient) {
      this.$store.dispatch(PRODUCT_EDIT_ADD_INGREDIENT, ingredient);
      this.ingredientInput = null;
    }
  }
};
</script>
