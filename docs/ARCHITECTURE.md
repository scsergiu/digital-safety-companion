# Architecture

This document describes the folder structure and rules for the Digital Safety Companion app.

## Folder Structure

```
digital-safety-companion/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/             # Tab navigator screens
│   ├── _layout.tsx         # Root layout
│   └── ...
├── components/             # Reusable UI components
├── constants/              # Theme, config constants
├── hooks/                  # Shared React hooks
├── assets/                # Static assets (images, etc.)
└── docs/                   # Project documentation
```

## Rules

- **Thin screens**: Screen files (`app/**/*.tsx`) should stay thin. Put business logic and complex UI in components or hooks, not in the screen file.
- **Feature modules**: Group related components and logic by feature when a screen grows (e.g. `components/is-this-safe/` if needed). Do not create random one-off folders.
- **No random libs**: Do not add new libraries without approval. Prefer existing Expo/React Native APIs and the current dependency set.
- **Existing components**: Use `ThemedText`, `ThemedView`, and other existing components where possible for consistency and theme support.

## File Naming

- Components: PascalCase (e.g. `ThemedText.tsx`)
- Screens: kebab-case for route files (e.g. `is-this-safe.tsx`)
- Hooks: camelCase with `use` prefix (e.g. `useColorScheme.ts`)

## Tech Stack

- **Expo** (React Native) with **Expo Router** for navigation
- **TypeScript**
- No backend; app is phone-first and offline-capable for current scope
