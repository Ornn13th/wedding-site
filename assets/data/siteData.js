export const siteData = {
  media: {
    useIntroVideo: true,                 // ha nincs videó: false
    introVideoSrc: "./assets/media/intro.mp4",
    introImageFallback: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1600&q=80",
    heroImageSrc: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1600&q=80",
  },

  couple: {
    names: "Lorem & Ipsum",
    chips: ["Lorem City", "Lorem Venue", "Lorem Date"],
  },

  nav: [
    { id: "home", label: "Főoldal" },
    { id: "schedule", label: "Menetrend" },
    { id: "menu", label: "Menü" },
    { id: "gallery", label: "Galéria" },
    { id: "info", label: "Infók" },
  ],

  schedule: [
    { time: "14:30", title: "Lorem ipsum", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { time: "15:00", title: "Lorem ipsum", desc: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { time: "16:30", title: "Lorem ipsum", desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco." },
    { time: "18:00", title: "Lorem ipsum", desc: "Duis aute irure dolor in reprehenderit in voluptate velit." },
    { time: "20:00", title: "Lorem ipsum", desc: "Excepteur sint occaecat cupidatat non proident." },
  ],

  menu: [
    { title: "Előétel", items: ["Lorem ipsum dolor", "Sit amet consectetur", "Adipiscing elit"] },
    { title: "Leves", items: ["Sed do eiusmod", "Tempor incididunt", "Ut labore et dolore"] },
    { title: "Főétel", items: ["Magna aliqua", "Ut enim ad minim", "Veniam quis nostrud"] },
    { title: "Desszert", items: ["Duis aute irure", "Dolor in reprehenderit", "In voluptate velit"] },
  ],

  accordion: [
    { q: "Megközelítés", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nibh. Aenean quam." },
    { q: "Dress code", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ante dapibus diam." },
    { q: "Ajándék", a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis sem at nibh elementum." },
  ],

  gallery: {
    perPage: 8,
    engagement: [
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem 01" },
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem 02" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem 03" },
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem 04" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem 05" },
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem 06" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem 07" },
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem 08" },
    ],
    wedding: [
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem A" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem B" },
      { src: "https://images.unsplash.com/photo-1523438097201-dc7c4f5de044?auto=format&fit=crop&w=1200&q=80", title: "Lorem C" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80", title: "Lorem D" },
    ],
  }
};