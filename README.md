# DINTEL Design System for Liferay

A Liferay site initializer plus theme client extension that delivers the DINTEL design system
(Sistema de Diseño de la Agencia Estatal de Administración Digital — AEAD) on Liferay DXP 7.4.13.

## Contents

```
dintel-ds/
├── settings.gradle                ← workspace plugin (Gradle)
├── gradle.properties              ← liferay.workspace.product=dxp-2024.q4.0
├── build-scripts/
│   └── dintel-site-initializer/
│       ├── bnd.bnd                ← OSGi headers (Liferay-Site-Initializer-Name, Provide-Capability)
│       └── build.gradle
├── client-extensions/
│   └── dintel-theme/
│       ├── client-extension.yaml  ← type: themeCSS
│       ├── frontend-token-definition.json
│       └── src/index.css          ← DINTEL primitives + semantic tokens + dnt-icon font
├── META-INF/
│   └── resources/thumbnail.png    ← shown in "New Site → Select Template"
└── site-initializer/              ← source of truth — EDIT HERE
    ├── thumbnail.png
    ├── fragments/group/dintel/    ← collection + resources + fragments dintel-*
    ├── layout-page-templates/master-pages/main/
    ├── layouts/                   ← 1_home, fundamentos, componentes, sign-in
    ├── layout-set/public/metadata.json
    └── style-books/dintel-dark/   ← (the default style book is built from theme tokens)

W3C-ds/                            ← sibling project: W3C Design System sister implementation
```

## What you get

- **OSGi site initializer** named **"DINTEL"** in *New Site → Select Template*.
- **CSS theme client extension** `dintel-theme` (primitives + semantic tokens, 2-layer architecture
  aligned with the official DINTEL token system at dintel.redsara.es/tokens).
- ~36 fragments under the `dintel-*` namespace.
- 4 pages: Home, Fundamentos, Componentes, Sign in.
- `dnt-icon` icon font (136 glyphs) loaded by the theme.

## Build

### 1) Site initializer (OSGi JAR)

The workspace's bundled JS transpiler does not work for a resources-only bundle, so build the
JAR manually from the workspace root. First create the manifest from the bnd headers:

```bash
cat > /tmp/dintel-manifest.mf <<'EOF'
Manifest-Version: 1.0
Bundle-ManifestVersion: 2
Bundle-Name: DINTEL Site Initializer
Bundle-SymbolicName: com.dintel.site.initializer
Bundle-Version: 1.0.0
Liferay-Site-Initializer-Name: DINTEL
Provide-Capability: liferay.site.initializer
Web-ContextPath: /site-initializer-dintel

EOF
```

(Note: the trailing blank line is required for a valid manifest.)

Then build the JAR including both `site-initializer/` and `META-INF/`:

```bash
mkdir -p build-scripts/dintel-site-initializer/build/libs
jar cfm build-scripts/dintel-site-initializer/build/libs/com.dintel.site.initializer-1.0.0.jar \
  /tmp/dintel-manifest.mf \
  -C . site-initializer -C . META-INF
```

### 2) Theme client extension (ZIP)

```bash
./gradlew :client-extensions:dintel-theme:assemble
```

The artifact is `client-extensions/dintel-theme/dist/dintel-theme.zip`.

## Deploy

Drop both artifacts into the Liferay `deploy/` directory of your target instance:

- `build-scripts/dintel-site-initializer/build/libs/com.dintel.site.initializer-1.0.0.jar`
- `client-extensions/dintel-theme/dist/dintel-theme.zip`

Confirm in the Liferay logs:

- The bundle `com.dintel.site.initializer` reaches the `STARTED` state.
- The client extension `dintel-theme` is registered (look for it under
  *Control Panel → System → Client Extensions*).

## Create the site

1. Go to **Control Panel → Sites → Add Site**.
2. Pick **DINTEL** under *Select Template*.
3. Name and finish.

## Select the CSS theme (post-site creation)

