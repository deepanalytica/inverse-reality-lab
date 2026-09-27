import fs from "node:fs";
import path from "node:path";

const roots = [
  "runtime",
  "assets",
  "praxios.html",
  "PRAXIOS_ARCHITECTURE.md",
  "THREAT_MODEL.md",
  "SECURITY_INVARIANTS.md"
];

const findings = [];

function scanFile(file) {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return;
  const text = fs.readFileSync(file, "utf8");
  const rules = [
    { name: "OpenAI key-like token", re: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g },
    { name: "Anthropic key-like token", re: /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g },
    { name: "Non-empty OPENAI_API_KEY assignment", re: /OPENAI_API_KEY\s*=\s*[^\s#][^\r\n]*/g },
    { name: "Non-empty ANTHROPIC_API_KEY assignment", re: /ANTHROPIC_API_KEY\s*=\s*[^\s#][^\r\n]*/g },
    { name: "Non-empty PRAXIOS_SERVER_TOKEN assignment", re: /PRAXIOS_SERVER_TOKEN\s*=\s*[^\s#][^\r\n]*/g },
    { name: "Non-empty PRAXIOS_DATA_KEY assignment", re: /PRAXIOS_DATA_KEY\s*=\s*[^\s#][^\r\n]*/g }
  ];
  for (const rule of rules) {
    const matches = text.match(rule.re) || [];
    for (const match of matches) findings.push({ file, rule: rule.name, match: match.slice(0, 80) });
  }
}

function walk(target) {
  if (!fs.existsSync(target)) return;
  const stat = fs.statSync(target);
  if (stat.isFile()) return scanFile(target);
  for (const name of fs.readdirSync(target)) {
    if ([".git", "node_modules", ".praxios-data"].includes(name)) continue;
    const child = path.join(target, name);
    if (fs.statSync(child).isDirectory()) walk(child);
    else if (/\.(?:mjs|js|json|html|md|yaml|yml|example|txt)$/i.test(name) || name === "Dockerfile") scanFile(child);
  }
}

for (const root of roots) walk(root);

if (findings.length) {
  console.error("PRAXIOS secret scan FAILED");
  for (const finding of findings) {
    console.error(" -", finding.file, finding.rule, finding.match);
  }
  process.exit(1);
}

console.log("PRAXIOS secret scan OK");
