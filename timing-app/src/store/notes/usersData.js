const users = [
  {
    userId: "u1",
    userName: "max",
    notes: [
      {
        id: "n1",
        title: "this is a note",
        content: "this is content",
      },
    ],
    timers: [
      {
        id: "t1",
        title: "this is a timer",
        time: {
          hours: "10h",
          minutes: "10",
          seconds: "50",
        },
      },
    ],
  },
  {
    userId: "u2",
    userName: "fred",
    notes: [
      {
        id: "n1",
        title: "this is a note",
        content: "this is content",
      },
    ],
    timers: [
      {
        id: "t1",
        title: "this is a timer",
        time: {
          hours: "10h",
          minutes: "10",
          seconds: "50",
        },
      },
    ],
  },
];
export default users;
