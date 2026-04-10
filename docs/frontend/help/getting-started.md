# Getting Started

## The Mental Model

A normal ACM2 session looks like this:

1. WordPress authenticates the user
2. WordPress sends the user's DB key to the backend
3. the backend returns a session token
4. the frontend app uses that session token for normal API calls
5. those API calls read and write only that user's encrypted data

The backend is stateful in one important way: it caches the user's DB key in RAM.

That is why login matters, and why a backend restart can force the user to log in again even if the browser still has a token.

## Main Objects

The API revolves around a few major object types:

- users
- presets
- contents
- runs
- run artifacts
- credits
- provider keys

## Typical User Journey

Most real usage follows this path:

1. create or load presets
2. create or load contents
3. create a run from a preset
4. start the run
5. poll run status or list runs
6. inspect run detail, logs, report, and export

## The Important Constraint

Free users can read but cannot write user state.

Paid users can do normal create and update operations.

## Base URL

The backend API lives under:

`https://api.apicostx.com/api`

In local or private environments, use the backend host URL that your deployment defines.

