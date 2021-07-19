# Backend

## Installling

Follow the steps in the project [readme](https://github.com/guardian/editions/blob/master/README.md).

## Running locally

### Janus

Ensure you have Janus credentials for `cmsFronts`, `capi` and `frontend`.

### Env vars

You will need a `.env` file to run the backend. This file should have following details in it:
APPS_RENDERING_URL='<apps rendering proxy url>'
APPS_RENDERING_PROXY_HEADER_KEY='<apps rendering proxy header key>'
frontsStage=<code/prod>
capiPreviewUrl=<capi preview url>
CAPI_KEY=<a capi key>
psurl=<preview printsent url>

`stage` is `prod` due to the fact that you get more results that way! The CAPI key is the canonical testing key ... if this, for whatever reason, doesn't work in future you can change it to a valid one.

### Run

```bash
yarn preview
```

You can now access the backend on `https://localhost:3131/`

The routing is done in `application.ts` - go and find some routes to hit!
