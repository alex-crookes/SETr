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

The Design System will split the Presentation layer in two - Pages and Components will remain, while Assets, Colors, Typography /etc will be moved, along with _reusable_ components, to a DS folder. The goal is to then split to this to a re-usable project
