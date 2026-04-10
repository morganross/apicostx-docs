# Request And Auth Flow

## API Prefix

All app routes live under `/api`.

The router is assembled in `app/api/router.py`.

## Main Auth Rule

Frontend requests use `X-ACM2-Session-Token`.

Legacy `X-ACM2-API-Key` auth is removed for normal user requests.

## WordPress Bridge

WordPress uses `X-ACM2-Plugin-Secret` for privileged server-to-server calls such as:

- user creation
- login token exchange
- session refresh
- password rekey
- membership activate/deactivate
- credit add
- backend user delete

## Route Dependency Pattern

Most authenticated routes use:

- `user: dict = Depends(get_current_user)`
- `db: AsyncSession = Depends(get_user_db)`

`get_current_user` sets `request.state.user`, and `get_user_db` reads that state to open the correct per-user encrypted DB.

## Membership Gate

Free users may read but not write.

The write gate lives in `app/auth/middleware.py` and blocks non-exempt write routes for free-tier users.

