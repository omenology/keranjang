FROM node:17.1.0-alpine3.12 as base
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
RUN mkdir upload jwt 

ADD ./upload ./upload/
ADD ../jwt ./jwt/
RUN cd ./upload && yarn install --immutable 
EXPOSE 4002
RUN chown -R node /usr/app
USER node
CMD cd ./upload && yarn run dev 


FROM base as production
RUN cd ./upload && yarn run build 
RUN cd ./upload && yarn install --production=true --pure-lockfile
EXPOSE 4002
CMD cd ./upload && yarn run start