# Vite + React TS Starter Template

This project contains a starter template to scaffold the bare necessities for a React TS project, built with Vite.

## Usage

You can clone and copy the contents of the repo, or you can use `degit` to it for you:

```sh
npx degit russellduttonentelect/vite-reactts-template my-app
```

Replace `my-app` with the name of your project/app name.

Then to run:

```sh
cd my-app
npm install
npm run dev
```

## Built With

- Vite
- React
- Typescript
- ESLint
- Prettier
- Vitest
- React Testing Library
- React Hook Form
- React Router
- React-Query (with Axios)
- Docker

This project intentionally leaves out any sort of styling packages and state management libraries, as that tends to be project-dependant.

## Usage

### Environment Configuration

This project uses a combination of build-time defaults and environment variables set at runtime. The variables set at runtime are defined in the `public/__ENV.js` file. The variables are defined on a customer `env` property on the window object.

To add a runtime variable:
1. Add a property to the object in the `__ENV.js` file.
2. Add a type property to the `src/types/Env.type.ts` file.
3. Optionally add a step to the `src/lib/validate-env/validate-env.ts` file to use a default value set in `App.tsx`

Now you can read your variable from the Env Context:

```javascript
const { yourProperty } = useEnvContext();
```

### Adding Pages

The application's routing definition can be found in `src/routes/AppRoutes.tsx`. The recommended convention is that your routes be defined in a hierarchy that represents your sitemap, but you can do this however you like.

The component that best fits a given URL will be rendered in the `<Outlet />` component found in the `src/components/AppLayout.tsx` file.

New page components can be added in the `src/pages` folder, and it is up to you how you would like to organise this.

## License

MIT
