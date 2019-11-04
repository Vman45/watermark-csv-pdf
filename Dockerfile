FROM debian:buster
LABEL maintainer="Ruan Klein"

# Project configuration
ENV USER=app
ENV PROJECT_FOLDER=/usr/src/${USER}

# Configure non-root user
RUN groupadd -g 1000 ${USER} && useradd -u 1000 -g ${USER} -s /bin/bash -m ${USER}

# Update package list
RUN apt-get update

# Install & Configure sudo
RUN apt-get -y install sudo \
    && echo "${USER} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Install NodeJS dependencies
RUN apt-get -y install curl software-properties-common

# Add NodeJS repository
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# Install NodeJS
RUN apt-get -y install nodejs

# Clear apt cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install NPM global packages
RUN npm install -g yarn serve

# Fix permissions
RUN mkdir -p ${PROJECT_FOLDER} && chown -R ${USER}:${USER} ${PROJECT_FOLDER}

# Change user
USER ${USER}

# Change directory
WORKDIR ${PROJECT_FOLDER}

# Bundle app source
COPY . .

# Install project dependencies
RUN yarn install

# Build static js for react
RUN yarn build

CMD [ "yarn", "prod" ]