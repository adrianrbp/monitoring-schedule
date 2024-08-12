json.data do
  json.array! @availability do |engineer_availability|
    json.extract! engineer_availability, :engineer, :availability
  end
end

json.status 200
json.statusText "OK"
