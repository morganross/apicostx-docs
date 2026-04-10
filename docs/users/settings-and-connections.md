# User Guide: Settings and Connections

The Settings page is where you connect ACM to the services it needs.

## Provider Keys

Provider keys are used for external model and search providers. Examples include:

- OpenAI
- Anthropic
- Google
- OpenRouter
- Tavily

What you can do in Settings:

- save a provider key
- refresh the configured-provider list
- delete a saved key
- see whether a provider appears configured

After saving a key, the UI usually shows only a masked value rather than the full secret.

## GitHub Connections

GitHub connections let the app browse or import files from a repository.

Typical fields:

- connection name
- repository
- branch
- token

From the GitHub section you can:

- add a connection
- test whether it works
- browse the repository
- delete an old connection

## Sign-In Requirement

If the page says ACM account setup is required, it means the app does not currently have a working ACM auth credential. Sign in again through WordPress and reload the page.

## Important Notes

- Settings are account-level, not tied to just one run.
- Deleting a provider key or GitHub connection can break future runs that depend on it.
- GitHub access is separate from provider-key access. Saving one does not configure the other.
