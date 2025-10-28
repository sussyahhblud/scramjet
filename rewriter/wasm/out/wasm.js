// Placeholder WASM module for Replit environment
export function initSync() {
  console.warn("WASM rewriter not available - using fallback");
}

export class Rewriter {
  constructor(config) {
    this.config = config;
  }
}
