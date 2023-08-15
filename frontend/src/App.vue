<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<template>
  <div id="app">
    <h1>Food App</h1>
    <form @submit.prevent>
      <input type="text" v-model="state.name">
      <button @click="handleCreateFood">Add</button>
    </form>
    <p v-for="food in state.foods" v-bind:key="food.id">
      {{ food.name }} <button @click="handleDeleteFood(food.id)">Delete</button>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue' // defineComponent関数（TypeScriptを取り入れる場合に必要）などを読み込む
import { getFoods, createFood, deleteFood } from './lib/api/foods' // APIを呼び出すための関数を読み込む
import { Food } from './interfaces/index' // 型定義を読み込む

interface State {
  foods: Food[]
  name: string
  description: string
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      foods: [],
      name: '',
      description: ''
    })

    // Food一覧を取得
    const handleGetFoods = async (): Promise<void> => {
      try {
        const res = await getFoods()

        if (res?.status === 200) {
          state.foods = res.data.foods // foods（配列）に結果を格納
        }
      } catch (err) {
        console.log(err)
      }
    }

    // Foodを新規作成
    const handleCreateFood = async (): Promise<void> => {
      if (state.name === '') return // 入力が空だった場合は以降の処理を行わない

      // Food型に沿ったデータを作成
      const data: Food = {
        id: state.id,
        name: state.name,
        description: state.description
      }

      try {
        const res = await createFood(data)

        if (res?.status === 200) {
          state.foods = [...state.foods, res.data.todo] // foods（配列）の最後尾にtodoを追加
        } else {
          console.log(res.data.message)
        }
      } catch (err) {
        console.log(err)
      }

      state.name = '' // 追加後はnameを空にする（フォーム内がリセットされる）
    }

    // Todoを削除
    const handleDeleteFood = async (id: number): Promise<void> => {
      if (id == null) return // idが無かった場合は以降の処理を行わない

      try {
        const res = await deleteFood(id)

        if (res?.status === 200) {
          state.foods = state.foods.filter(food => food.id !== id) // idが一致しないもののみに絞り込む（要するにidが一致したものを削除する）
        } else {
          console.log(res.data.message)
        }
      } catch (err) {
        console.log(err)
      }
    }

    // Vueインスタンスがマウントされるたびに実行される関数
    onMounted(() => {
      handleGetFoods()
    })

    // template内で使用したいものをreturn
    return {
      state,
      handleCreateFood,
      handleDeleteFood
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
