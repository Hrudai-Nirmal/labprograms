# Lab Programs Website

## Purpose

This static page provides one clipboard-copy button for each of the nine C lab programs in the parent workspace.

## Key decisions

- The program sources are embedded in `index.html`, so copying works without a server or file-fetch permissions.
- `test/program-mapping.test.js` verifies the embedded mapping is byte-for-byte identical to `../p1.c` through `../p9.c`.

## Gotchas

- Clipboard access requires HTTPS or localhost in most browsers.
- The C source files are the canonical program copies; update the page mapping and its test together if a program changes.
