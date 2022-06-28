<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">Nutriwiki</h1>
        <p>Um lugar para consultar seus alimentos.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{ name: 'home' }"
                  exact
                  class="nav-link"
                  active-class="active"
                >
                  Últimos alimentos
                </router-link>
              </li>
              <li class="nav-item" v-if="ingredient">
                <router-link
                  :to="{ name: 'home-ingredient', params: { ingredient } }"
                  class="nav-link"
                  active-class="active"
                >
                  <i class="ion-pound"></i> {{ ingredient }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Filtro de Alergênicos</p>
            <div class="tag-list">
              <RwvIngredient
                v-for="(ingredient, index) in ingredients"
                :name="ingredient"
                :key="index"
              >
              </RwvIngredient>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RwvIngredient from "@/components/VIngredient";
import { FETCH_INGREDIENTS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    RwvIngredient
  },
  mounted() {
    this.$store.dispatch(FETCH_INGREDIENTS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "ingredients"]),
    ingredient() {
      return this.$route.params.ingredient;
    }
  }
};
</script>
