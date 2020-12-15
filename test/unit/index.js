const assert = require("assert");
const firebase = require("@firebase/testing");

const MY_PROJECT_ID = "meetup-462d1";
const myId = "user_123";
const theirId = "user_567";
const myAuth = { uid: myId, email: "user1@gmail.com" };

const getFirestore = (auth) => {
  return firebase
    .initializeTestApp({ projectId: MY_PROJECT_ID, auth: auth })
    .firestore();
};

const getAdminFirestore = () => {
  return firebase.initializeAdminApp({ projectId: MY_PROJECT_ID }).firestore();
};

beforeEach(async () => {
  await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
});

describe("My Meetup app", () => {
  it("Can read user document", async () => {
    const admin = getAdminFirestore();
    const setupDoc = admin.collection("users").doc(theirId);
    await setupDoc.set({ handle: "user1" });

    const db = getFirestore(myAuth);
    const testRead = db.collection("users").doc(theirId);
    await firebase.assertSucceeds(testRead.get());
  });

  it("Can't read user document", async () => {
    const admin = getAdminFirestore();
    const setupDoc = admin.collection("users").doc(theirId);
    await setupDoc.set({ handle: "user1" });

    const db = getFirestore(null);
    const testRead = db.collection("users").doc(theirId);
    await firebase.assertFails(testRead.get());
  });

  it("Can write user document", async () => {
    const db = getFirestore(myAuth);
    const testWrite = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testWrite.set({ handle: "user1" }));
  });

  it("Can update user document", async () => {
    const admin = getAdminFirestore();
    const setupDoc = admin.collection("users").doc(myId);
    await setupDoc.set({ handle: "user" });

    const db = getFirestore(myAuth);
    const testWrite = db.collection("users").doc(myId);
    await firebase.assertSucceeds(testWrite.update({ handle: "user1" }));
  });

  it("Can't update user document", async () => {
    const admin = getAdminFirestore();
    const setupDoc = admin.collection("users").doc(theirId);
    await setupDoc.set({ handle: "user" });

    const db = getFirestore(myAuth);
    const testWrite = db.collection("users").doc(theirId);
    await firebase.assertFails(testWrite.update({ handle: "user1" }));
  });

  it("Can read private document", async() => {
      const admin = getAdminFirestore();
      const setupDoc = admin.collection("private").doc(myId);
      await setupDoc.set({ location: "here" });

      const db = getFirestore(myAuth);
      const testRead = db.collection("private").doc(myId);
      await firebase.assertSucceeds(testRead.get());
  })
});

// after(async () => {
//   await firebase.clearFirestoreData({ projectId: MY_PROJECT_ID });
// });
