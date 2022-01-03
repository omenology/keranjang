FROM node:17.1.0-alpine3.12 as base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
ADD . .
RUN yarn install --immutable 
EXPOSE 3000
RUN chown -R node /usr/app
USER node
CMD yarn run dev 


FROM base as production
RUN yarn next build && yarn install --production --ignore-scripts --prefer-offline
EXPOSE 3000
CMD yarn run start