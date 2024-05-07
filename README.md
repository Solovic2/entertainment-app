
# Entertainment App

> Entertainment App is aa app for displaying movies, tv series and trending series that you can search on it, watch its trailer and bookmark it.


## 🚀 Live Demo

The live demo [link](https://66390a5d773430098507e689--entertainmentfeapp.netlify.app/) deployed on Netlify.


## 🛠 Built With

### Tech Stack

- React.
- Vite.
- TypeScript.
- Redux Toolkit.
- React Router.
- Tailwind.
- Linters.


### Key Features
- Initialize the app using `vite` with `TypeScript` and `Tailwind`.
- Manage state using `Redux Toolkit`.
- Use `React Router` as the main router.
- Add `Home page`, `Movies page` , `TV page` and `Bookmark page` with responsive design.
- Add animation for `Home page` trending section.
- Add `Details Page` for specific movie or tv and displaing trailer.
- Save bookmarks in `localStorage`.
- Login and Add Authentication using `TMDB API` with managing its state using `Redux Toolkit`.
- Add `pagination`to Movie and TV pages.
- Add `search functionality` on pages with `pagination`.
- Add `lazy loading` to images to increase UX and performance.
- Testing using `unit`, `integration` test and `end-to-end test` using cypress for components.
- Finalize all design issues.
- Deploy on `netlify`.

## 💻 Getting Started

### Prerequisites

- Install [node.js](https://nodejs.org/en/).
  
### Setup

- Create account on [TMDB API](https://developer.themoviedb.org/docs/getting-started) and get your username and password.
- Get [Access Token Auth](https://developer.themoviedb.org/reference/intro/authentication).
- Get [Account Id](https://developer.themoviedb.org/reference/account-details).
- Clone the project using git-bash or Githup Desktop.
- Open the project folder with VSCode or any Editor.
- Open the terminal and navigate to the project folder.
- Create .env file and add your credintial from `TMDB API` in this file
 ```
  VITE_USERNAME="example-username"
  VITE_PASSWORD="example-password"
  VITE_ACCESS_TOKEN="example-token"
  VITE_ACCOUNT_ID="example-id"

  ```
  
### Usage

- Run this command `npm install` to install dependencies.
- Run this command `npm run dev` to start the dev server.


## Authors

👤 **Islam Mohammed**

- GitHub: [@Solvic2](https://github.com/Solvic2)
- LinkedIn: [@Islam-Mohamed](https://www.linkedin.com/in/islam-ahmadien-9690a9223/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the issues page.

## ⭐️ Show your support

Give a ⭐️ if you like this project!

## 📝 License

This project is [MIT](./MIT.md) licensed.
