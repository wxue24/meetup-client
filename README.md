# Frontend for Meetup mobile app

## What is Meetup?

Meetup is a mobile app that connects high school students based on similar interests. It was created during 2020 to solve the problem of depression among teenagers who, because of COVID, were not able to have social interactions as they would during a normal school year. By providing a platform where students can connect with each other based on shared interests, we can overcome COVID together. 

## Tech stack

The frontend is built with React Native for cross-platform development, Expo (a framework built on RN) for quicker and easier development, and Firebase for backend connections. 

## Getting started

Since this is a side hobby of mine, I will not be regularly maintaining the app. Because of this, dependencies may not always be up-to-date, and can cause problems when starting the app. If upon running `npm run start` returns an error, try `expo upgrade` and `npm install --legacy-peer-deps`. `expo upgrade` will upgrade to the latest version of expo; however, in the process it will also upgrade certain dependencies. If the app doesn't start after this, try downgrading those dependencies back (especially firebase to 7.9.0 since I have not migrated to v8 yet).

### If everything works the way it should...

You should be able to successfully start the expo server, then open up the app on a simulator or physical device. 

## Additional Info

Feel free to reach out to me if you want to help me develop this app!