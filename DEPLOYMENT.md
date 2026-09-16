# Deployment

Production deploys automatically from `main` through `.github/workflows/deploy-cloudflare.yml`.

Required GitHub Actions repository secrets:

- `CLOUDFLARE_API_TOKEN`: a scoped Cloudflare token with Workers Scripts edit and Workers R2 Data Catalog read permissions for the production account.
- `CLOUDFLARE_ACCOUNT_ID`: the production Cloudflare account ID.

The workflow installs the lockfile exactly, builds the OpenNext bundle with demo mode enabled, and deploys the Worker defined in `wrangler.jsonc`. The Cloudflare token belongs in Actions secrets only. Never commit it.
