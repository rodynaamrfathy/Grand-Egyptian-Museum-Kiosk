# Grand Egyptian Museum Kiosk Software

### Overview

The GEM Kiosk Software is an AI-powered interactive guide designed for The Grand Egyptian Museum, providing visitors with an engaging and informative experience. This project was initially developed during the GEM Hackathon 2024, where our team secured first place. Following our success, we joined the GEM Incubation Program (January–April 2025) to further refine and implement our solution.

### The Hackathon & Incubation Program

The GEM Hackathon was an intensive *36-hour competition* where teams developed innovative solutions for museum engagement. Our team, despite having no prior collaboration, built a fully functional prototype that impressed the judges. Winning first place granted us the opportunity to participate in the GEM Incubation Program, where we are now working to develop our project into a production-ready solution.

# APIs Used
## Create Simli App (OpenAI)
This starter is an example of how to create a composable Simli interaction that runs in a Next.js app.

 ## Usage
 1. Rename .env_sample to .env and paste your API keys: [SIMLI-API-KEY](https://www.simli.com/profile) and [OPENAI-API-KEY](https://platform.openai.com/settings/profile?tab=api-keys) <br/> If you want to try Simli but don't have API access to these third parties, ask in Discord and we can help you out with that ([Discord Link](https://discord.gg/yQx49zNF4d)). 
```js
NEXT_PUBLIC_SIMLI_API_KEY="SIMLI-API-KEY"
NEXT_PUBLIC_OPENAI_API_KEY="OPENAI-API-KEY"
``` 

2. Insall packages
```bash
npm install
```

3. Run
```bash
npm run dev
```

4. Customize your avatar's face and prompt by editing app/page.tsx.
```js
const avatar = {
  name: "Frank",
  simli_faceid: "5514e24d-6086-46a3-ace4-6a7264e5cb7c",
  initialPrompt: "You are a helpful AI assistant named Frank. You are friendly and concise in your responses. Your task is to help users with any questions they might have.",
};
```

## Characters
You can swap out the character by finding one that you like in the [docs](https://docs.simli.com/introduction), or [create your own](https://app.simli.com/) 

![alt text](KioskUI/media/image.png) ![alt text](KioskUI/media/image-4.png) ![alt text](KioskUI/media/image-2.png) ![alt text](KioskUI/media/image-3.png) ![alt text](KioskUI/media/image-5.png) ![alt text](KioskUI/media/image-6.png)

## Deploy on Vercel
An easy way to deploy your avatar interaction to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme). 
