class ApplicationController < ActionController::Base
  protect_from_forgery
  protected
  def set_current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end  

  def current_user?(id)
    @current_user.id.to_s == id
  end  
end
