# 工具矩阵组件库

## 按需引入

```javascript
pnpm install unplugin-vue-components/vite


import Components from 'unplugin-vue-components/vite';


export default defineConfig({
  plugins:[
    Components({
      resolvers: [
        (name: string) => {
          if (name.startsWith('Mi')) {
            const componentName = name.slice(2);
            return {
              name: componentName,
              from: '@toolmatrix/core',
            };
          }
        },
      ],
    }),
  ]
})
```
