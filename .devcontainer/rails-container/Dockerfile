FROM mcr.microsoft.com/devcontainers/ruby:1-3.3-bullseye

# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends \
#         postgresql-client postgresql-contrib libpq-dev libvips-dev

# Install Node.js and Yarn
# RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - \
#     && apt-get install -y nodejs \
#     && npm install -g yarn \
#     && apt-get clean \
#     && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /var/cache/apt/archives/*


# Install Rails
RUN su vscode -c "gem install rails solargraph"


