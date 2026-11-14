import ts from "typescript";
const cfg = ts.readConfigFile("tsconfig.node.json", ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(cfg.config, ts.sys, ".");
const program = ts.createProgram(parsed.fileNames, parsed.options);
const diags = ts.getPreEmitDiagnostics(program);
for (const d of diags) {
  if (d.file) {
    const { line, character } = d.file.getLineAndCharacterOfPosition(d.start);
    console.log(`${d.file.fileName}(${line+1},${character+1}): ${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`);
  } else console.log(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
}
