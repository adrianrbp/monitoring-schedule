require 'factory_bot'

# 2) Configurations
RSpec.configure do |config|
  # 2.5) Load Factory Bot methods (auto-include)
  config.include FactoryBot::Syntax::Methods

  # config.before(:suite) do
  #   FactoryBot.find_definitions
  # end
end