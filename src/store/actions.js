import axios from 'axios'

const POKE_API_URL = "https://pokeapi.co/api/v2/"
import _ from 'lodash'
import { isNull } from 'util';

const actions = {
  loadPlayerPokemon_old({ commit }, pokemon_name) {
    console.log("[ACCIONES]", pokemon_name)

    let pokemon_attacks = []

    let player_pokemon = {
      name: _.capitalize(pokemon_name),
      hp: 100,
      attacks: pokemon_attacks,
      front_sprite: ''
    }

    axios.get(POKE_API_URL + `pokemon/${pokemon_name}/`)
      .then((response) => {
        const { moves } = response.data
        player_pokemon.front_sprite = response.data.sprites['back_default']

        // Selecciono 4 movimientos al azar
        let sample_movements = _.sampleSize(moves, 4)

        sample_movements.forEach((val) => {
          let { url } = val.move

          // Por cada movimiento se debe ir a buscar su info respectiva (dada en el campo url)
          axios.get(url).then((attack_response) => {
            // console.log("MOSTRANDO ATTACK RESPONSE")
            // console.log(attack_response)
            let description = _.find(attack_response.data['flavor_text_entries'], (x) => { return x.language.name === "es" })["flavor_text"]
            let name = _.find(attack_response.data['names'], (x) => { return x.language.name === "es" })["name"]
            let pp = attack_response.data['pp']
            pokemon_attacks.push({ name, description, pp })
            // TODO: ACA TAMBIEN SE LE DEBERÍA CALCULAR EL DAÑO AL ATAQUE PROBABLEMENTE
          }).catch((error) => {
            console.log("[RECORRIDO ATAQUES]", error)
          })
        })
      }).catch((error) => {
        console.log("[PEDIR POKEMON]", error)
      })


    console.log(player_pokemon)
    commit('SET_PLAYER_POKEMON', player_pokemon)
  },

  async loadPokemon({ commit }, { pokemon_name, target }) {
    console.log("El target es:", target)

    // Se manda a pedir la info del pokemon
    const response = await axios.get(POKE_API_URL + `pokemon/${pokemon_name}/`)

    // Se sacan 4 ataques aleatoreos
    const { moves } = response.data
    let sample_movements = _.sampleSize(moves, 4)

    // Se mandan a pedir la info de los 4 ataques en paralelo
    let array_of_promises = sample_movements.map((val) => {
      let { url } = val.move
      return axios.get(url)
    })

    // Se espera a que TODOS los ataques hayan retornado
    let attacks_response = await Promise.all(array_of_promises)

    // Se procesa cada ataque para generar un arreglo de objetos
    const pokemon_attacks = attacks_response.map((attack) => {
      let description = _.find(attack.data['flavor_text_entries'], (x) => { return x.language.name === "es" })["flavor_text"]
      let name = _.find(attack.data['names'], (x) => { return x.language.name === "es" })["name"]
      let pp = attack.data['pp']
      let power = attack.data['power'] === null ? 10 : attack.data['power'] 
      return { description, name, pp, power }
    })

    // Se calcula la vida del pokemon entre 100 y 150
    let hp = Math.round(Math.random()*(50)+parseInt(100))

    /* Se procede a mandar a guardar el nuevo pokemon */
    const pokemon_to_set = {
      name: _.capitalize(pokemon_name),
      max_hp: hp,
      current_hp: hp,
      attacks: pokemon_attacks,
      sprite: target === "player" ? response.data.sprites['back_default'] : response.data.sprites['front_default']
    }

    const ACTION_NAME = target === "player" ? 'SET_PLAYER_POKEMON' : 'SET_ENEMY_POKEMON'
    commit(ACTION_NAME, pokemon_to_set)
  },

  makeAttack({ commit }, {origin, target, attack}) {
    let {current_hp} = target
    let pokemon_to_set = {
      ...target,
      current_hp: current_hp - attack.power
    }
    let ACTION_NAME = origin === "enemy" ? 'SET_PLAYER_POKEMON' : 'SET_ENEMY_POKEMON'
    commit(ACTION_NAME, pokemon_to_set)
  }
}

export default actions