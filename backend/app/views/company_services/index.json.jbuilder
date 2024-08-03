json.data do
  json.array! @company_services, partial: "company_services/company_service", as: :company_service
end

json.status 200
json.statusText "OK"