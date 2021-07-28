let db = {
  users: [
    // Doc id is uid
    {
      handle: "user1",
      firstName: "Tim",
      avatar: "https://somethign.com",
      school: "Claremont High",
      grade: 11,
      lastUpdated: timeStamp.now(),
      interests: [
        // Limit 10 if using firebase
        { name: "soccer", type: "sports", code: "101" },
        { name: "board games", type: "other", code: "402" },
      ],
      socialMediaHandles: {
        instagram: "tim123",
      },
    },
  ],
  notifications: [
    // Doc id is uid
    {
      type: "friend-req",
      recipient: "user1",
      sender: "user3",
      senderName: "John",
      read: false, //true or false
      createdAt: timeStamp.now(),
    },
  ],
  private: [
    {
      email: "user1@email.com",
      phone: "+12345678900",
      location: {
        geoHash: "2323fsf43",
        latitude: 13.342352,
        longitude: 12.33532,
      },
      friends: [ 
        {
          firstName: "John",
          handle: "user2",
          sharedInterests: ["001", "502"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "john123",
          },
        },
      ],
      friendRequests: [
        {
          firstName: "Will",
          handle: "user3",
          sharedInterests: ["001", "502"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "will123",
          },
        },
      ],
      filterSettings: {
        maxGrade: 12,
        minGrade: 10,
        sameSchool: "yes",
        radius: 2, // 1,2,3,4 in miles (0 is any)
        sharedInterest: { code: "001" } | null, //specific interest or any
      },
      notificationPreferences: {
        newFriendRequest: true, // off, on
        newRecommendations: true, // off, daily
      },
    },
  ],
};
