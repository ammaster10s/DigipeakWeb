# DIGIPEAK OPS – PHP Edition

Ultra-dark, defense-tech interface for DIGIPEAK, translated to PHP while keeping the same UI/UX.

## What’s Included

- **PHP pages** (root): `index.php`, `prj-gt.php`, `prj-cl.php`, `prj-3ds.php`, `prj-mrt.php`, `privacy.php`, `tos.php`.
- **Shared layout**: [php/partials/head.php](php/partials/head.php), [php/partials/header.php](php/partials/header.php), [php/partials/footer.php](php/partials/footer.php).
- **Assets**: [php/assets/site.css](php/assets/site.css), [php/assets/site.js](php/assets/site.js).
- **Images**: [public](public).

## Requirements

- PHP 8+ (for running the local server).

## Run Locally

From the repo root:

```bash
php -S localhost:8000
```

Open: `http://localhost:8000`

## Notes

- Tailwind is loaded via CDN in [php/partials/head.php](php/partials/head.php).
- The boot loader shows only on the first page visit (session-based).
- Scramble text is enabled where `data-scramble` is present.

## Deploy

Upload these to your PHP host (cPanel or similar):

- Root PHP pages (listed above)
- [php](php) folder
- [public](public) folder

