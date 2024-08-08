json.data do
  json.past do
    json.array! @weeks_past, partial: "weeks/week", as: :week
  end
  json.future do
    json.array! @weeks_future, partial: "weeks/week", as: :week
  end
end

json.status 200
json.statusText "OK"