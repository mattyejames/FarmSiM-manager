# Security Policy

FarmSiM Manager is a local, offline, single-user desktop app — there's no
backend server, no accounts, and no network calls. That significantly narrows
what "vulnerability" means here, but supply-chain issues (npm/Cargo
dependencies), Tauri capability/permission misconfiguration, and local data
handling bugs are still in scope.

## Supported Versions

Only the latest [release](../../releases) is supported. Please update before
reporting an issue to confirm it's still present.

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, use GitHub's private reporting:

1. Go to the [**Security** tab](../../security) of this repository.
2. Click **Report a vulnerability** to open a private advisory.

This lets us discuss and fix the issue before it's public. You should get an
initial response within a few days — this is a solo-maintained hobby project,
so please bear with me on turnaround time.

## Scope

**In scope:**
- Vulnerabilities in this app's own code (frontend or the Rust/Tauri shell)
- Vulnerable dependencies (npm or Cargo) that are actually reachable from
  app code — see below on transitive noise
- Tauri capability/permission misconfiguration that broadens what the
  webview can do beyond what the app needs

**Out of scope:**
- Anything requiring physical/local access to a machine that's already
  running the app with its data — the threat model here is "malicious data
  or dependency", not "attacker with a shell on your PC"
- Vulnerabilities in transitive dependencies that are pulled in but never
  exercised by this app's code paths (e.g. unused database-backend or
  bindings crates bundled by upstream libraries) — these are tracked, but
  addressed on upstream's timeline rather than treated as urgent here
- Issues in the third-party map images bundled under `src/assets/maps/`
