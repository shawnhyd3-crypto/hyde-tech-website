# Dev/Staging Workflow (Option A)

This repo uses a **safe two-branch flow**:

- `master` = production (live)
- `dev` = staging / redesign work

## Daily workflow

1. Start from `dev`
   ```bash
   git checkout dev
   git pull
   ```
2. Make and test changes locally
3. Commit and push to `dev`
4. Open PR: `dev` → `master`
5. Merge only after checks + visual QA

## Optional feature branches

For bigger changes:

```bash
git checkout dev
git pull
git checkout -b feature/new-hero
# work...
git push -u origin feature/new-hero
```

PR flow:
- `feature/*` → `dev`
- then `dev` → `master`

## Recommended GitHub branch protection (manual once)

GitHub → Settings → Branches

Rule for `master`:
- Require a pull request before merging
- Require at least 1 approval
- Block force pushes

Rule for `dev` (optional):
- Require status checks
- Block force pushes

## Staging URL recommendation

Use a free staging deploy linked to `dev` branch:

- **Cloudflare Pages** (free): production=`master`, preview=`dev`
- **Netlify** (free): publish from `dev` to `dev.hydetech.ca`
- **Vercel** (free): preview deployments per branch

Suggested hostnames:
- `dev.hydetech.ca`
- `staging.hydetech.ca`
