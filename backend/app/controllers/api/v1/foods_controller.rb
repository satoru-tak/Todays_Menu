class Api::V1::FoodsController < ApplicationController
  def index
    render json: { status:200, foods: Food.all, message: 'success' }
  end

  def create
    food = Food.new(food_params)

    if food.save
      render json: { status: 200, food: food, message: 'success' }
    else
      render json: { status: 500, food: nil, message: food.errors }
    end
  end

  def destroy
    food = Food.find(params[:id])

    if food.destroy
      render json: { status: 200, food: food, message: 'success' }
    else
      render json: { status: 500, food: nil, message: 'food.errors' }
    end
  end

  private
  def food_params
    params.require(:food).permit(:name, :description)
  end
end
