Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'example.com', 'another-example.com' # Add the domains you want to allow here
    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end