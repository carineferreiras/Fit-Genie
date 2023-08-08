class PasswordsController < ApplicationController
  def update
    if Current.user.update(password_params)
      render json: { message: "Password Updated" }
    else
      render json: { error: "Failed to update password" }, status: :unprocessable_entity
    end
  end

  private

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
  