///<reference types='vite/client'/>
//👆tells typescript to use Vite's built-in types

//interface is for objects . right?
interface ImportMetaEnv {
  //readonly ensures that CHATBOT_ID cannot be modified.
  readonly CHATBOT_ID: string; //add other environment variables here.
  readonly VITE_CHATBOT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// vite-env.d.ts is a typescript declartion file used in vite projects to define custom TS types,especially for environment variables.
//d.ts is a declaration file(used to define types but doesnt contain actual code)

//Vite uses 'import.meta.env' to access environment variables.
//TypeScript needs type definition for this environment variable
