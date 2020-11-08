FROM node:14-alpine AS builder
WORKDIR /app
RUN apk add python3
RUN apk add g++ make python
COPY package* ./
RUN npm ci
COPY . ./
RUN npm update caniuse-lite browserslist
RUN npm run build

FROM node:14-alpine
WORKDIR /app
#!/bin/sh
# Copy from the stahg 1
COPY --from=builder /app/build /app
EXPOSE 8000
CMD ["node", "index.js"]
