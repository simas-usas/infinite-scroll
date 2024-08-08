# Infinite Scroll

Application that renders a grid of images with an infinite scroll. Users are given the option to favourite images.

Made using React, TypeScript and Vite.

To launch the project, set up a local .env file with the necessary variables provided in the example. Make sure you have Node.js version 17 or higher installed.  Locally run the following command:

```
npm run dev
```

## Tools
### Vite

Project is built using Vite. Provides the project with a easy to use config and faster build times.

### Pexels API

Images are provided using the free to use Pexels API.

### Intersection Observer API

To implement the infinite scrolling functionality, this project uses Intersection Observer web API. Allows for smoother implementation of detecting what's currently in view without using event listeners.

### IndexedDB

IndexedDB is used to store favourited images. While storing image ids could be done using LocalStorage, IndexedDB was chosen for better performance due to it being asynchronous. Furthermore, due to the scalability capabilities it provides, additional functionality will be easier to implement in the future.

### Vitest + React Testing Library

While Jest is the more established testing framework, it's simply easier to integrate Vitest with Vite. Vitest combined with React Testing Library provides developers with more than enough necessary tools to test the user experience properly.

Test can be run using the following command:

```
npm run test
```

## Further improvements

* Add filters so users are able to see only favourited images.
* Add a search query for custom image queries.