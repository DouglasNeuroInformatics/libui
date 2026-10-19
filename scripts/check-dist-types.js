/**
 * Type-checks the built declarations in `dist` as a consumer without the global `React` namespace would see them.
 *
 * `@types/react` declares `export as namespace React`, which makes a bare `React.X` resolve in any program that
 * includes it, so libui's own `tsc` cannot catch a declaration that uses `React` without importing it. Consumers
 * whose React types lack that global (e.g., a vendored `react` package) get `TS2503: Cannot find namespace 'React'`,
 * which `skipLibCheck` hides, and the affected props silently become `any`. To reproduce this, the compiler host
 * strips the global from `@types/react` in memory before checking every `dist/**\/*.d.ts` file.
 *
 * Run after `pnpm build`.
 */

import path from 'node:path';
import process from 'node:process';

import ts from 'typescript';

const DIST_DIR = path.resolve('dist');
const TYPES_REACT_PATTERN = /[\\/]@types[\\/]react[\\/]/;
const UMD_GLOBAL_PATTERN = /^export as namespace React;$/m;

/** @type {ts.CompilerOptions} */
const options = {
  jsx: ts.JsxEmit.ReactJSX,
  lib: ['lib.dom.d.ts', 'lib.esnext.d.ts'],
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  noEmit: true,
  skipLibCheck: false,
  strict: true,
  target: ts.ScriptTarget.ES2022,
  types: []
};

// guard against this check silently passing if the layout of @types/react changes
let didReadTypesReact = false;
let didStripGlobal = false;

const host = ts.createCompilerHost(options);
const readFile = host.readFile.bind(host);
/** @param {string} fileName */
host.readFile = (fileName) => {
  const text = readFile(fileName);
  if (text === undefined || !TYPES_REACT_PATTERN.test(fileName)) {
    return text;
  }
  didReadTypesReact = true;
  if (UMD_GLOBAL_PATTERN.test(text)) {
    didStripGlobal = true;
    return text.replace(UMD_GLOBAL_PATTERN, '');
  }
  return text;
};

const rootNames = ts.sys.readDirectory(DIST_DIR, ['.d.ts']);
if (rootNames.length === 0) {
  console.error(`No declaration files found in '${DIST_DIR}'. Did you run 'pnpm build'?`);
  process.exit(1);
}

const program = ts.createProgram({ host, options, rootNames });
const diagnostics = ts.getPreEmitDiagnostics(program).filter((d) => d.file?.fileName.startsWith(DIST_DIR));

if (!didReadTypesReact) {
  console.error('No file from @types/react was read, so the check is not meaningful.');
  process.exit(1);
} else if (!didStripGlobal) {
  console.error("Could not find 'export as namespace React;' in @types/react, so the check is not meaningful.");
  process.exit(1);
}

if (diagnostics.length > 0) {
  const files = new Set(diagnostics.map((d) => d.file?.fileName));
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => ts.sys.newLine
    })
  );
  console.error(`Found ${diagnostics.length} error(s) in ${files.size} of ${rootNames.length} declaration file(s).`);
  process.exit(1);
}

process.stdout.write(
  `Checked ${rootNames.length} declaration file(s) without the global React namespace: no errors.${ts.sys.newLine}`
);
