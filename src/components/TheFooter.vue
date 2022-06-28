<template>
  <footer>
    <div class="container">
      <router-link class="logo-font" :to="{ name: 'home', params: {} }">
        Nutriwiki
      </router-link>
      <span class="attribution">
        Uma plataforma para consulta de alimentos e seus alergênicos.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: "RwvFooter"
};
</script>
