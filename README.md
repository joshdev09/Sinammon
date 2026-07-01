# Sinammon 🍂

**Tools educators should have had all along.**

Sinammon is an open-source platform that centralizes free digital educational tools for Filipino educators — a directory and toolkit, not another app to learn from scratch. It curates the platforms teachers already need, organizes them by what they actually do in the classroom, and pairs each one with plain-language guidance so adopting new technology doesn't mean starting over.

## What is Sinammon?

Filipino educators juggle dozens of scattered tools with little guidance on what's free, what's offline-capable, or what actually fits a Philippine classroom. Sinammon solves this by bringing everything into one organized, easy-to-access place across categories like:

- Classroom & Learning Management
- Content Creation & Interactive Lessons
- Subject-Specific STEM Tools
- Regional & Localized Resources (e.g. DepEd Common OERs)

## Features

- 🧰 **Tools directory** — searchable, filterable grid of free educational tools, each tagged with tech-skill level and offline capability
- 📚 **DepEd Common OERs drill-down** — live-scraped view into DepEd's Open Educational Resources
- 🤖 **AI Tools** — curated AI-powered tools for teaching
- 📝 **Feedback page** — lets educators submit suggestions and requests (via EmailJS)
- 🖥️ **macOS-window-style UI** — a distinctive, approachable interface for browsing tools
- 100% open source and free forever

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool & dev server
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [React Router](https://reactrouter.com/) — routing
- [Lucide React](https://lucide.dev/) — icons
- [EmailJS](https://www.emailjs.com/) — feedback form submissions

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/joshdev09/Sinammon.git
cd Sinammon

# Install dependencies
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your EmailJS credentials (used for the feedback form):

```bash
cp .env.example .env
```

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app locally.

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Page-level and shared components
│   ├── About.tsx
│   ├── AiTools.tsx
│   ├── DepEdOERsPage.tsx
│   ├── Footer.tsx
│   ├── LandingPage.tsx
│   └── NavBar.tsx
├── context/          # React context providers
│   └── ToolsContext.tsx
├── data/             # Static/curated data sources
│   ├── aiTools.data.ts
│   ├── deped.data.ts
│   └── tools.data.ts
├── pages/            # Standalone route pages
│   └── FeedbackPage.tsx
├── types/            # TypeScript type definitions
├── App.tsx           # Routes
└── main.tsx          # App entry point
```

## Routes

| Path          | Page                            |
|---------------|----------------------------------|
| `/`           | Landing page / tools directory   |
| `/about`      | About Sinammon                   |
| `/deped-oers` | DepEd Common OERs drill-down     |
| `/ai-tools`   | AI Tools directory               |
| `/feedback`   | Feedback form                    |

## Contributing

Sinammon is open source and welcomes contributions — whether that's adding new tools to the directory, improving accessibility, or fixing bugs. Feel free to open an issue or submit a pull request.

## License

This project is open source and free to use.
