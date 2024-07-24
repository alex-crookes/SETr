# SETr

Simple Expense Tracker (React Native)

The purpose of SETr is to investigate best-practices for building React Native, including

## Managed 12 point config

12 Point config allows for configuration-driven Environment management. This has been implemented with Expo's Config Library in the [Following Commit](https://github.com/alex-crookes/SETr/commit/228844376f6fafb0fb2826338cdc0b600347f7ae)

React Native Config would the alterantive if using ReactNative CLI

## Localization

Localization is managed both by the Expo Localization library, and i18n-JS

This latter [library](https://github.com/fnando/i18n#readme) is what manages the Translation aspects of the code. Inside the Localization folder are files for each language. the `xx.json` file is the "default" language and should be the "developers" language. This makes it clear to the Dev (and testers) when a language is NOT translated.

## Separation of concerns (Clean code)

RN makes it far too easy to build god-controller type classes - You can see this in pretty much every single tutorial ever. I prefer to use separated layers where

- **providers** are the interface layers for data - DB queries, API calls etc are implemented as pure functions (and thus are mockable) in this layer
- **repository** repository layers are for managing where are how the data are stored. An example is that while data may be pulled from the API, it may then be stored in a SQLite table to near-line access. A more specific example for RN is that the API is called and is then stored in a REDUX state
- **domain** - The domain is the pure business logic. As of yet, this project contains none...
- **Presentation** - The UI layer is evolving and today contains the Pages, Components, Assets folders (see DS below)

## Design System

There is now a perfunctory Design System that is based loosely on Material. The core is a React Context provider (`./ds/ThemeProvider.tsx`) which wraps the application. Other pages, components /etc can then access the atoms from the `useTheme()` hook.

The theme permits color management from Material colors as found in `./material-theme.json`; Dark Mode / Light mode is supported.

The Theme can also be initialized with a base Font and base Grid Size. Currently, there is no provision for changing the font

Common, opinionated components can be found in `./ds/components` and demonstrate best practices. Where built, they provide _as little customization as possible_ except modification.

Button components are now added - There are currently three type `<PrimaryButton>`, `<SecondaryButton>` and `<LinkButton>` (correspond to Filled, Outlined and Text in Material). They are created as Components rather than style to provide encapsulation. 

Primary and Secondary are essentally the same and can optionally be presented with an [Ionicon](https://ionic.io/ionicons) icon and in small mode. LinkButtons will ignore the icon

Ideally, there would be some refactoring to create a single button class, but it will get ugly when managing the various permutations.

### Next Steps

There are two main goals moving forward:

- Develop the component library to include ~~buttons and other~~ elements
- ~~extend the styles to be more semantic and complete~~ This is ongoing and will always be required when adding new Components to the DS
- fix a couple of bugs with style switching
- Add a persistence layer to permit storing settings over a reboot.
