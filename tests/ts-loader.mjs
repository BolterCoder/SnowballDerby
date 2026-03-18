import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const tsExtensions = new Set(['.ts', '.tsx']);

export async function resolve(specifier, context, defaultResolve) {
  try {
    return await defaultResolve(specifier, context, defaultResolve);
  } catch (error) {
    const isRelative = specifier.startsWith('./') || specifier.startsWith('../') || specifier.startsWith('/');
    const hasExtension = path.extname(specifier) !== '';

    if (!isRelative || hasExtension) {
      throw error;
    }

    return defaultResolve(`${specifier}.ts`, context, defaultResolve);
  }
}

export async function load(url, context, defaultLoad) {
  const extension = path.extname(new URL(url).pathname);

  if (!tsExtensions.has(extension)) {
    return defaultLoad(url, context, defaultLoad);
  }

  const source = await readFile(new URL(url), 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
    fileName: new URL(url).pathname,
  });

  return {
    format: 'module',
    source: transpiled.outputText,
    shortCircuit: true,
  };
}
