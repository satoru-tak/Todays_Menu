import { AxiosPromise } from 'axios'
import client from './client'
import { Food } from '../../interfaces/index'

// getFoodsを実行した際のレスポンスデータの型
interface GetFoodsResponse {
  status: number
  foods: Food[]
  message: string
}

// createFoodを実行した際のレスポンスデータの型
interface CreateFoodResponse {
  status: number
  food: Food
  message: string
}

// deleteFoodを実行した際のレスポンスデータの型
interface DeleteFoodResponse {
  status: number
  food: Food
  message: string
}

// Food一覧を取得
export const getFoods = (): AxiosPromise<GetFoodsResponse> => {
  return client.get('/foods')
}

// Foodを新規作成
export const createFood = (data: Food): AxiosPromise<CreateFoodResponse> => {
  return client.post('/foods', data)
}

// Foodを削除
export const deleteFood = (id: number): AxiosPromise<DeleteFoodResponse> => {
  return client.delete(`/foods/${id}`)
}