# Deploy to GitHub + Vercel

Your project is already a git repo with an initial commit. Follow these steps to put it on GitHub and deploy to Vercel.

---

## 1. Create a new repo on GitHub

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `syndaya` or `koala-family-delivery`
3. Leave it **empty** (no README, no .gitignore—you already have them)
4. Click **Create repository**

---

## 2. Push your code to GitHub

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

## 3. Deploy on Vercel

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
