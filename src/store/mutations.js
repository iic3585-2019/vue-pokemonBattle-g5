const mutations = {
    SET_PLAYER_POKEMON(state, payload) {
        state.player_pokemon = payload
    },

    SET_ENEMY_POKEMON(state, payload) {
        state.enemy_pokemon = payload
    }
}

export default mutations