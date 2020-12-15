let db = {
  users: [
    // Doc id is uid
    {
      handle: "user",
      firstName: "Tim",
      school: "Claremont High",
      grade: 11,
      lastUpdated: "2019-03-15T10:59:52.798Z",
      interests: [
        // Limit 10 if using firebase
        { name: "soccer", type: "sports" },
        { name: "board games", type: "other" },
      ],
      socialMediaHandles: {
        instagram: "user123",
      },
    },
  ],
  notifications: [
    // Doc id is uid
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      createdAt: "2019-03-15T10:59:52.798Z",
    },
  ], 
  private: [
    // Doc id is uid
    {
      email: "new@email.com",
      phone: "+19099659654",
      location: {
        geoHash: "2323fsf43",
        geoPoint: Geopoint(latitude, longitude),
        latitude: 13.342352,
        longitude: 12.33532
      },
      friends: [
        {
          name: "john",
          handle: "john123",
          sharedInterests: ["soccer", "cooking"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "john123",
          },
        }
      ],
      friendRequests: [
        {
          sender: "john",
          sharedInterests: ["soccer", "cooking"],
          grade: 11,
          school: "Claremont High",
          socialMedia: {
            instagram: "john123",
          },
        }
      ],
      filterSettings: {
        maxGrade: 12,
        minGrade: 10,
        sameSchool: "yes | any | no",
        radius: 2, // 1,2,3,4,5 in miles
        sharedInterest: { name: "soccer", type: "sports" } | null, //specific interest or any
      },
    },
  ],
};
