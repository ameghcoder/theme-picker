Here’s a clean **workflow draft in Markdown**, designed for your theme-colors project.
You can paste this directly into your repo as `CONTRIBUTING_WORKFLOW.md` or `FLOW.md`.

---

# **Theme Contribution & Sync Workflow (Draft)**

This document describes the full workflow for contributing new themes and keeping GitHub + Supabase in perfect sync.

---

## **1. Folder Structure**

```
/public/themes/colors/
    ├── ocean-waves.css
    ├── gray-lavish.css
    └── ...more themes

/themes/lib/
    └── themeRegistry.ts
```

---

## **2. Contribution Steps (User → GitHub)**

### **1. User Forks the Repository**

* Click **Fork**
* Clone locally

### **2. User Creates a New Theme File**

Inside:

```
/public/themes/colors/<theme-id>.css
```

Format example:

```css
[data-theme="<theme-id>"][data-mode="light"] {
  --background: #f3f3f3;
  --text: #111;
  ...
}

[data-theme="<theme-id>"][data-mode="dark"] {
  --background: #0d0d0d;
  --text: #fff;
  ...
}
```

### **3. User Adds Their Theme to `themeRegistry.ts`**

```ts
{
  id: "theme-id",
  name: "Theme Name",
  author: "username",
  preview: ["#color1", "#color2", "#color3"]
}
```

### **4. User Submits Pull Request**

PR title example:
**"Add new theme: gray-lavish"**

---

## **3. Automated Validation (GitHub Action)**

When PR opens:

1. **Validate CSS file**

   * checks naming convention
   * checks CSS structure
   * checks for invalid tokens

2. **Validate preview colors** in `themeRegistry.ts`

3. **Build test** (optional)

If validation passes → PR ready for review.

---

## **4. Manual Review (Owner)**

You review:

* theme quality
* color harmony
* naming
* preview palette

Then click **Merge**.

---

## **5. Sync After PR Merge (GitHub → Supabase)**

A GitHub Action runs automatically:

### **Step A — Extract theme data**

* Read theme file
* Read registry entry
* Build JSON object:

```json
{
  "id": "gray-lavish",
  "name": "Gray Lavish",
  "preview": ["#222", "#444", "#666"],
  "css_path": "public/themes/colors/gray-lavish.css",
  "updated_at": "timestamp"
}
```

### **Step B — Push to Supabase**

API call:

* Insert/update row in `themes` table
* Insert/update theme CSS in `themes_css` table
* Cache purge (if any)

### **Step C — Trigger Revalidation (if Next.js)**

For ISR:

```
POST /api/revalidate?path=/themes
```

---

## **6. Live Website Behavior (Supabase + GitHub)**

### **Read data from Supabase**

* theme list
* preview colors
* meta info
* author

### **Fetch CSS from GitHub Raw**

For preview:

```
https://raw.githubusercontent.com/<repo>/main/public/themes/colors/<theme-id>.css
```

Lightweight (1–3kB).

---

## **7. NPM Package Workflow**

When someone runs:

```
npx picker-theme add theme-id
```

Flow:

1. Fetch theme metadata from Supabase
2. Fetch CSS from GitHub
3. Write file to user’s project:

```
/styles/themes/<theme-id>.css
```

4. Auto-update their `theme.config.ts`

---

## **8. When Contributor Edits Their Theme**

They can update by:

* sending a new PR modifying the same file
* Registry and CSS updated → GitHub Action syncs to Supabase automatically

No manual work needed.

---

## **9. Future Phase (Full Design System)**

Support storing:

* fonts
* shadows
* radius
* spacing
* typography scale
* component-level tokens

Same workflow applies — only schema expands.

---

If you want, I can also create:

✓ a **GitHub Action YAML** file
✓ Supabase table schema
✓ theme-registry TypeScript interface
✓ contribution guidelines template (README)

Just tell me!
