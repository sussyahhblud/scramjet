# Scramjet Web Proxy - Replit Setup

## Overview

This is Scramjet, an experimental web proxy designed to bypass web browser restrictions and support a wide range of websites. The project has been configured to run in the Replit environment.

**Version:** 2.0.0-alpha  
**Original Repository:** https://github.com/MercuryWorkshop/scramjet

## Project Structure

- **`src/`** - TypeScript source code for the proxy client and worker
- **`static/`** - Static HTML, CSS, and JavaScript files for the web interface
- **`rewriter/`** - Rust-based JavaScript/HTML rewriter (WASM components)
- **`dist/`** - Compiled output from the build process
- **`server.js`** - Node.js development server using Fastify

## Development Setup

### Key Configuration Changes for Replit

1. **Port Configuration**: Server runs on port 5000 (required for Replit)
   - Modified in `server.js`: Default port changed from 1337 to 5000
   
2. **WASM Rewriter**: A placeholder WASM module is used for development
   - Full WASM build requires Rust nightly toolchain with specific dependencies
   - Located at `rewriter/wasm/out/wasm.js`
   - For production deployment with full WASM support, consider using pre-built releases

### Running the Project

The development server is automatically started via the configured workflow:
```bash
pnpm dev
```

The server will:
- Listen on port 5000 (0.0.0.0)
- Watch for file changes and rebuild automatically
- Serve the proxy interface at the root URL

### Building the Project

To build the production bundles:
```bash
pnpm build
```

This compiles the TypeScript source with Rspack and creates optimized bundles in `dist/`.

## Features

- **Web Proxy**: Intercepts and rewrites web requests to bypass restrictions
- **Service Worker Based**: Uses browser service workers for request interception
- **Bare Server**: Includes a Bare server for proxying HTTP(S) requests
- **Wisp Protocol**: WebSocket-based proxy protocol support
- **Transport Layers**: Multiple transport options (Bare MUX, Epoxy, LibCURL)

## Supported Sites

Scramjet supports many popular websites including:
- Google
- YouTube
- Twitter/X
- Instagram
- Discord
- Reddit
- Spotify
- GeForce NOW

## Architecture

### Frontend
- **Framework**: Dreamland.js (lightweight reactive framework)
- **Build Tool**: Rspack (fast bundler)
- **Languages**: TypeScript, HTML, CSS

### Backend
- **Server**: Fastify (Node.js web framework)
- **Bare Server**: @nebula-services/bare-server-node
- **WebSocket**: Wisp.js for real-time communication

### Rewriter
- **Language**: Rust (compiled to WebAssembly)
- **Parser**: Oxc (JavaScript/TypeScript parser)
- **Purpose**: Rewrites JavaScript, HTML, and CSS to work through the proxy

## Deployment

The project is configured for Replit deployment with:
- **Type**: Autoscale (serverless)
- **Build Command**: `pnpm build`
- **Run Command**: `node server.js`

## ⚠️ IMPORTANT LIMITATION

**This Replit setup uses a non-functional WASM placeholder.** The proxy UI will load but **cannot actually proxy websites** because the JavaScript/HTML rewriter is disabled.

### Why?

The full Scramjet proxy requires:
1. Rust nightly compiler
2. wasm32-unknown-unknown target
3. wasm-bindgen (v0.2.100)
4. wasm-opt from Binaryen
5. wasm-snip (custom fork)
6. Complex build process with -Z flags

Setting up this complete toolchain in Replit is complex and time-consuming.

### Getting Full Functionality

To run a fully functional Scramjet proxy in Replit:

**Option 1: Use Scramjet-App (Recommended)**
- Use the simpler [Scramjet-App](https://github.com/MercuryWorkshop/scramjet-app) repository
- It's designed for easy deployment and includes pre-built WASM

**Option 2: Build WASM Locally**
1. Clone this repository on a local machine with Rust toolchain
2. Follow the build instructions in the main README
3. Copy the built `dist/scramjet.wasm.wasm` and `rewriter/wasm/out/wasm.js` files
4. Upload them to this Replit project

**Option 3: Download from NPM Package**
```bash
# Download the npm package (version 1.0.2 has pre-built WASM)
npm pack @mercuryworkshop/scramjet@1.0.2
tar -xzf mercuryworkshop-scramjet-1.0.2.tgz
cp package/dist/scramjet.wasm.wasm dist/
# You'll also need the wasm.js glue file from a full build
```

### Current Status

- ✅ Server runs on port 5000
- ✅ UI loads correctly
- ✅ Dependencies installed
- ✅ Static file serving works
- ❌ **Proxy functionality disabled** (no working WASM rewriter)
- ❌ Cannot rewrite JavaScript/HTML
- ❌ Cannot load proxied websites

## Resources

- [Official Documentation](https://docs.titaniumnetwork.org/proxies/scramjet)
- [Scramjet Typedocs](https://scramjet.mercurywork.shop/typedoc)
- [Scramjet-App](https://github.com/MercuryWorkshop/scramjet-app) - Simpler deployment option
- [GitHub Repository](https://github.com/MercuryWorkshop/scramjet)

## Recent Changes

- **2025-10-28**: Initial Replit setup
  - Configured server to use port 5000
  - Installed pnpm dependencies
  - Created placeholder WASM module for development
  - Set up development workflow
  - Configured deployment settings

## User Preferences

_To be updated as preferences are discovered_
