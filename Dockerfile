# FROM ubuntu:20.04
# LABEL MAINTAINER "Subash SN"

# WORKDIR /app

# RUN apt-get update && \
#     apt-get install -y curl wget iputils-ping && \
#     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash && \
#     bash -c "source ~/.nvm/nvm.sh && nvm install 8.17.0 && nvm use 8.17.0 && nvm alias default 8.17.0 && nvm install-latest-npm"
	
# ENV NVM_DIR="/root/.nvm"
# ENV NODE_VERSION="8.17.0"
# ENV NVM_SYMLINK_CURRENT=true
# ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH"

# COPY package*.json ./

# COPY . .

# RUN . ~/.nvm/nvm.sh && npm install -g nodemon && npm install

# RUN . ~/.nvm/nvm.sh && npm uninstall bcrypt && npm install bcrypt

# EXPOSE 9090

# CMD ["/bin/bash", "-c", ". ~/.nvm/nvm.sh && npm start"]

# Damn Vulnerable NodeJS Application

FROM node:carbon
LABEL MAINTAINER "Subash SN"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 9090

CMD ["npm", "start"]
