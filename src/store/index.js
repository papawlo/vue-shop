import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        },
        userProfile: {},
        products: []
    },
    getters: {
        user(state) {
            return state.user
        },
        userProfile(state) {
            return state.userProfile
        },

    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },

        setUserProfile(state, val) {
            state.userProfile = val
        }
    },
    actions: {
        async login({ dispatch }, form) {
            // sign user in
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

            // fetch user profile and set in state
            dispatch('fetchUserProfile', user)
        },
        async fetchUserProfile({ commit }, user) {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()
            console.log('user:', user)
            console.log('userprofile', userProfile)

            // set user profile in state
            if (user) {
                commit("SET_LOGGED_IN", user !== null)
                commit('setUserProfile', userProfile.data())
            } else {
                commit("SET_USER", null);
            }

            // change route to dashboard
            if (router.currentRoute.path === '/login') {
                router.push('/admin')
            }
        },
        async logout({ commit }) {
            // log user out
            await fb.auth.signOut()

            // clear user data from state
            commit('setUserProfile', {})

            // redirect to login view
            router.push('/login')
        },
    }
})

export default store