# ---------- 构建阶段 ----------
#FROM crpi-rnrir50uwprvffzp.cn-chengdu.personal.cr.aliyuncs.com/mumi/mumi666:node-20.18.1-alpine AS builder
FROM node:20.18.1-alpine AS builder

WORKDIR /app

# 只拷贝依赖描述文件，提高缓存命中
COPY package.json package-lock.json* ./

RUN npm install

# 拷贝源码
COPY . .

# 构建
RUN npm run build


# ---------- 运行阶段 ----------
#FROM crpi-rnrir50uwprvffzp.cn-chengdu.personal.cr.aliyuncs.com/mumi/mumi666:nginx-1.26-alpine
FROM nginx:1.26-alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 拷贝自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 拷贝构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
