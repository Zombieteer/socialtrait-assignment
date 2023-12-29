# SocialTrait - HackerNews (Doc)

## Setup Instruction
1. Clone the Repo.
2. Using Node 20, npm i both the `frontend` and `hn-backend` folder, to install all the dependencies.
3. Run both the Ends
   1. Run `npm run dev` in `frontend` to start the Next Server
   2. Run `npm run start:dev` in `hn-backend` to start the Nest Server
4. To setup database
   1. cd into `hn-backend` and run `sh scripts/init.sh` to create user and database
   2. run `sh scripts/refresh.sh` to create empty tables.

## Project Structure

### NextJS
1. `src/` folder is the root, which includes `app/` containing `pages`
2. `src/api` has a custom `createAxios` and all a api to fetch data.
3. Original `verdana` fonts has been used from `HackerNews`.
4. `layout.tsx` have the metadata for the home page as well.
5. `Sass` with `css modules` has been used for styling, all available in `src/styles`
6. Design is mobile responsive as well

### NestJS
1. As of now all the config and constant data is present in `src/config`.
2. NestJs has 2 modules
   1. `ScriptsModule` that runs a job daily @ 10AM which scraps the data from `HackerRank` and push it to the database
   2. `PostModule` is a service that have the `entity`, `dto`, `controller` and `service` all related to posts.
3. A custom REST service is kept in `src/utils/RestServiceUtils.ts` to call any 3rd party APIs


### Comments
1. I could have included `bot` and `ip switcher` in Scrapping job, but that was not required as, we will not be scrapping data very frequently, it will be once in a day, hence next level of security is not needed as of now.
2. On the Frontend side, due to time constraint, the folder structure and code quality might a bit down.