# GitHub Setup (one-time, ~5 minutes)

The MFRC site is built and ready in this folder. GitHub CLI isn't authenticated in the cloud agent environment, so you need one quick step to create the remote repo.

## Option A — GitHub website (easiest)

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `myfoundationrepairconsultant` (or `mfrc`)
3. Set to **Public**
4. **Do not** add README, .gitignore, or license (we already have them)
5. Click **Create repository**

Then run these commands from the `mfrc` folder (or tell the agent to run them after you create the repo):

```bash
git remote add origin https://github.com/tappel003-byte/myfoundationrepairconsultant.git
git push -u origin main

## Option B — GitHub CLI

```bash
gh auth login
gh repo create myfoundationrepairconsultant --public --source=. --remote=origin --push
```

## Cloudflare Pages (when you're ready — not required now)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Select the `myfoundationrepairconsultant` repo
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22
4. Deploy — you'll get a `*.pages.dev` preview URL
5. When happy: **Custom domains** → add `myfoundationrepairconsultant.com`
6. Update DNS at your registrar to point to Cloudflare (nameservers or CNAME)
7. Cancel Squarespace when cutover is verified

## What's already done

- ✅ 57 pages built (44 migrated + 12 stubs + homepage)
- ✅ Zero broken internal links (CI enforced)
- ✅ Micropiles design system
- ✅ investigate-further bridge preserved
- ✅ Auto sitemap.xml
- ✅ AGENTS.md for any AI model working on the repo
