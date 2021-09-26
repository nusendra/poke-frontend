# poke-frontend

## Development Steps

- git clone https://github.com/nusendra/poke-frontend
- `yarn install` or `npm run install`
- copy `.env.example` to `.env` then fill it with your google service account.
- For API_URL you need to use this https://github.com/nusendra/poke-backend to serve the data. Or you can go here https://aqueous-peak-19363.herokuapp.com/
- `yarn generate` to generate to static files and `yarn start` to start app in production mode.

## Notes

- This project is using Nuxt framework, Vuetify and Firebase to handle the authentication
- Well deployed in netlify. Here's the link https://circular-pokemon.netlify.app/
- once you push to master, netlify will triggered to automatically build the app and deploy it
