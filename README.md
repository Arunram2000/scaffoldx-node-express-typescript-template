# scaffoldx-node-express-typescript-template

Production-ready Node.js + TypeScript + Express starter template for [ScaffoldX CLI](https://github.com/scaffoldx/cli).

## Usage

```bash
scaffoldx create node express-ts
```

The CLI will prompt for:

| Placeholder    | Description              | Example         |
| -------------- | ------------------------ | --------------- |
| `PROJECT_NAME` | npm package name         | `my-api`        |
| `PORT`         | HTTP port to listen on   | `3000`          |

---

## Repository Structure

```
scaffoldx-node-express-typescript-template/
│
├── template/                  ← copied into generated project
│   ├── src/
│   │   ├── app.ts             ← Express factory (createApp)
│   │   ├── server.ts          ← HTTP listen + graceful shutdown
│   │   ├── config/
│   │   │   └── env.ts         ← dotenv + typed env object
│   │   ├── controllers/
│   │   │   └── healthController.ts
│   │   ├── middlewares/
│   │   │   ├── errorHandler.ts
│   │   │   └── requestLogger.ts
│   │   ├── routes/
│   │   │   └── index.ts
│   │   ├── services/          ← empty, ready to extend
│   │   └── utils/
│   │       └── logger.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── .gitignore
│
├── template.json              ← ScaffoldX metadata
├── prompts.json               ← CLI prompt definitions
├── hooks/
│   └── post-create.js         ← runs `npm install` after generation
└── README.md
```

> **Rule:** Only files inside `template/` become generated project files.  
> Root files are CLI metadata only — never place app source here.

---

## Generated Project Features

- **Health route** — `GET /health` → `{ status, uptime, timestamp }`
- **Error middleware** — structured JSON errors, 404 catch-all
- **Request logger** — method, path, status, duration on every request
- **dotenv** — loaded once in `config/env.ts`, typed config object exported
- **Graceful shutdown** — `SIGTERM` / `SIGINT` handlers in `server.ts`
- **TypeScript strict mode** — `strict`, `noUnusedLocals`, `noUnusedParameters`, `noImplicitReturns`

---

## Testing the Template Locally

```bash
# Simulate what ScaffoldX does
mkdir -p /tmp/test-output
cp -r template /tmp/test-output/my-api

cd /tmp/test-output/my-api

# Replace placeholders manually for testing
find . -type f | xargs sed -i 's/PROJECT_NAME/my-api/g'
find . -type f | xargs sed -i 's/PORT/3000/g'

cp .env.example .env
npm install
npm run dev
```

Then verify:

```bash
curl http://localhost:3000/health
# {"status":"ok","uptime":...,"timestamp":"..."}
```

---

## Scripts (generated project)

| Script        | Description                         |
| ------------- | ----------------------------------- |
| `npm run dev` | Start with hot-reload (ts-node-dev) |
| `npm run build` | Compile TypeScript → `dist/`      |
| `npm start`   | Run compiled output                 |

---

## Extending the Template

Add new route modules under `src/routes/`, register them in `src/routes/index.ts`.  
Add business logic under `src/services/`, call from controllers.  
Keep `src/app.ts` clean — middleware and routes only.

---

## What's Intentionally Excluded

- No ORM / database layer
- No authentication
- No Docker / containerisation
- No Redis / caching layer

This is a clean foundation. Add what your project actually needs.
