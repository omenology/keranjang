FROM node:17.1.0-alpine3.12 as base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
RUN mkdir api jwt 
ADD ./api ./api/
ADD ../jwt ./jwt/
RUN cd ./api && yarn install --immutable 
EXPOSE 4000
RUN chown -R node /usr/app
USER node
CMD cd ./api && yarn run dev 


FROM base as production
RUN cd ./api && yarn run build 
RUN cd ./api && yarn install --production=true --pure-lockfile
EXPOSE 4000
CMD cd ./api && yarn run start