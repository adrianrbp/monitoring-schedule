class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActionController::RoutingError, with: :render_not_found

  before_action :ensure_json_request
  before_action :set_default_format

  def render_not_found
    render json: { error: 'Not Found' }, status: :not_found
  end

  private
  def set_default_format
    request.format = :json
  end

  def ensure_json_request
    return if request.format.json?
    render json: { error: 'Not Acceptable' }, status: :not_acceptable
  end

end
