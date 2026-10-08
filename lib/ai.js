import { LINKS } from "./links";

function aiLink(href, label) {
  return `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
}

export function aiReply(raw) {
  const s = String(raw || "").toLowerCase().replace(/\s+/g, " ").trim();
  const mail = '<a href="mailto:prxshantdangi@gmail.com?subject=Fractional%20cybersecurity">email</a>';
  const upwork = aiLink(LINKS.upwork, "Upwork");
  const toptal = aiLink(LINKS.toptal, "Toptal");
  const skool = aiLink(LINKS.skool, "Skool");
  const discord = aiLink(LINKS.discord, "Discord");

  if (/(payload|reverse shell|metasploit|0-?day|zero-?day|proof of concept|\bpoc\b|ransomware|\bmalware\b|shellcode|write (me )?(an )?exploit|how (do|can|to) i (hack|exploit|pwn|break)|give me (a |the )?(exploit|payload|shell)|step[- ]by[- ]step)/.test(s)) {
    return `<p>I don't give exploit steps, payloads, or attack procedures.</p><p>If the system is yours, or you have written authorization to test it, send the surface, the timeline, and what done looks like. That can be a scoped engagement. ${mail}.</p>`;
  }
  if (/(price|pricing|cost|rate|how much|budget|fee)/.test(s)) {
    return `<p>There isn't a public rate card. An engagement is scoped to the surface and the time.</p><p>Send the surface, the timeline, and what done looks like by ${mail}, or start from the ${upwork} or ${toptal} profile.</p>`;
  }
  if (/(course|skool|discord|curriculum|learn|training|lab)/.test(s)) {
    return `<p>Courses live on ${skool}. Labs and curriculum follow the same loop as the client work: recon, exploit, report, harden.</p><p>The free ${discord} group is for lab drops, field notes, and what is changing in offensive security and GRC.</p>`;
  }
  if (/(note|blog|writing|article|writeup|write-up)/.test(s)) {
    return '<p>Field notes are on the <a href="/blog">notes</a> page. Assessments, identity, pipelines, and what has to happen after a finding.</p>';
  }
  if (/(upwork|toptal|portfolio|profile|linkedin|github)/.test(s)) {
    return `<p>Client work is on ${upwork} and ${toptal} (Top 3%). ${aiLink(LINKS.linkedin, "LinkedIn")} and ${aiLink(LINKS.github, "GitHub")} are there too.</p>`;
  }
  if (/(who are you|what are you|your name)/.test(s)) {
    return `<p>I'm CyberAI for Prashant Dangi's practice. I can walk through offensive security, red teaming, GRC, and how a fractional engagement is scoped.</p><p>For a specific system, ${mail} is the direct line.</p>`;
  }
  if (/(cert|ceh|bennett|background|experience|resume|who is|about you|about prashant|iit|gpcs)/.test(s)) {
    return '<p>Prashant Dangi is a fractional cybersecurity engineer. CEH v12, ISO/IEC 27001:2022 Lead Auditor. Finalist, IIT Madras hardware CTF 2026. Top 10, GPCSSI 2024. B.Tech CSE, Bennett University.</p><p>Independent practice on Upwork and Toptal from 2025. Before that, cybersecurity SME at Scaler Academy and analyst at Ascella Infosec. The <a href="/resume.pdf">resume</a> has the sheet.</p>';
  }
  if (/(start|engag|hire|contact|email|reach|book|kick ?off|scope)/.test(s)) {
    return `<p>An engagement starts with a surface, a timeline, and what done looks like. Not a slide deck.</p><p>Write by ${mail}, or start from the ${upwork} and ${toptal} profiles.</p>`;
  }
  if (/(grc|iso|nist|cmmc|audit|annex|compliance|governance|risk)/.test(s)) {
    return "<p>GRC here is ISO 27001, NIST, and CMMC. Risk, policy, and Annex A evidence that survives the audit, grounded in how the systems actually fail.</p><p>The useful version sits next to the test: findings mapped to controls, not a policy pack written in the abstract.</p>";
  }
  if (/(red team|redteam|adversary|att&ck|attack path|assume breach)/.test(s)) {
    return "<p>Red teaming is the path a capable adversary would take with the access you already have. Attack paths, Active Directory, and MITRE ATT&CK.</p><p>A VAPT is the broader assessment: web, API, network, mobile, and cloud, written so engineering can fix it. Red team is narrower and deeper. Both can be scoped. Say which outcome you need.</p>";
  }
  if (/(offensive|vapt|pentest|pen test|assessment|web app|api |mobile)/.test(s)) {
    return "<p>Offensive security covers web, API, network, mobile, and cloud. Twenty-plus assessments. Findings are written so engineering can fix them and an auditor can follow the evidence.</p><p>When the surface is an AI application, that includes prompt injection and the controls around the model. It is in scope when it is the thing being tested.</p>";
  }
  if (/(cloud|aws|azure|gcp)/.test(s)) {
    return "<p>Cloud is part of the assessment work, across AWS, Azure, and GCP. Identity, exposed services, and the path from a finding to a control that holds.</p>";
  }
  if (/(fractional|what do you|services|offer|practice|do you do)/.test(s)) {
    return "<p>Fractional cybersecurity. A senior engineer in the work: offensive security, red teaming, and GRC for teams that need the person, not a slide deck.</p><p>Embedded reviews and security engineering, assessments, and the control work that has to match what the test found.</p>";
  }
  if (/^(hi|hello|hey|yo|sup)[!. ]*$/.test(s)) {
    return "<p>Hello. Ask about the practice, a scoped engagement, or the courses.</p>";
  }
  return `<p>I can talk through the practice: offensive security, red teaming, GRC, courses, and how an engagement starts.</p><p>For a specific system, ${mail} with the surface and the timeline.</p>`;
}
