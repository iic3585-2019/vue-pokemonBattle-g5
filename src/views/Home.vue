<template>
  <div>
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
              @click="loadPlayerPokemon(selected_pokemon)"
              v-bind:disabled="!has_selected_pokemon"
            >Iniciar combate!</button>
          </div>
        </div>
      </div>
    </div>
    <div id="battle_container">
      Pokemon elegido: "{{selected_pokemon}}"
      <pokemon :name="selected_pokemon"/>
    </div>
  </div>
</template>

<script>
import pokemon from "../components/Pokemon"
import { mapActions } from 'vuex'

export default {
  components: {
    pokemon
  },
  data: function () {
    return {
      selected_pokemon: ''
    }
  },
  methods: {
    ...mapActions(['loadPlayerPokemon']),
    hi: (a) => {
      console.log("HOLA! " + a)
    }
  },
  computed: {
    has_selected_pokemon: function () {
      return this.selected_pokemon === '' ? false : true
    }
  }

}
</script>


<style>
#battle_container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
</style>
