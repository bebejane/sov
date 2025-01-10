export type Menu = { name: string; options: any }[];

const menu: Menu = [
  {
    name: "index",
    options: {
      title: "Samtal om Våld",
      drawerItemStyle: { display: "none" },
    },
  },
  {
    name: "valued-direction/index",
    options: {
      title: "Värderad riktning med mål",
    },
  },
  {
    name: "take-care-of-myself/index",
    options: {
      title: "Ta hand om mig",
    },
  },
  {
    name: "home-assignment/index",
    options: {
      title: "Hemmauppgift",
    },
  },
  {
    name: "assess-violence/index",
    options: {
      title: "Skatta våld",
    },
  },
  {
    name: "sork/index",
    options: {
      title: "Sork",
    },
  },
  {
    name: "emotional-diary/index",
    options: {
      title: "Enkel känslodagbok",
    },
  },
  {
    name: "sound-exercises/index",
    options: {
      title: "Ljudövningar",
    },
  },
  {
    name: "maintenance-plan/index",
    options: {
      title: "Vidmakthållandeplan",
    },
  },
  {
    name: "stop-and-think-steps/index",
    options: {
      title: "Stop & Tänk stegen",
    },
  },
].map((screen) => ({
  ...screen,

  options: {
    ...screen.options,
    drawerLabel: screen.options.title,
  },
})) as { name: string; options: any }[];

const groups = [
  {
    id: "my-change",
    title: "Min förändring",
    items: menu.slice(1, 5),
    open: true,
  },
  {
    id: "diary",
    title: "Dagbok mellan samtal",
    items: menu.slice(5, 7),
    open: true,
  },
  {
    id: "other",
    title: "Övrigt",
    items: menu.slice(7),
    open: false,
  },
];


export { menu, groups };