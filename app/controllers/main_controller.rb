class MainController < ApplicationController
  def index
    if Current.user
      @user = Current.user
      render json: @user
    else
      render json: { message: "Not logged in" }, status: :unauthorized
    end
  end
end
  