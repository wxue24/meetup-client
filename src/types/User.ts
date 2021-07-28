interface PublicData extends commonData {
  lastName: string;
  interests: Interest[];
}

interface FriendData extends commonData {
  sharedInterests: string[];
}

interface PrivateData {
  email: string;
  phone: string;
  lastUpdated: firebase.firestore.Timestamp;
  location: Location;
  friends: FriendData[];
  friendRequests: FriendData[];
  filterSettings: {
    maxGrade: Grade;
    minGrade: Grade;
    sameSchool: "yes" | "no" | "any";
    radius: 0 | 1 | 2 | 3 | 4; // 1,2,3,4 in miles (0 is any)
    sharedInterest: Interest["code"] | null; //specific interest or any
  };
  notificationPreferences: {
    newFriendRequest: boolean; // off, on
    newRecommendations: boolean; // off, daily
  };
}

interface commonData {
  handle: string;
  firstName: string;
  avatar?: string;
  grade: Grade;
  school: string;
  socialMedia: {
    instagram?: string;
    snapchat?: string;
  };
}

type Grade = 9 | 10 | 11 | 12;
