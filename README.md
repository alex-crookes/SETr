# SETr

Simple Expense Tracker (React Native)

The purpose of SETr is to investigate best-practices for building React Native, including

## Separation of concerns (Clean code)

RN makes it far too easy to build god-controller type classes - You can see this in pretty much every single tutorial ever. I prefer to use separated layers where

- **providers** are the interface layers for data - DB queries, API calls etc are implemented as pure functions (and thus are mockable) in this layer
- **repository** repository layers are for managing where are how the data are stored. An example is that while data may be pulled from the API, it may then be stored in a SQLite table to near-line access. A more specific example for RN is that the API is called and is then stored in a REDUX state
- **domain** - The domain is the pure business logic. As of yet, this project contains none...
- **Presentation** - The UI layer is evolving and today contains the Pages, Components, Assets folders (see DS below)

## Design System

The Design System will split the Presentation layer in two - Pages and Components will remain, while Assets, Colors, Typography /etc will be moved, along with _reusable_ components, to a DS folder. The goal is to then split to this to a re-usable project
