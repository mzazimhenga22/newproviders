newproviders

A custom set of providers for media streaming applications. This project extends or customizes the default provider system, enabling additional sources for content fetching.

Features

✅ Plug-and-play integration with existing media platforms.

✅ Built using TypeScript for type safety.

✅ Compatible with pnpm, npm, or yarn.

✅ Extendable and easy to configure.

Installation
# Using pnpm
pnpm add newproviders

# Or using npm
npm install newproviders

# Or using yarn
yarn add newproviders

Usage
import { providers } from "newproviders";

async function loadProviders() {
  const list = await providers.getAvailableSources();
  console.log("Available providers:", list);
}

loadProviders();

Development

Clone this repository and install dependencies:

git clone https://github.com/mzazimhenga22/newproviders.git
cd newproviders
pnpm install


Run in watch mode:

pnpm dev

Build
pnpm build

Author

👤 Ali Mzazimhenga
GitHub: @mzazimhenga22

License

MIT © 2025 Ali Mzazimhenga
