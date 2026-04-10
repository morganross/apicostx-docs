# LAWS

These are non-negotiable. Violations must be caught and reverted immediately.

---

## Data Sovereignty

1. **The database is the single source of truth (SSOT).** Every value lives in exactly one cell. No exceptions. Other tables may hold a foreign key or reference to that cell — they must never contain a copy of the value. If you find the same data stored in two places, one of them is a bug.

2. **Store at maximum granularity.** The database must capture data at the finest level of detail possible. Never aggregate, flatten, or summarize data before storage. Raw granular records go in; aggregation happens at query time.

3. **Incoming API response data is decomposed and inserted into the database granularly as it arrives.** Do not hold payloads in memory, cache them, or defer insertion. Parse and store immediately, field by field, row by row.

4. **No duplicate storage. References only.** If a value already exists in a table, every other place that needs it must reference it — never duplicate it. This rule has zero tolerance. One value, one cell, references everywhere else.

---


You may never run any command to build any react, you must use a script instead. all frontend build and rebuilds must exclusivily use the following script. You may not run build commands at all, you are unable to copy after build, you must use the script. the script builds and copies to the correct location, something that LLM's fail at. 


## Computation

5. **All math is performed by the backend.** The frontend displays charts, graphs, and values retrieved from the database. It never calculates, derives, or applies formulas. If the frontend is doing arithmetic, it is wrong.

---

## Frontend Rendering

6. **Charts must render even when there is no data.** At minimum, display labels, axes, and an empty state. Never crash, hide, or fail to render because data is absent.

---

## Forbidden Patterns

7. **No fallbacks, no placeholder data, no hardcoded defaults.** Every value displayed or used must originate from the database. If the data does not exist, the UI shows empty — not a guess, not a placeholder, not a default constant buried in code.

8. **Versioning is forbidden.** No `v1`, `v2`, or any version prefix anywhere — not in API paths, not in module names, not in database schemas, not anywhere in the codebase.

9. **WebSockets are forbidden.** No WebSocket connections of any kind, anywhere in the system. Use HTTP polling or server-sent events if live updates are needed.

10. **JSON as a storage or transfer format within the system is forbidden.** When JSON arrives from external API responses, it must be read in small chunks, decomposed, and inserted into the database granularly. JSON blobs must never be stored whole in a column or passed around internally.
*we do use json to store a static version of user db for logged-out vistors
---

## Logging

11. **All actions are logged in three phases:** intent ("about to do X"), execution ("doing X"), and completion ("did X" or "failed to do X"). Every meaningful operation must produce all three log entries.

12. **Log levels are configurable.** The system must support adjustable log verbosity (e.g., DEBUG, INFO, WARN, ERROR) controlled by configuration, not by editing code.

---

## Identity

13. **UUIDs for everything.** Every entity — runs, users, documents, connections, records — gets a UUID as its primary identifier. This makes it trivial to import historical runs into any user's database: just paste the rows. No auto-incrementing integers as public identifiers.

---

## Operations

14. **Use the startup script for the backend.** Do not start backend services manually or with ad-hoc commands. Use the designated startup script.

Backend servcice must be restarted after every change.

15. **Always rebuild after changes.** Source edits without a build have zero effect on production. Every code change must be followed by a build. No exceptions, no "I'll build it later."

16. **Harden the server at the earliest possible opportunity.** This means: WordPress fail2ban, OS-level fail2ban, OS firewall, cloud firewall, and enforced long passwords. All of these are required as early as feasible. MFA is deferred until production — everything else is immediate.


howto files must also be followed as law
how to read logs
how to ssh 
how to run commands permissions/docker


if we are just talking, you must provide a 2 sentence summery, or just stop being overly verbose. be consise when we talk. verbose when you write to file.