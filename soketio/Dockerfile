FROM node:17.1.0-alpine3.12 as base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
RUN mkdir soketio jwt 
# ADD ./soketio/package.json ./soketio
# ADD ./soketio/yarn.lock ./soketio
ADD ./soketio ./soketio/
ADD ../jwt ./jwt/
RUN cd ./soketio && yarn install --immutable 
EXPOSE 4001
RUN chown -R node /usr/app
USER node
CMD cd ./soketio && yarn run dev 


FROM base as production
RUN yarn run build 
RUN yarn install --production=true --pure-lockfile
EXPOSE 4001
CMD cd ./soketio && yarn run start