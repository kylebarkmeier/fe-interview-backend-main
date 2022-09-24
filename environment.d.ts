declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MAPBOX_API_KEY: string;
    }
  }
}

export {};
