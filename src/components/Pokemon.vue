<template>
  <div class="pokemon_container">Este es el pokemon de nombre: {{name}}</div>
</template>

<script>
export default {
  props: {
    name: String,
    orientation: String
  },
  data: function () {
    return {
      hola: "hola!!!"
    }
  }
}
</script>

<style scoped>
</style>
