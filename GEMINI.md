# GEMINI.md

## Project Overview

This is a Next.js project bootstrapped with `create-next-app`. It appears to be a note-taking application called "QuikJot". The application has a dashboard-style interface that allows users to create, view, and organize notes and folders.

The main technologies used are:

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) and custom components.
*   **Linting:** [ESLint](https://eslint.org/)

The project is structured with a main `app` directory containing the pages and components. The layout is defined in `app/layout.tsx`, and the main page is `app/page.tsx`. The home page displays two main sections: "Recent Folders" and "My Notes".

## Building and Running

To get the development server running:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

Other available scripts:

*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the codebase for errors.

## Development Conventions

*   **Component-Based Architecture:** The application is built using React components, which are organized in the `components` and `app/_components` directories.
*   **Styling:** Styling is done using Tailwind CSS. Utility classes are used directly in the JSX.
*   **UI Components:** The project uses a combination of custom UI components and components from the Radix UI library.
*   **State Management:** Component-level state is managed with `React.useState`.
*   **Routing:** The application uses the Next.js App Router.
*   **Fonts:** The application uses the `Geist` font family.
*   **Theming:** The application supports both light and dark themes using `next-themes`.
