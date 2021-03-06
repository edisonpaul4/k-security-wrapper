import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';
import typescript from "@rollup/plugin-typescript";


export default {
  input: "src/index.ts",
    output: [
        { file: pkg.main, format: 'cjs', sourcemap: true, },
        { file: pkg.module, format: 'esm', sourcemap: true, }
    ],
    plugins: [
        external(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled' 
        }),
        
        typescript({ tsconfig: "./tsconfig.json" }) ,
        
    ],
    // input: "dist/esm/types/index.d.ts",
   //  output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: Object.keys(pkg.peerDependencies || {}),
    
};

