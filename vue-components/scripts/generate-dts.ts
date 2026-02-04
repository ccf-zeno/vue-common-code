import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * 根据目录自动生成全局组件声明文件
 */

// 获取当前文件路径上下文
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_NAME = '@toolmatrix/core';

// 组件目录路径
const componentsDir = path.resolve(__dirname, '../src/components');
// 输出路径 (输出到 src 下，和 index.ts 同级，方便打包)
const outputPath = path.resolve(__dirname, '../src/component.d.ts');

// 排除不需要生成全局组件的文件或文件夹
const excludes = ['index.ts', 'types.ts', '.DS_Store'];

async function generate() {
  // 1. 读取组件目录下的所有文件夹名称
  const files = await fs.promises.readdir(componentsDir);

  const components = files.filter((file) => {
    const filePath = path.join(componentsDir, file);
    const stat = fs.statSync(filePath);
    // 只保留文件夹，且不在排除列表中
    return stat.isDirectory() && !excludes.includes(file);
  });

  // 2. 生成代码内容
  // 注意：这里加上了你的 'Mi' 前缀逻辑
  const code = `
export {}

declare module 'vue' {
  export interface GlobalComponents {
${components.map((name) => `    Mi${name}: typeof import('${PACKAGE_NAME}')['${name}'];`).join('\n')}
  }
}
`;

  // 3. 写入文件
  await fs.promises.writeFile(outputPath, code, 'utf-8');
}

generate();
