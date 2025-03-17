# [SolBond.co](https://solbond.co)

> Sell digital easily

## Setup

Using [Bun](https://bun.sh).

```
bun i
```

Be invited into [Ronin workspace](https://ronin.co/solbond) (ask [Nikita](https://t.me/nikivi) for invitation).

Run `ronin login` and auth. It should [update global bun config](https://ronin.co/docs/automatic-types) to choose the right registry.

Create `web/.env` with content:

```
RONIN_TOKEN=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_URL=http://localhost:3000
```

Create `api/.env` with content:

```
RONIN_TOKEN=

STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

## Run website

```
bun web
```

See [web/readme.md](web/readme.md)

## Run API

```
bun api
```

See [api/readme.md](api/readme.md)

## Docs

See [docs/docs.md](docs/docs.md)

## Tasks

All tasks are in [one issue](https://github.com/solbond/solbond/issues/1) for now. Ask to be invited to Linear to update the issue (can also update it from GitHub itself as there is 2 way Linear/GitHub sync setup).

Can freely create issues too.

## Chat

Internal chat in Telegram (ask for invitation).

Community chat in [Discord server](https://discord.com/invite/TVafwaD23d).
