FROM nginx:1.15.0-alpine

#Remove a configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
