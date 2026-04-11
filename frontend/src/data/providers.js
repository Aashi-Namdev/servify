const providers = [
  //  Home Cleaning
  {
    id: "p1",
    providerName: "CleanPro Services",
    serviceId: "home-cleaning",
    rating: 4.8,
    location: "Delhi",
    price: 499,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },
  {
    id: "p2",
    providerName: "Sparkle Cleaners",
    serviceId: "home-cleaning",
    rating: 4.6,
    location: "Lucknow",
    price: 599,
    status: "approved",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac",
  },

  //  Deep Cleaning
  {
    id: "p3",
    providerName: "DeepShine Experts",
    serviceId: "deep-cleaning",
    rating: 4.7,
    location: "Mumbai",
    price: 999,
    status: "approved",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },


  //  Plumbing
  {
    id: "p4",
    providerName: "Plumbing Masters",
    serviceId: "plumbing",
    rating: 4.7,
    location: "Bangalore",
    price: 399,
    status: "approved",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  },
  {
    id: "p5",
    providerName: "PipeFix Solutions",
    serviceId: "plumbing",
    rating: 4.5,
    location: "Pune",
    price: 349,
    status: "approved",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
  },

  //  Electrician
  {
    id: "p6",
    providerName: "PowerFix Electricians",
    serviceId: "electrician",
    rating: 4.7,
    location: "Delhi",
    price: 299,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581091870627-3d4c9e92b4c4",
  },
    {
    id: "p7",
    providerName: "BrightSpark Electricians",
    serviceId: "electrician",
    rating: 4.6,
    location: "Mumbai",
    price: 349,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581091870627-3d4c9e92b4c4",
  },

  //  AC Repair
  {
    id: "p8",
    providerName: "CoolAir Experts",
    serviceId: "ac-repair",
    rating: 4.8,
    location: "Mumbai",
    price: 699,
    status: "approved",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
  },

  //  AC Installation
  {
    id: "p9",
    providerName: "AirInstall Pros",
    serviceId: "ac-installation",
    rating: 4.6,
    location: "Hyderabad",
    price: 999,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581579185169-3c3c3c3c3c3c",
  },
    {
    id: "p10",
    providerName: "CoolAir Experts",
    serviceId: "ac-installation",
    rating: 4.8,
    location: "Mumbai",
    price: 999,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581579185169-3c3c3c3c3c3c",
  },

  //  Washing Machine Repair
  {
    id: "p11",
    providerName: "WashFix Experts",
    serviceId: "washing-machine-repair",
    rating: 4.5,
    location: "Delhi",
    price: 499,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
  },

  //  Refrigerator Repair
  {
    id: "p12",
    providerName: "FridgeCare Services",
    serviceId: "refrigerator-repair",
    rating: 4.6,
    location: "Lucknow",
    price: 549,
    status: "approved",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
  },

  //  TV Repair
  {
    id: "p13",
    providerName: "TVFix Solutions",
    serviceId: "tv-repair",
    rating: 4.4,
    location: "Pune",
    price: 399,
    status: "approved",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
  },

  //  Carpentry
  {
    id: "p14",
    providerName: "WoodFix Experts",
    serviceId: "carpentry",
    rating: 4.7,
    location: "Hyderabad",
    price: 599,
    status: "approved",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
  },

  //  Painting
  {
    id: "p15",
    providerName: "ColorCraft Painters",
    serviceId: "painting",
    rating: 4.6,
    location: "Bangalore",
    price: 1500,
    status: "approved",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  },

  // Pest Control
  {
    id: "p16",
    providerName: "PestAway Services",
    serviceId: "pest-control",
    rating: 4.6,
    location: "Delhi",
    price: 799,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581574209302-9d3f7f7f7f7f",
  },

  //  TV Installation
  {
    id: "p17",
    providerName: "TV Mount Experts",
    serviceId: "tv-installation",
    rating: 4.5,
    location: "Mumbai",
    price: 699,
    status: "approved",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
  },

  // Geyser Installation
  {
    id: "p18",
    providerName: "GeyserFix Pros",
    serviceId: "geyser-installation",
    rating: 4.6,
    location: "Lucknow",
    price: 799,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581093588401-22f08d8f9b7b",
  },

  //  RO Installation
  {
    id: "p19",
    providerName: "PureWater Experts",
    serviceId: "water-purifier-installation",
    rating: 4.7,
    location: "Delhi",
    price: 899,
    status: "approved",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca",
  },

  //  Cooking
  {
    id: "p20",
    providerName: "HomeChef Services",
    serviceId: "cooking",
    rating: 4.8,
    location: "Mumbai",
    price: 1200,
    status: "approved",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
  },

  //  Maid Service
  {
    id: "p21",
    providerName: "DailyHelp Services",
    serviceId: "maid-service",
    rating: 4.5,
    location: "Delhi",
    price: 800,
    status: "approved",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac",
  },

  //  Babysitting
  {
    id: "p22",
    providerName: "CareNest Babysitters",
    serviceId: "babysitting",
    rating: 4.7,
    location: "Pune",
    price: 1000,
    status: "approved",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
  },

  //  Elder Care
  {
    id: "p23",
    providerName: "SeniorCare Services",
    serviceId: "elder-care",
    rating: 4.8,
    location: "Lucknow",
    price: 1500,
    status: "approved",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },
  {
    id: "p24",
    providerName: "ElderCare Services",
    serviceId: "elder-care",
    rating: 4.8,
    location: "Delhi",
    price: 1500,
    status: "approved",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
  },

  // CCTV Installation
    {
    id: "p25",
    providerName: "SecureHome Experts",
    serviceId: "cctv-installation",
    rating: 4.6,
    location: "Delhi",
    price: 2000,
    status: "approved",
    image: "https://images.unsplash.com/photo-1581091012184-5c9f3fdf1a76",
  },

  //  WiFi Setup
  {
    id: "p26",
    providerName: "NetSetup Services",
    serviceId: "wifi-setup",
    rating: 4.5,
    location: "Bangalore",
    price: 499,
    status: "approved",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
  },
  {
    id: "p27",
    providerName: "WiFi Wizards",
    serviceId: "wifi-setup",
    rating: 4.7,
    location: "Hyderabad",
    price: 599,
    status: "approved",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
  }
];