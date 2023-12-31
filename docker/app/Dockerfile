FROM node:18-alpine AS build

USER node

COPY --chown=node:node ./app /app
COPY --chown=node:node ./config /config
WORKDIR /app

RUN npm install
RUN npm run build

# ------ NGINX ------ #

FROM nginx:alpine

RUN chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx
USER nginx

COPY --from=build --chown=nginx:nginx /app/dist /usr/share/nginx/html
COPY --chown=nginx:nginx /config/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD curl --fail http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
