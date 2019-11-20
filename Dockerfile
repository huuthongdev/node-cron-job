FROM node:12.13.0-alpine

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /rebateton

# Copying source files
COPY . .

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

# Building app
RUN npm run build

EXPOSE 4100

# Running the app
CMD [ "npm", "start" ]
