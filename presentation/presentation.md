---
marp: true
---
# Vue: "Batalla Pokémon"

## Integrantes:
- Francisco Olivares
- Gabriel Valenzuela

---
# Primero un repaso sobre vue
- Creación de componentes
- Instanciación de componentes
- Creación de store
---

# Creación de componentes (Pokemon.vue)

```javascript
<template>
  <div>
    <!-- HTML del componente aquí -->
  </div>
</template>
<script>
import { mapState } from 'vuex' /*esto se explicara más adelante ;)*/
export default {
  /* PROPS A RECIBIR */
  props: {
    orientation: String
  },
  /* ESTADO INTERNO */
  data: function () {
    return {
      variable1: "hola!!!"
    }
  },
  /* METODOS COMPUTADOS (auto-actualizan) */
  computed: {
    /*...más código arriba...*/
    isEnemy() {
      return this.orientation === "front" ? true : false
    },
    isPlayer() {
      return this.orientation === "back" ? true : false
    }
  }
}
</script>
/* ESTILOS DEL COMPONENTE */
<style>
.hp_container {
  border-style: solid;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
```
---
# Instanciación de componentes
El componente Home ocupa a la componente Pokemon
```javascript
<template>
  <div>
    <!-- ...más código arriba... -->
    <div id="battle_container">
      <div class="columns is-mobile" v-if="has_pressed_start">
        <div class="column is-6-desktop is-offset-3-desktop">
          <pokemon orientation="front"/> <!-- ACÁ SE INSTANCIA -->
        </div>
      </div>

      <div class="columns is-mobile" v-if="has_pressed_start">
        <div class="column is-6-desktop is-offset-3-desktop">
          <pokemon orientation="back"/> <!-- ACÁ SE INSTANCIA -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pokemon from "../components/Pokemon"

export default {
  components: {
    pokemon
  },
  /* ...más código abajo... */
}
</script>
```
---
# Creación de la store (Vuex)
Como mínimo se necesitan estas 3 cosas
- estado
- acciones
- mutaciones

---
# Store: El estado
```javascript
const state = {
  player_pokemon: {
    hp: 0,
    name: "",
    attacks: [],
    sprite: ""
  },
  enemy_pokemon: {
    hp: 0,
    name: "",
    attacks: [],
    sprite: "",
  },
  /* Creado para la presentación */
  ejemplo:{
    array_of_pokemons: []
  }
}
export default state
```
---
# Store: Mutaciones
```javascript
const mutations = {
    SET_PLAYER_POKEMON(state, payload) {
        state.player_pokemon = payload 
    },

    SET_ENEMY_POKEMON(state, payload) {
        state.enemy_pokemon = payload
    }
    /* Creado para la presentación */
    ADD_POKEMON(state, payload) {
      /* Válido en Vuex */
      state.ejemplo.array_of_pokemons.push(payload.pokemon) 

      /* En redux, pensando que esto seria un reducer */
      return [...state.ejemplo.array_of_pokemons, payload.pokemon]
    }
}
export default mutations
```
---
# Store: Accciones
```javascript
const actions = {
  async loadPokemon({ commit }, { pokemon_name, target }) {
    /*... más código arriba ...*/

    /* Se procede a mandar a guardar el nuevo pokemon */
    const pokemon_to_set = {
      name: _.capitalize(pokemon_name),
      hp: 100, // TODO: Ver que vida se le va a poner
      attacks: pokemon_attacks,
      sprite: target === "player" ? response.data.sprites['back_default'] : response.data.sprites['front_default']
    }

    const ACTION_NAME = target === "player" ? 'SET_PLAYER_POKEMON' : 'SET_ENEMY_POKEMON'
    commit(ACTION_NAME, pokemon_to_set) /* SE MANDA A EJECUTAR LA MUTACIÓN */
  }
}
export default actions
```