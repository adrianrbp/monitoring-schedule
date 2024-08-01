require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'

# Prevent db truncation if the env is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
# Additional requires. Rails not loaded yet

# 1) Auto-requiring all files in the support dir
Rails.root.glob('spec/support/**/*.rb').sort.each { |f| require f }

# Before running tests: apply pending migrations
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  abort e.to_s.strip
end

# 2) Configurations
RSpec.configure do |config|
  # 2.1) Define ActiveRecord fixtures path (for ActiveRecord)
  config.fixture_paths = [
    Rails.root.join('spec/fixtures')
  ]

  # 2.2) Run each example within a transaction (for ActiveRecord)
  config.use_transactional_fixtures = true

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false

  # 2.3) Test behaviours based on file location eg.(, :type => :controller)
  config.infer_spec_type_from_file_location!

  # 2.4) Filter lines (from Rails gems in backtraces)
  config.filter_rails_from_backtrace!
  # arbitrary gems may also be filtered via:
  # config.filter_gems_from_backtrace("gem name")
end
