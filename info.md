# **Information about the project & codebase**

## **Content**

1. [Basic Guidelines](#basic-guidelines)
2. [Code Structure](#code-structure)
3. [Libraries Used](#libraries-used)

## **Basic Guidelines**

- For every file, there would _usually_ be at most 1 class or 1 functional component. This is so that the tree of components and classes can be accessed more easily.
- For every class, function, interface and enum, `jsdoc` documentation has been provided to provide more information for what something does. Please go ahead and check the documentation if more explanation is needed.

## **Code Structure**

Here is a tree showcasing how the code is structured

```
├── components
│   ├── alert
│   │   ├── alert.tsx
│   │   └── alertdetails.ts
│   ├── card.tsx
│   ├── navbar
│   │   ├── navbar.tsx
│   │   └── navbaritem.tsx
│   └── theme.tsx
├── css
│   ├── actions.css
│   ├── master.css
│   └── position.css
├── engine
│   ├── board
│   │   ├── castle
│   │   │   ├── castling.ts
│   │   │   └── hascastled.ts
│   │   ├── coordinates
│   │   │   ├── coordinates.ts
│   │   │   └── coordtype.ts
│   │   ├── move
│   │   │   ├── move.ts
│   │   │   ├── moveengine.ts
│   │   │   └── movetypes.ts
│   │   ├── piece
│   │   │   ├── colour.ts
│   │   │   ├── piececonversion.ts
│   │   │   ├── piecetype.ts
│   │   │   └── types
│   │   │       ├── bishop.ts
│   │   │       ├── empty.ts
│   │   │       ├── king.ts
│   │   │       ├── knight.ts
│   │   │       ├── pawn.ts
│   │   │       ├── queen.ts
│   │   │       └── rook.ts
│   │   └── square.tsx
│   ├── engine.ts
│   ├── fen
│   │   ├── details.ts
│   │   └── parser.ts
│   └── render
│       ├── board.tsx
│       ├── chessbackground.tsx
│       ├── chesspieces.tsx
│       ├── chesspromotion.tsx
│       ├── extendedboard.tsx
│       └── sidepanel
│           ├── panels
│           │   └── details.tsx
│           ├── sidepanel.tsx
│           └── sidepaneldetails.tsx
├── main.tsx
├── pages
│   ├── 404
│   │   └── 404.tsx
│   ├── app.tsx
│   ├── home
│   │   └── home.tsx
│   ├── info
│   │   └── info.tsx
│   ├── passandplay
│   │   └── passandplay.tsx
│   └── theme
│       └── theme.tsx
├── utils
│   ├── knight.ts
│   └── pair.ts
└── vite-env.d.ts
```

As you can see, there are multiple top-level folders in the structure of the codebase, which i will be explaining below:

### **Components**

The components folder contains different reusable components that have been extracted from other components. They are in the folder because they're have a lot of customised functionality that is usually repeated and used quite a lot throughout the codebase.

Other components in this directory like `theme` and `alert` are just a part of the app that is unable to fit anywhere else in the codebase, and thus are regarded as components that can be used.

## **CSS**

This directory contains a file named `master.css`, which imports all the css from the other files into this css file. This is so that when it is imported into the main app's functional components, all of the files need not be imported one by one.

As you can probably tell by the name, this folder contains generic css that I might use throughout the code. However, you might be wondering why there are not many css files?

- I used a library named `MUI (Material UI)` for React, which is a robust UI library with a lot of pre-packed components that can be used. This is so that I can skip a lot of the UI design parts, and instead focus on the OOP parts of my project. (Also why would I want to build components on my own if that library would just do better).

- React also has inline-styles, and thus most of the styling is done in the `.tsx` files instead of the `.css` files, so that it is naturally easier for me to check the styles of a component.

## **Engine**

Here is where the fun stuff begins. In this directory you will find all of the OOP logic for the chess app. It contains multiple engines and renderers for the UI.

Inside this folder you would find a few other folders, which are briefly covered below:

---

### **Board**

This includes all the basic functionality that the board requires. That means that all of the coordinate, piece, move, castling logic is all included inside the board directory. With this an `engine.ts` alone, a full-fledged chess engine should be available.

### **Fen**

This directory has the logic for parsing and exporting the FEN strings. [Forsyth-Edwards Notation (FEN) strings](https://www.chess.com/terms/fen-chess) are a simple way to represent any position and board in chess, and is _(i think)_ the most commonly used notation to represent a chessboard. The logic in here allows us to parse fen strings into objects that use the chess logic in the code, and vice versa.

### **Render**

As the name says, this directory contains files that allow you to render the chessboard using React. It offers two configurations, one being the extended chessboard, the other one being the base chessboard. Essentially, the extended chessboard (in `extendedboard.tsx`) is just the chessboard (`board.tsx`) but with more UI functionality (such as a sidepanel).

---

There is a lot more to go through on how I approached code in the engine, but that will be for later in this documentation.

## **Pages**

To understand this you would need to understand `React Router`. Essentially, this is another library that I used that would help make it convenient to route components. It does this by allowing you to choose what component to render based on what website path the user is trying to access. This can all be seen in the `App` functional component in `app.tsx`, where I used the `<Route>` components to specify which page is displayed when.

To make it convenient, each folder in the pages directory represents a path in the website. For example, the `home` directory represents what will be displayed in `/home`. The only exception is `404`, which will be displayed whenever a website path was accessed that didn't exist. This makes it very convenient to see what exactly is going wrong at every path in the website.

In this directory, the `app.tsx` file is the "top of the tree of components". It contains many component wrappers with settings that apply to the whole app.

## **Utils**

As the name suggests, this folder simply contains files with utility functions/classes. These are just some helper code to make life easier :D

## `main.tsx`

This file is what will be run when the app is run in development mode. It is essentially the root of the whole project. What it does is it grabs the element with id `root` from the `../index.html` file and replaces its contents with the content of the app.

---

That is all the code structure explained in a fairly detailed way :D.

## **Libraries Used**

Here is a section that outlines the purpose of each library that was used in this project. There are 2 types of libraries, [Development Libraries](#development-libraries) and [Production Libraries](#production-libraries)

### **Development Libraries**

These are the libraries used that don't actually help with the real app, but the codebase. The ones that I used were:

#### **Vite**

As you might know, this is a library that allows me to build the app efficiently and effectively, doing things like tree-shaking and stuff. More importantly, it also allows me to render the app real-time and hot-reload the webpage.

#### **Prettier**

This is a library that allows me to format my code with a certain style. Such a formatter is useful to keep the code structured clean, without having to manually and painstakingly do it on your own.

#### **Husky**

THis is a library that allows me to run the previous library, prettier, for every commit. Therefore, I am able to format my code every commit

### **Production Libraries**

#### **MUI**
