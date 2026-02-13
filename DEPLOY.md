# Deploy to GitHub + Vercel

## Deploy from GitHub to Vercel (recommended)

**Easiest: connect the repo in Vercel — then every push to `main` deploys automatically.**

1. Go to **https://vercel.com** and sign in (e.g. **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. **Import** the repo **V4Vinnie/sandaya** (or your fork).
4. Leave **Build Command** empty; **Output Directory** can stay default (root).
5. Click **Deploy**.

Your game will be live at a URL like `https://sandaya.vercel.app`. Every push to `main` on GitHub will trigger a new deployment. No GitHub Actions or secrets needed.

---

## Optional: Deploy via GitHub Actions

This repo includes a workflow (`.github/workflows/deploy-vercel.yml`) that deploys to Vercel on every push to `main`. To use it:

1. **Import the repo in Vercel once** (steps above) so the project exists.
2. **Get Vercel IDs:** In the Vercel project, go to **Settings** → **General**. Copy **Project ID**. For **Team/Org ID**, go to your [Vercel account](https://vercel.com/account) and copy the **Team ID** (or use your personal **Org ID** from the URL when you open the project).
3. **Create a token:** [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create** → copy the token.
4. **Add GitHub secrets:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Add:
   - `VERCEL_TOKEN` = your token  
   - `VERCEL_ORG_ID` = your team/org ID  
   - `VERCEL_PROJECT_ID` = your project ID  

After that, every push to `main` will run the workflow and deploy to Vercel.

---

## If you need to set up GitHub first

### 1. Create a new repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `syndaya` or `koala-family-delivery`
3. Leave it **empty** (no README, no .gitignore—you already have them)
4. Click **Create repository**

---

### 2. Push your code to GitHub

In the project folder, run (replace `YOUR_USERNAME` and `REPO_NAME` with your GitHub username and repo name):

```bash
cd /Users/vandevi/Syndaya
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

If GitHub suggests using SSH, you can instead:

```bash
git remote add origin git@github.com:YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

---

### 3. Deploy on Vercel

1. Go to **https://vercel.com** and sign in (use “Continue with GitHub” if you like).
2. Click **Add New…** → **Project**.
3. **Import** the GitHub repo you just created (e.g. `YOUR_USERNAME/REPO_NAME`).
4. Leave the defaults (Vercel will treat it as a static site; no build step needed).
5. Click **Deploy**.

Your game will be live at a URL like `https://your-project.vercel.app`. Every push to `main` will trigger a new deployment.

---

### Optional: GitHub CLI

If you install [GitHub CLI](https://cli.github.com/) and run `gh auth login`, you can create the repo and push in one go:

```bash
cd /Users/vandevi/Syndaya
gh repo create syndaya --public --source=. --remote=origin --push
```

Then do step 3 above to import the repo in Vercel.
