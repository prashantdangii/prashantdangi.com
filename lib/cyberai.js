export const SITE = "https://cyberai.prashantdangi.com";
export const API_BASE = "https://api.cyberai.prashantdangi.com/v1";

export const HOME_TITLE = "Cyber AI — Hosted security models on an OpenAI-compatible API";
export const HOME_DESCRIPTION = "Cyber AI hosts security models behind an OpenAI-compatible API. Create an account, issue a key, and point any chat-completions client at the lineup.";

export const NAV = [
  ["Models", "/models"],
  ["Docs", "/docs"],
  ["Guides", "/guides"],
  ["Pricing", "/pricing"],
  ["Affiliates", "/affiliates"]
];

export const FOOTER = [
  ["Models", "/models"],
  ["Pricing", "/pricing"],
  ["Affiliates", "/affiliates"],
  ["Docs", "/docs"],
  ["Guides", "/guides"],
  ["Log in", "/login"],
  ["Sign up", "/signup"],
  ["Terms", "/terms"],
  ["Privacy", "/privacy"]
];

export const PLANS = {
  explore: {
    name: "Explore",
    keys: 2,
    blurb: "Chat in the console and two API keys. Enough to point one agent at the lineup."
  },
  build: {
    name: "Build",
    keys: 10,
    blurb: "More keys for agents you run side by side, once billing can raise the cap."
  },
  team: {
    name: "Team",
    keys: 50,
    blurb: "A shared workspace for a security team, attached when payments can take more than one seat."
  }
};

export const MODELS = [
  {
    id: "cai-glm",
    name: "GLM 5.3",
    maker: "Z.ai",
    blurb: "The default lineup id. Strong at long coding sessions and written analysis.",
    fits: ["Coding", "Long write-ups", "Agents"]
  },
  {
    id: "cai-deephat",
    name: "DeepHat V1",
    maker: "Kindo",
    blurb: "A smaller model aimed at cybersecurity questions and tight technical notes.",
    fits: ["Triage notes", "Short answers"]
  },
  {
    id: "cai-foundation",
    name: "Foundation-Sec",
    maker: "Cisco",
    blurb: "A security-domain model for control language, advisories, and review comments.",
    fits: ["Advisories", "Review comments"]
  },
  {
    id: "cai-lily",
    name: "Lily",
    maker: "Security assistant",
    blurb: "A compact assistant for turning rough notes into a finding the team can edit.",
    fits: ["Finding drafts", "Checklists"]
  },
  {
    id: "cai-whiterabbit",
    name: "WhiteRabbitNeo",
    maker: "DeepSeek-Coder",
    blurb: "A code model for reading a diff and naming the auth, token, and tenancy changes.",
    fits: ["Diff review", "Code"]
  }
];

export const FAQ = [
  {
    q: "Is the model host live today?",
    a: "Accounts, the console, and keys work in this browser. The inference host and card billing are not connected yet, so a chat message is not sent to a model."
  },
  {
    q: "What request do clients send?",
    a: "The same JSON as OpenAI chat completions. Set the base URL to https://api.cyberai.prashantdangi.com/v1, send a bearer key, and put a lineup id in the model field."
  },
  {
    q: "Where do accounts and prompts live right now?",
    a: "The account, keys, and chat transcript stay in this browser until Firebase Auth and the inference host are connected. Prompts are not uploaded."
  },
  {
    q: "When does billing charge a card?",
    a: "It does not. Payments are not connected. Nothing on this site collects a card or a wallet, and the balance stays at zero until that work lands."
  },
  {
    q: "Who operates Cyber AI?",
    a: "Prashant Dangi. The product link sits on cyberai.prashantdangi.com. The practice site is prashantdangi.com."
  }
];

export const PUBLIC_ROUTES = [
  ["/", "1.0"],
  ["/models", "0.8"],
  ["/docs", "0.9"],
  ["/guides", "0.8"],
  ["/pricing", "0.7"],
  ["/affiliates", "0.5"],
  ["/signup", "0.6"],
  ["/login", "0.4"],
  ["/forgot", "0.2"],
  ["/terms", "0.3"],
  ["/privacy", "0.3"]
];

export const CONSOLE_LINKS = [
  { href: "/console", label: "Home", icon: "home" },
  { href: "/console/models", label: "Models", icon: "models" },
  { href: "/console/chat", label: "Chat", icon: "chat" },
  { href: "/console/keys", label: "API keys", icon: "keys" },
  { href: "/console/activity", label: "Activity", icon: "activity" },
  { href: "/console/billing", label: "Billing", icon: "billing" },
  { href: "/console/workspaces", label: "Workspaces", icon: "workspaces" },
  { href: "/console/referrals", label: "Referrals", icon: "referrals" },
  { href: "/console/settings", label: "Settings", icon: "settings" }
];

export function barePath(pathname) {
  if (!pathname) return "/";
  if (pathname === "/cyberai") return "/";
  if (pathname.startsWith("/cyberai/")) return pathname.slice("/cyberai".length) || "/";
  return pathname;
}

export function meta({ title, description, path }) {
  const full = `${title} — Cyber AI`;
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: "Cyber AI",
      type: "website"
    },
    twitter: { card: "summary", title: full, description }
  };
}

export function consoleTitle(title) {
  return { title: { absolute: `${title} — Cyber AI` }, robots: { index: false, follow: false } };
}

export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function referralCode(email) {
  let h = 2166136261;
  const value = String(email || "").trim().toLowerCase();
  for (const c of value) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return `cai${(h >>> 0).toString(36)}`;
}

const providerModels = Object.fromEntries(MODELS.map((model) => [model.id, { name: model.name }]));

export const OPENCODE_TEXT = JSON.stringify({
  $schema: "https://opencode.ai/config.json",
  model: "cyberai/cai-glm",
  provider: {
    cyberai: {
      npm: "@ai-sdk/openai-compatible",
      name: "Cyber AI",
      options: {
        baseURL: API_BASE,
        apiKey: "{env:CYBERAI_API_KEY}"
      },
      models: providerModels
    }
  }
}, null, 2);

export const CURL_TEXT = `curl ${API_BASE}/chat/completions \\
  -H "Authorization: Bearer $CYBERAI_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "cai-glm",
    "messages": [
      {"role": "user", "content": "List the first checks for a burst of failed step-up events."}
    ]
  }'`;

export const PYTHON_TEXT = `from openai import OpenAI
import os

client = OpenAI(
    base_url="${API_BASE}",
    api_key=os.environ["CYBERAI_API_KEY"],
)

reply = client.chat.completions.create(
    model="cai-glm",
    messages=[
        {"role": "user", "content": "Turn these notes into a finding draft with evidence and a fix."}
    ],
)
print(reply.choices[0].message.content)`;

export const GUIDE_SAMPLES = [
  { label: "OpenCode", file: "opencode.json", code: OPENCODE_TEXT },
  { label: "curl", file: "request.sh", code: CURL_TEXT },
  { label: "Python", file: "client.py", code: PYTHON_TEXT }
];

export const USE_CASES = [
  {
    title: "Triage",
    text: "Paste a redacted sign-in export. Ask for the first checks, the entities worth a second look, and what would show the lead is wrong."
  },
  {
    title: "Diff review",
    text: "Point an agent at a branch you own. Ask which changes touch auth, tokens, sessions, or the boundary between tenants."
  },
  {
    title: "Write-up",
    text: "Hand over your notes and get a finding draft the team can edit: what happened, the evidence, the impact, and a fix."
  }
];
