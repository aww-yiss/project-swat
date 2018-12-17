FROM ubuntu:18.04

LABEL maintainer="Josh Bradley"
LABEL project="swat"
LABEL version="0.1.0"
LABEL license="MIT"

RUN apt update && apt upgrade -y

RUN apt-get update && apt-get install --no-install-recommends -y \
  ca-certificates \
  curl \
  fontconfig \
  fonts-liberation \
  gconf-service \
  git \
  libappindicator1 \
  libasound2 \
  libatk1.0-0 \
  libc6 \
  libcairo2 \
  libcups2 \
  libdbus-1-3 \
  libexpat1 \
  libfontconfig1 \
  libgcc1 \
  libgconf-2-4 \
  libgdk-pixbuf2.0-0 \
  libglib2.0-0 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libstdc++6 \
  lib\x11-6 \
  libx11-xcb1 \
  libxcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxi6 \
  libxrandr2 \
  libxrender1 \
  libxss1 \
  libxtst6 \
  locales \
  lsb-release \
  nodejs \
  npm \
  unzip \
  wget  \
  xdg-utils

RUN useradd --create-home --user-group --shell /bin/bash headless

RUN npm install --save puppeteer@^1.11.0

RUN npm install --save chrome-har@^0.7.1

WORKDIR /data

USER headless

# ENTRYPOINT [ "/bin/bash" ]
CMD ["node", "index.js"]
