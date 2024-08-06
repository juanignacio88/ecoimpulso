import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ecoImpulso',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },  
  plugins: {
    CapacitorSQLite: {
      androidDatabaseLocation: 'default',
    },
  },
};

export default config;
