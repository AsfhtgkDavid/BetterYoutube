# Contributing to BetterYoutube

Thank you for your interest in improving BetterYoutube! We welcome all contributions, from bug fixes to brand new monkey scripts.

## Guidelines for Adding Scripts

1. **Standalone & Lightweight**: Each script should focus on solving one specific problem effectively without unnecessary dependencies or bloating YouTube's performance.
2. **Metadata Block**: Always include a complete `// ==UserScript==` header block with `@name`, `@version`, `@description`, `@match`, and appropriate `@grant` permissions (use `none` whenever possible unless `unsafeWindow` is needed).
3. **Naming Convention**: Place your script in the `scripts/` directory with the `.user.js` extension (e.g. `scripts/youtube-feature-name.user.js`).
4. **Browser Compatibility**: Test your script with popular userscript managers such as **Violentmonkey**, **Tampermonkey**, or **Greasemonkey** on modern browsers (Chromium / Firefox / Safari).
5. **Update README.md**: Add your script to the list in `README.md` with a concise summary and link.

## Submission Process

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-new-script`.
3. Commit your changes: `git commit -m "feat: Add YouTube Feature Name script"`.
4. Push to your fork and submit a Pull Request.
