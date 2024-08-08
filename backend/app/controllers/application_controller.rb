class ApplicationController < ActionController::API
  before_action :ensure_json_request
  before_action :set_default_format

  private
  def set_default_format
    request.format = :json
  end

  def ensure_json_request
    return if request.format.json?
    render json: { error: 'Not Acceptable' }, status: :not_acceptable
  end
end
