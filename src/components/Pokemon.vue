<template>
  <div>
    <!-- PARTE DE ARRIBA -->
    <div class="columns is-mobile" v-if="isEnemy">
      <div class="column">
        <div class="hp_container">
          <div class="columns is-marginless">
            <div class="column" style="padding-bottom: 0px;">{{pokemon.name}}</div>
          </div>
          <div class="columns is-marginless is-mobile">
            <div class="column is-narrow">HP:</div>
            <div class="column is-flex" style="align-items: center;">
              <progress class="progress is-success" v-bind:value="pokemon.current_hp" v-bind:max="pokemon.max_hp"></progress>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-two-quarters-mobile"></div>
    </div>

    <div class="columns is-mobile" v-else>
      <div class="column is-two-quarters-mobile"></div>
      <div class="column">
        <div class="hp_container">
          <div class="columns is-marginless">
            <div class="column" style="padding-bottom: 0px;">{{pokemon.name}}</div>
          </div>

          <div class="columns is-marginless is-mobile">
            <div class="column is-narrow">HP:</div>
            <div class="column is-flex" style="align-items: center;">
              <progress class="progress is-success" v-bind:value="pokemon.current_hp" v-bind:max="pokemon.max_hp"></progress>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PARTE DEL MEDIO -->
    <div class="columns is-mobile" v-if="isEnemy">
      <div class="column"></div>
      <div class="column">
        <div class="pokemon_container">
          <img v-bind:src="pokemon.sprite" alt>
        </div>
      </div>
    </div>

    <div class="columns is-mobile" v-else>
      <div class="column">
        <div class="pokemon_container">
          <img v-bind:src="pokemon.sprite" alt>
        </div>
      </div>
      <div class="column"></div>
    </div>
    <div v-if="pokemon.name !== '' && isPlayer">
      <movements/>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import movements from "./Movements"

export default {
  components: {
    movements
  },

  props: {
    orientation: String
  },
  computed: {
    ...mapState({
      pokemon(state) {
        // Es el jugador
        if (this.orientation === "back") {
          return state.player_pokemon
        }
        // Es el enemigo
        else {
          return state.enemy_pokemon
        }
      }
    }),
    isEnemy() {
      return this.orientation === "front" ? true : false
    },
    isPlayer() {
      return this.orientation === "back" ? true : false
    }
  }
}
</script>

<style>
.hp_container {
  border-style: solid;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>
