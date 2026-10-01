> ## Tokel Genesis — Γένεσις｜創世紀・新篇章
>
> Tokel Genesis 是 TokelPlatform 的社群延續。原團隊的貢獻永遠保留在歷史中；所有舊錢包、代幣、餘額完全相容，鏈上資料一點都沒變。
>
> *Tokel Genesis is a community continuation of TokelPlatform. The original team's contributions remain in the history forever. All existing wallets, tokens and balances are fully compatible, and nothing on-chain has changed.*
>
> This repository is a fork of [TokelPlatform/token-explorer](https://github.com/TokelPlatform/token-explorer); the `genesis` branch carries the continuation's fixes on top of the original history. Home: [github.com/TokelGenesis](https://github.com/TokelGenesis)

# Tokel's Token Explorer

This repo contains the code to run a token-specific web explorer with [Tokel](https://tokel.io)-compatible chains as data sources.

The explorer will use data directly from a full Tokel node.

Blockchain data is stored in Elastic Search Store.

When deploying the server you have to manually create `.env.local` file in root of the project and populate the following environment vars.

```
LOCAL_RUN=1
ELASTIC_USER=xxx
ELASTIC_PASS=xxx
ELASTIC_PORT=xxx
RPC_USER=xxx
RPC_PASS=xxx
ELASTIC_SERVER=xxx
TOKEL_SERVER=xxx
ELASTIC_CA_CERT=/path/to/elasticsearch/config/certs/http_ca.crt
ADMIN_API_KEY=xxx
# optional; defaults suit the web app, raise them for the indexer
ELASTIC_REQUEST_TIMEOUT_MS=5000
ELASTIC_MAX_RETRIES=1
```

- `ELASTIC_CA_CERT`: CA used to verify the Elasticsearch TLS certificate. Verification is always on; set `ELASTIC_TLS_INSECURE=1` only for local development.
- `ADMIN_API_KEY`: required for `PUT /api/tokens/[id]` (e.g. marking a token as featured), sent as `Authorization: Bearer <key>`. If unset, the endpoint is disabled. Generate one with `openssl rand -hex 32`.
