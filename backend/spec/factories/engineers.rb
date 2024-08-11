# == Schema Information
#
# Table name: engineers
#
#  id         :bigint           not null, primary key
#  name       :string
#  color      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
FactoryBot.define do
  factory :engineer do
    name { Faker::Name.name }
    # color { Faker::Color.hex_color }
    color do
      # Generate a pastel color by keeping RGB values high and saturation low
      r = rand(200..255)
      g = rand(200..255)
      b = rand(200..255)
      "#%02x%02x%02x" % [r, g, b]
    end
  end
end
