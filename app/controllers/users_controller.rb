class UsersController < ApplicationController

  before_filter :set_current_user
  
  def show
    @user = @current_user
  end
  
end  