The site is created with `themeName: "Classic"` because Liferay 7.4.13 does not resolve a
`themeCSS` client extension via the site initializer metadata. Apply the DINTEL theme manually:

1. Go to **Site Administration → Site Builder → Pages**.
2. Open **Configuration → Look and Feel** *(or Site Settings → Look and Feel)*.
3. Under **CSS Client Extension**, choose **DINTEL Theme**.
4. Save. The site renders with the DINTEL palette, Nunito Sans typography and dnt-icon font.

For dark mode, apply the **DINTEL Dark** style book under *Site Builder → Style Books*.

## Edit / iterate

- Edit fragments, layouts, master page and style books **under `site-initializer/`** —
  that directory is the single source of truth.
- Edit theme tokens under `client-extensions/dintel-theme/src/index.css`.
- Rebuild the JAR / ZIP (commands above) and redeploy. Existing sites do **not** pick up
  changes from the JAR — only newly created sites do. Theme CE changes are live on redeploy.

## Liferay 7.4.13 specifics (gotchas)

- Fragment FreeMarker uses **bracket** syntax: `[#if]…[/#if]`. AntiSamy filters `<#if>`.
- Avoid `[#elseif]`. Use multiple `[#if]` blocks with a `[#assign]` instead.
- Icons inside fragments use `<span>`, never `<i>` (AntiSamy strips empty `<i>`).
- Checkbox config fields: no `dataType`; `defaultValue` is the string `"true"`/`"false"`.
- Style books always use `"themeId": "classic_WAR_classictheme"`.
- The site initializer thumbnail must live at `META-INF/resources/thumbnail.png` inside the JAR.

## Token architecture

Two layers:

- **Primitives** — `--regular-primitives-grey-{000..700}`, `--regular-primitives-primary-{000..700}`,
  `--regular-primitives-secondary-{000..700}`, status, focus. Fixed scales, not overridable from
  style books.
- **Semantic tokens** — `--color-{bg,text,border,icon}-{primary,secondary,...}` plus
  interactive states. Style books override only these. Fragments **must** use semantic tokens.

See `client-extensions/dintel-theme/src/index.css` for the full mapping.

### Light is the default; dark is the only override

There is no light/dark *pair* and no automatic switching. The **light theme is the baseline**:
the semantic-token defaults defined in the theme CE (`index.css` `:root`, mirrored as the
`defaultValue`s in `frontend-token-definition.json`). That baseline has no name and no style book —
it is simply what renders when the DINTEL theme is applied.

The **only extra is dark**: a single, optional style book `dintel-dark`
(`defaultStyleBookEntry: false`) that overrides those semantic tokens to dark values. It is **not**
applied automatically — a site administrator selects it under *Site Builder → Style Books*. That is
why there is no `dintel-light` style book: light *is* the default.

So when a token differs between "light" and "dark" (e.g. the accent), it is not a contradiction —
it is the baseline value vs. the optional dark override.

### Deviations from official DINTEL (repo extensions)

The official DINTEL palette (https://dintel.redsara.es/DINTEL/fundamentos/color.html) publishes
**primary 200–700** and **secondary 500–700** only. This repo adds extra primitive steps that are
**not part of the official palette** and are marked as such in `index.css` and in the Tokens
Showcase fragment (`repo` badge):

| Primitive | Value | Why it exists |
|---|---|---|
| `primary-000` | `#FBFCFE` | near-white surface for `interactive-secondary` (light) |
| `primary-100` | `#EAF0FA` | pale blue for `brand-soft` / item-hover (light) |
| `secondary-000…400` | `#FFD2C2`, `#FFAD8F`, `#FF875C`, `#FF6229`, `#F54100` | lighter orange accent legible on the dark surfaces of the `dintel-dark` style book — official secondary is only the dark burnt-orange `#C33400/#802200/#521600` |

These are deliberate extrapolations to fill gaps the official spec doesn't cover (light surfaces,
dark-mode accent). Everything else matches the official source 1:1. Revisit these if/when DINTEL
publishes equivalent steps.
