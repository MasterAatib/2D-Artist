# 2D Artist

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
- If you **add, rename or remove a file**, add or remove it in the `FILES` list in `sw.js` and change `CACHE = '2d-artist-files-3'` to `-4`, so the offline copy refreshes.

## Changing the icon later

Replace the PNG files in `icons/` and keep their names and sizes: `favicon-32.png` (32 x 32), `icon-96.png` (96 x 96), `icon-192.png` (192 x 192), `icon-512.png` (512 x 512), `icon-maskable-512.png` (512 x 512, keep the picture inside the middle 70 percent so Android can crop it) and `apple-touch-icon.png` (180 x 180, no transparent corners). Then change `CACHE` in `sw.js` (see above). The small logo at the top of the editor is built into `tool.html`; to change it, replace the picture inside the `brand` link there. Browsers keep tab icons for a long time: hard refresh with Ctrl+F5, or reopen the tab. An app that was already installed keeps its old icon until it is uninstalled and installed again.

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
| `icons/` | The app icon in the sizes browsers and phones ask for (favicon 32, 96, 192, 512, a padded "maskable" 512 for Android, and a 180 Apple icon). |
| `assets/` | Screenshots used on the home page and the headline font. |

## Notes

- Browsers other than Chrome and Edge cannot save to a chosen file in place, so Save downloads the file instead. The Windows app always uses the normal Windows save window.
- The SVG export embeds your picture as an image. It is not editable vector art.
- The gallery (every drawing, saved automatically) lives in the browser's storage on each device. Drawings stay until you delete them in the gallery, but clearing the site's data in the browser settings removes them too. "Save a copy to a file" in a drawing's menu makes a backup you can keep anywhere. The Windows app keeps the same gallery as files in `%APPDATA%\2D Artist\projects`.
- The Windows program is not code-signed, so Windows SmartScreen may ask for confirmation.
- Add a `LICENSE` file that matches how you want others to use the project. The headline font, Pixelify Sans, is under the SIL Open Font License 1.1.
- Minecraft is a trademark of Mojang AB. This project is not affiliated with Mojang or Microsoft.
