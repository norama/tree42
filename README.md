# Data Tree Application

## Technology

- React application using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)

- State management: [nanostores](https://github.com/nanostores/nanostores) with [@nanostores/react](https://github.com/nanostores/react) for reactive hook `useStore()`, data tree is console logged upon changes

- UI: [Material UI](https://mui.com/), [Tree View](https://mui.com/material-ui/react-tree-view/)

## Demo

[Demo](https://norama.github.io/tree42/) is deployed using [GitHup Pages](https://create-react-app.dev/docs/deployment#github-pages).

## TODO

- JSON input instead of hard-coded example

- input data sanity check: child items should have same fields, intermediate single node check (should be 'has_nemesis' or 'has_secrete' and child item fields depend on this type node?)

- field order is alphabetical, fix this to correspond to the screenshot

- unit test for testing deletion

- showing some transition upon deletion

- export data with restoring those intermediate single nodes ('has_nemesis' or 'has_secrete', 'records') that are now removed from the tree for simplicity

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
