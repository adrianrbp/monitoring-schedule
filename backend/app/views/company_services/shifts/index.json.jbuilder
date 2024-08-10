json.data do
  json.array! @shifts, partial: "company_services/shifts/shift", as: :shift
end

json.status 200
json.statusText "OK"