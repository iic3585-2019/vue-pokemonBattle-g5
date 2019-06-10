<template>
  <div>
    <!-- OPCIONES DE ARRIBA -->
    <div id="battle_setup" class="card">
      <div class="card-content">
        <div class="subtitle">Selecciona con que pokemon quieres jugar</div>

        <div class="columns">
          <div class="column">
            <div class="select">
              <select v-model="selected_pokemon">
                <option value selected disabled>Selecciona</option>
                <option value="charmander">Charmander</option>
                <option value="bulbasaur">Bulbasaur</option>
                <option value="squirtle">Squirtle</option>
              </select>
            </div>
          </div>
          <div class="column">
            <button
              class="button is-success"
              @click="handleClick"
              v-bind:disabled="!has_selected_pokemon"
            >Iniciar combate!</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CUADRO DE LA PARTIDA -->
    <div id="battle_container">
      <div class="columns is-mobile" v-if="has_pressed_start">
        <div class="column is-6-desktop is-offset-3-desktop">
          <pokemon orientation="front"/>
        </div>
      </div>

      <div class="columns is-mobile" v-if="has_pressed_start">
        <div class="column is-6-desktop is-offset-3-desktop">
          <pokemon orientation="back"/>
        </div>
      </div>
    </div>
    <div class="modal is-clipped" v-bind:class="[{'is-active':wins}]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title" v-if="playerWins">Has ganado!</p>
          <p class="modal-card-title" v-else-if="enemyWins">Has perdido :c</p>
        </header>
        <footer class="modal-card-foot">
          <button class="button is-success"
          >Jugar Nuevamente!</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import pokemon from "../components/Pokemon"
import { mapActions } from 'vuex'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  components: {
    pokemon,
  },
  data: function () {
    return {
      selected_pokemon: '',
      enemy_pokemon: _.sample(['charmander', 'bulbasaur', 'squirtle']),
      has_pressed_start: false
    }
  },
  methods: {
    ...mapActions(['loadPokemon','reset']),
    handleClick() {
      this.loadPokemon({ pokemon_name: this.selected_pokemon, target: 'player' })
      this.loadPokemon({ pokemon_name: this.enemy_pokemon, target: 'enemy' })
      this.has_pressed_start = true
    }
  },
  computed: {
    has_selected_pokemon: function () {
      return this.selected_pokemon === '' ? false : true
    },
    ...mapState({
      pokemon(state) {
        // Se retorna el pokemon del jugador
        return state.player_pokemon
      },
      enemy(state) {
        // Se retorna el pokemon del jugador
        return state.enemy_pokemon
      }
    }),

    playerWins: function(){
      return this.enemy.current_hp <= 0 && this.enemy.name!="" ? true : false
    },

    enemyWins: function(){
      return this.pokemon.current_hp <= 0 && this.enemy.name!="" ? true : false
    },

    wins: function(){
      return this.has_pressed_start && (this.enemyWins || this.playerWins) ? true : false
    }
  }

}
</script>

<style lang="scss">
#battle_container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;

  .columns {
    width: 100%;
  }
}
</style>
