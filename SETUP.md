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
```

## Option B — GitHub CLI

```bash
gh auth login
gh repo create myfoundationrepairconsultant --public --source=. --remote=origin --push
```

## Cloudflare deploy

You have two valid paths. **Pages is preferred** (gives you a `*.pages.dev` URL). If you already created a Worker project, use Path A.

### Path A — Fix the existing Worker project (fastest if build already ran)

This repo now includes `wrangler.toml`, which tells `npx wrangler deploy` to publish the `dist/` folder.

1. Open your **`myfoundationrepairconsultant`** project in Cloudflare
2. Go to **Settings** → **Build**
3. Confirm:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/` (repo root)
4. Add environment variable: `NODE_VERSION` = `22`
5. Click **Retry deployment** (or push any commit to trigger a new build)

After success, your site will be at something like `https://myfoundationrepairconsultant.<your-subdomain>.workers.dev`.

### Path B — Create a Pages project (preferred long-term)

The Pages option is **not** on the Hello World Worker screen. Use this flow instead:

1. [dash.cloudflare.com](https://dash.cloudflare.com) → left sidebar **Workers & Pages**
2. Click **Create application** (blue button — not "Create Worker")
3. Select the **Pages** tab
4. Click **Connect to Git**
5. Authorize GitHub and select **`myfoundationrepairconsultant`**
6. Build settings:
   - **Framework preset:** None (or Astro)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION` = `22`
   - **Deploy command:** leave blank (Pages handles this automatically)
7. Click **Save and Deploy**

You'll get a `*.pages.dev` URL. Test these paths:

- `/design-comparison`
- `/preview/helical-piers`
- `/preview/start-here`
- `/micropiles`

### Custom domain (when ready)

1. In the Pages project: **Custom domains** → add `myfoundationrepairconsultant.com`
2. Update DNS at your registrar to point to Cloudflare
3. Cancel Squarespace after cutover is verified

## What's already done

- ✅ 57 pages built (44 migrated + 12 stubs + homepage)
- ✅ Zero broken internal links (CI enforced)
- ✅ Micropiles design system
- ✅ investigate-further bridge preserved
- ✅ Auto sitemap.xml
- ✅ AGENTS.md for any AI model working on the repo
