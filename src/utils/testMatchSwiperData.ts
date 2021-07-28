const data: PublicData[] = [
  {
    firstName: "Donald",
    lastName: "Trump",
    handle: "trump123",
    avatar: "../../assets/pictures/trump.jpg",
    grade: 11,
    school: "Claremont High",
    interests: [
      { name: "Soccer", type: "team_sports", code: "001" },
      { name: "Basketball", type: "team_sports", code: "002" },
      { name: "Badminton", type: "team_sports", code: "003" },
    ],
    socialMedia: {
      instagram: "realDonaldTrump",
    },
  },
  {
    firstName: "Joe",
    lastName: "Biden",
    handle: "biden123",
    avatar: "../../assets/pictures/biden.jpg",
    grade: 11,
    school: "Pomona High",
    interests: [
      { name: "Guitar", type: "music", code: "101" },
      { name: "Piano", type: "music", code: "102" },
    ],
    socialMedia: {
      instagram: "joebiden4pres",
    },
  },
];

export default data;
