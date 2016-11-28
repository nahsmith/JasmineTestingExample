class User < ActiveRecord::Base
  before_save :create_session_token

  def self.create_with_omniauth(auth)
    create! do |user|
    user.provider = auth["provider"]
    user.uid = auth["uid"]
    user.name = auth["info"]["name"]
  end
end

  def create_session_token
    self.session_token = SecureRandom.urlsafe_base64
  end
end
