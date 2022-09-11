# **Information about the project & codebase**

## **Content**

1. [Basic Guidelines](#basic-guidelines)
2. [Code Structure](#code-structure)
3. [Libraries Used](#libraries-used)
4. [Design Decisions](#design-decisions)
5. [Reflection](#reflection)
6. [Other Links](#other-links)

## **Basic Guidelines**

- For every file, there would _usually_ be at most 1 class or 1 functional component. This is so that the tree of components and classes can be accessed more easily.
- For every class, function, interface and enum, `jsdoc` documentation has been provided to provide more information for what something does. Please go ahead and check the documentation if more explanation is needed.
- `.tsx` files are only used when React JSX is required to be used.

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

Some libraries that were installed were not used (because they were planned for features that were not implemented). These include React-Parallax, React-Firebase-Hooks etc.

#### **MUI**

This library offers many different components that have been pre-built and are ready to use. I decided to use this to avoid having to mess around with `CSS` and also not having to focus too much on the UI, but instead focusing on the codebase/engine.

This library also allows me to use different material icons, without having to design my own. It also allows me to manage the theme of the website.

#### **Firebase**

While this library was planned to be used for Authentication and acts as a database, since they were not implemented, i just used Firebase for hosting the website for free.

#### **React (TS)**

A javascript/typescript framework for component based structures. It is personally my favourite and one that is easy to work with, thus my use of it.

#### **React-Router**

The framework that extends react with routing capabilities. Allows me to display different components based on the website path. It allows me to display another component if the path is switched. (What this means is when redirecting to another part of the website, the website does not need to be 'reloaded', but just replaced with the new content)

#### **Typescript**

In my opinion, typescript is javascript but better, as it offers types! This makes it much easier for me to manage types, classes, docstrings etc.

#### **Remotion**

Remotion is an animation library for react. It allows me to replace regular `HTML` components with their version of the components, except that you can animate their components. Allows me to do animations such as the enlarging of the cards when hovering, the spinning pawn.

## **Exception Handling**

While it may not be obvious how "exceptions" are handled in this app, it is actually the majority of the app. This is because a large part of the app is built for checking whether the move played in the chessboard is legal. The code can be viewed in `src/src/engine/board/piece/types`.

In that directory, you would be able to see files named after the pieces on the chessboard. Inside each file, there is a class for that piece, and a large part of the code is dedicated to checking if a move, given a board is legal or not legal.

Therefore, if you go onto the website and try to play an illegal move, you can see the animation where the piece automatically springs back to its original position. That is a sign that the move you just made was illegal. A warning also pops up at the bottom left corner, which lets you know that the move you had just made is illegal. I will go through why the moves were assessed and handled like how they were [Here](#legality-checker)

Apart from this, I have also included some measures that "prevents exceptions". While its not exception handling, it it prevents them in the first place, thus I think it is worth mentioning. These are things such as preventing the user from dragging the piece from the 4 walls of the chessboard.

Because this app is a chess web app, most of the input are button presses and dragging. Thus, there is no need for any other "exception handling" to be implemented.

## **Design Decisions**

In this section, I note down some important design decisions that I made to optimise and perfect the app.

### **Legality Checker**

A large part of the challenge of this app was to build an engine that could identify illegal moves based on the chess rules. While this might seem like not much of a challenge, there is actually many decisions that take place when considering how to implement the engine.

There were a few way that I thought of implementing this checker:

1. Each piece will have their own rule-sets to evaluate if a move is valid. (This is the one I used)

   - The only issue with this is that because each piece (each class) has their own rule-set, the chessboard variable uses up a lot of memory and is very "bulky". This can cause very slow render times on the chessboard. (Most noticeable on phone)
   - However, this allows each piece to have a short rule-set/legal checking algorithm, which optimises the time it takes for the checking to take place

2. All pieces to go through the same rule set, but the rule set to identify the piece type and apply rules accordingly.

   - While this means that each piece stores very little info and the render times are optimised,
   - The checking algorithm becomes a slower as it has to go through rule-sets for basically all of the pieces, even though there is only 1 piece-type.

3. Rule set to be separate from the piece data, and each piece to be matched to corresponding rule set.
   - While this might be the most "optimised" version, (both initial rendering of the pieces and the checking algorithm will be somewhat organised),
   - This does not make logical sense and does not represent the actual OOP structure of a chessboard
   - Furthermore, the lag in the initial render when the pieces are created (for the first stage) is small and does not hinder the user experience much.

Therefore, I went with the first model.

### **Checking if the King is checked**

A large part of the chess is about defending your king, making sure it cannot be "checkmated". A checkmate is when no matter where a king goes, it will still be under attack of one of the opponent's pieces. Of course, first we will need to figure out how to identify whether the king is checked (aka whether it can be attacked by any of the opponent's pieces).

If one plays a move and at the end of that move, the king is still checked, then that move is illegal. While it might sound easy, there are still a few options and decisions that were made to optimise this.

1. Play the move and check if any piece can attack it. There are two ways we can go about doing this:
   - Go through every opponent piece and create a move from where it is at to the target king. Check if the move is legal, and if the move is legal, that means that the king is under check and the move is illegal.
     - The thing about this way of doing it is it is very easy to implement, since you would just recursively call the same function on a move that might attack the king
     - However, it is **recursive**, which means that to check if the move from opponent's piece to target king is legal, you would have to check if _their_ king is checked. This makes it actually harder to implement and probably worse for optimisation.
   - From the king, go to all the squares on the same vertical, horizontal and diagonal row + the offsets at which the knight moves + the offsets at which the pawn moves. This allows us to efficiently check all the squares where the relevant pieces might be.
     - For example, we could start from the king's position and iteratively go up/down. If we encounter a piece and it is a rook or a queen, the king is under check. If not, then that piece would block any rooks/queens behind anyways, so there is no point of continue and we break the for loop.
2. Another option is to implement the concepts of "pins" on the king. A piece is "pinned" to the king when it is in the way of an opponent piece that can attack the king. Thus, a "pinned" piece cannot be moved.
   - However, since this method of checking requires the pinned pieces to be updated every move, it can't be optimised

### **Theme Switching**

As you can tell, whenever a theme is switched in the theme page, the whole page switches theme almost immediately. This is done through MUI (Material UI)'s Theme Manager component, which allows us to pass the current theme to all the children in the tree and change the theme in one shot.

### **Representation of OOP**

As you can tell from the UML Diagram, there are _quite a lot_ of classes in the codebase. The chessboard is represented how it would be in real life: rows of arrays of individual pieces. Each row is represented with a character in real life (a to h), and is also represented as a character in the code (in the coordinates classes). This makes it rather easy for us to visualise how it would be represented in real life, and also allows us to easily convert it to real life stuff.

The other way I could have done representation of the board is a map where there are coordinates as keys and pieces as values. (or vice versa) While this might see more efficient for querying pieces, looping through the map to get a piece with a certain coordinate is `O(logN)`, while accessing it through an array is `O(N)`, thus why I avoided using this.

Here are some of the more specific OOP Design Decision that I made:

#### **Class Designs**

Everything related to a class remains in that class, and unless necessary, will not be put in other files. There was also use of private function, private properties and constructors.

#### **Use of Associations**

As there were multiple engines that ultimately make the chessboard work, all of them play a role in one way or another and are associated ot each other (as seen in the UML Diagram).

#### **Inheritance**

Inheritance was used extensively to create different piece types based on the functionality of the empty piece. It was also used to create class components, by inheriting from the core functionality that was in the template class components.

#### **Polymorphism**

Polymorphism is used in defining the different piece types. For each piece, it overwrites the canBeMovedTo function, and adds its own functions to the class too. Some classes also overwrite the original constructor.

It is also used in all the class component files where the render() function is overwritten with our own code.

## **Code Readability**

To ensure code readability throughout the codebase, I have put in a few measures:

1. Prettier will format the code upon every commit (done using a husky pre-commit hook). I have also set a few configurations for prettier to follow:
   ```
   {
   	"trailingComma": "es5",
   	"tabWidth": 4,
   	"semi": true,
   	"singleQuote": true,
   	"jsxSingleQuote": true
   }
   ```
   This ensures the following:
   - trailing commas are used when applicable
   - tabs are replaced with 4 spaces (so that it isn't displayed with different sizes on different platforms/systems)
   - semicolons are kept at all times
   - single quotes are used for both `tsx` and `ts` files
2. (Most of the time, unless unnecessary) One function/class/type/interface per file. In some cases, it is unnecessary to separate them thus there is more than one per file.
3. Appropriate file extensions are used.
4. Imports are all at the top of the file.
5. `jsdoc` documentation is also added for every method and class.

---

Hopefully that gives you a good idea on how the project's codebase is planned and created, the different design decisions that took place and some libraries that were used.

---

## **Reflection**

## **Other Links**
