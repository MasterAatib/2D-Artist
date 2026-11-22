# [2D Artist](https://masteraatib.github.io/2D-Artist/)

A pixel art and texture editor for Minecraft Bedrock add-ons and other game art. It runs in the browser, works offline after the first visit, and never uploads your pictures.

- `index.html` is the home page.
- `tool.html` is the editor.

It can be used three ways, all from this one repository:

| Way | How |
| --- | --- |
| In the browser | Open the site and press **Open the editor**. |
| Installed app (PWA) | In Chrome or Edge press the install icon in the address bar, or use **File > Install as an app** in the editor. iPhone and iPad: Share > Add to Home Screen. |
| Windows folder app | A zip of the Electron version, attached to a GitHub Release (see step 3 below). |

## Put it online with GitHub Pages

You do not need git or a terminal. Everything below is done on github.com.

### 1. Upload the site

1. On GitHub choose **New repository**. Name it, for example, `2d-artist`. Make it **Public**.
2. In the new repository choose **Add file > Upload files**.
3. Drag in **everything inside this folder**: `index.html`, `tool.html`, `manifest.webmanifest`, `sw.js`, `README.md`, and the `icons` and `assets` folders. Then **Commit changes**.

### 2. Turn on Pages

1. Open **Settings > Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
3. After about a minute the site is at `https://YOUR-NAME.github.io/2d-artist/`.

The links on the home page (GitHub, Windows download, issues) work out their address from the page address, so nothing needs editing. If you later use your own domain, set `var REPO = 'your-name/2d-artist';` near the bottom of `index.html`.

### 3. Add the Windows download (optional)

1. Zip your `2D Artist` folder (the one that contains `2D Artist.exe`) and name the zip exactly **`2D-Artist-win64.zip`**.
2. In the repository choose **Releases > Create a new release**. Give it a tag such as `v1.0.0`, drag the zip into the release, and **Publish release**.

The **Download for Windows** button on the home page appears once the site runs on `github.io`, and points at the zip of the latest release. Do not commit the zip into the repository itself: GitHub rejects files over 100 MB, while release files can be up to 2 GB.

## Updating later

- Replace `tool.html` (and `index.html` if you changed it) in the repository. Visitors get the new version the next time they open the site while online; there is no version number to bump.
- If you **add, rename or remove a file**, add or remove it in the `FILES` list in `sw.js` and change `CACHE = '2d-artist-files-2'` to `-3`, so the offline copy refreshes.

## Try it on your computer first

Double-clicking `index.html` works for looking around. The install and offline features need `http`, so for a full test run this in the folder and open `http://localhost:8000/`:

```
python -m http.server 8000
```

## What is in the folder

| File | What it is |
| --- | --- |
| `index.html` | Home page with the small tile painter, screenshots, features and download options. |
| `tool.html` | The editor, one self-contained file. |
| `manifest.webmanifest` | Tells browsers the name, icons and start page so the site can be installed. |
| `sw.js` | Service worker. Saves the site in the browser so it opens offline; pages load from the network first, so updates show up as soon as you are online. |
| `icons/` | App icons (a pixel pencil) in the sizes browsers and phones ask for. |
| `assets/` | Screenshots used on the home page and the headline font. |

## Notes

- Browsers other than Chrome and Edge cannot save to a chosen file in place, so Save downloads the file instead. The Windows app always uses the normal Windows save window.
- The SVG export embeds your picture as an image. It is not editable vector art.
- Autosave lives in the browser's storage on each device. Clearing site data removes it.
- The Windows program is not code-signed, so Windows SmartScreen may ask for confirmation.
- Add a `LICENSE` file that matches how you want others to use the project. The headline font, Pixelify Sans, is under the SIL Open Font License 1.1.
- Minecraft is a trademark of Mojang AB. This project is not affiliated with Mojang or Microsoft.
