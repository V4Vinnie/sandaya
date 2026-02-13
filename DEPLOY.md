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

## Optional: Deploy via GitHub Actions (Deploy Hook)

This repo includes a workflow that triggers a Vercel deploy on every push to `main`. Uses **one secret** (a Deploy Hook URL):

1. **Import the repo in Vercel once** (steps in “Deploy from GitHub to Vercel” above) and deploy.
2. **Create a Deploy Hook:** In the Vercel project go to **Settings** → **Git** → **Deploy Hooks**. Click **Create Hook**, name it e.g. “GitHub Actions”, copy the URL.
3. **Add one GitHub secret:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Name: `VERCEL_DEPLOY_HOOK_URL`, Value: the hook URL you copied.

After that, every push to `main` will trigger the workflow and Vercel will redeploy from GitHub. If the job fails with “Add secret VERCEL_DEPLOY_HOOK_URL”, add that secret as in step 3.

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
