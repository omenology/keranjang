FROM node:17.1.0-alpine3.12 as base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
ADD . .
RUN yarn install --immutable 
EXPOSE 4000
RUN chown -R node /usr/app
USER node
CMD yarn run dev 


FROM base as production
RUN yarn run build && yarn install --production=true --pure-lockfile
EXPOSE 4000
CMD yarn run start