<template>
  <div class="columns is-mobile">
    <div class="column is-three-quarters-mobile">
      <div class="movements_container" style="padding-bottom:6px;">
        <div class="columns is-marginless is-mobile">
          <div class="column" v-bind:style="{backgroundColor:getBackground(0)}">
            <button 
              class="button is-small is-fullwidth is-focused"
              value=0
              @click="handleClick"
            >{{pokemon.attacks[0].name}}</button>
          </div>
          <div class="column" v-bind:style="{backgroundColor:getBackground(1)}">
            <button 
              class="button is-dark is-small is-fullwidth is-focused" 
              value=1
              @click="handleClick"
            >{{pokemon.attacks[1].name}}</button>
          </div>
        </div>

        <div class="columns is-marginless is-mobile">
          <div class="column" v-bind:style="{backgroundColor:getBackground(2)}">
            <button 
              class="button is-dark is-small is-fullwidth"
              value=2
              @click="handleClick"
            >{{pokemon.attacks[2].name}}</button>
          </div>
          <div class="column" v-bind:style="{backgroundColor:getBackground(3)}">
            <button 
              class="button is-light is-small is-fullwidth"
              value=3
              @click="handleClick"
            >{{pokemon.attacks[3].name}}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="column" style="padding-left:0px;">
      <div class="movements_container">
          <div class="column" style="padding-bottom: 0px;">PP: {{pokemon.attacks[selected_attack].pp}}</div>
          <div class="column is-narrow">Daño: {{pokemon.attacks[selected_attack].power}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
  data: function () {
    return {
      selected_attack: "0",
      
    }
  },
  methods: {
    getBackground : function (attack){
      return attack == this.selected_attack ? "red" : "white"
    },
    ...mapActions(['makeAttack']),
    handleClick(event) {
      if (event.target.value === this.selected_attack){
        this.makeAttack({origin:"player", target: this.enemy, attack:this.pokemon.attacks[this.selected_attack]})
        let random = Math.round(Math.random()*3)
        this.makeAttack({origin:"enemy", target:this.pokemon, attack:this.enemy.attacks[random]})
      }
      else{
        this.selected_attack = event.target.value 
      }
    }
  },
  computed: {
    ...mapState({
      pokemon(state) {
        // Se retorna el pokemon del jugador
        return state.player_pokemon
      },
      enemy(state) {
        // Se retorna el pokemon del jugador
        return state.enemy_pokemon
      }
    })
  }
}
</script>

<style>
.movements_container {
  border-style: solid;
  border-width: 2px;
  border-color: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
</style>