This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup

### ESlint & Prettier Setup

[js rules](https://standardjs.com/rules)

```bash
npm install eslint-config-standard
npm install eslint-plugin-tailwindcss
# 避免eslint和prettier冲突,使用如下
npm install eslint-config-prettier
npm install prettier
npm install eslint-plugin-import --save-dev

npm run lint # 检查代码
```

修改`.eslintrc.json`
创建`.vscode/settings.json`

> 安装 eslint, prettier vscode插件
