# React + Vite

## Octofit environment

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the
Codespaces name used by the API tier:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then requests `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`.
When it is unset, requests safely fall back to the relative `/api/[component]/`
path for local proxy deployments.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
