# Next.js Home Assignement Project Overview

- **Objective:** Build a secure, blockchain-integrated to-do list web application using Next.js, TypeScript, and web3 technologies.
- **Scope:** Demonstrate expertise in advanced Next.js techniques, focusing on server functions, server-side rendering (SSR), web3-based authentication, session management, and interaction with blockchain smart contracts.

## Provided API Endpoints

Ensure you have Docker installed

From the root of the provided folder, run

```
make up-dev
```

This will start the To Do list API in http://localhost:7979

[Go to ToDo API Documentation](./api/README.md)

This will run a Postgres containerized database in case the candidate want to use it for some reason.

This will run a Redis containerized instance in case the candidate want to use it for some reason.

## Assignment Requirements

The following actions and use cases are expected to be implemented and will be evaluated:

```
Expected Use Cases

├── User Authentication via Web3
│   ├── User logs in via connecting their MetaMask wallet
│   └── User is required to sign a message with their wallet to properly sign in
│
├── To-Do List Functionality
│   └── Authenticated user can:
│       ├── Create to-do items via the provided API
│       ├── Read to-do items   via the provided API
│       ├── Update to-do items via the provided API
│       └── Delete to-do items via the provided API
│
├── Web3 Functionalities
│   └── Authenticated user must:
│       ├── View current ERC20 token balance                             (ERC20 Address below)
│       ├── Mint an NFT after 2 to do list items are marked completed    (ERC721 Address below)
│       │   └── The mint button must be initially disabled until completed the tasks.
│       │   └── The mint transaction must await a specified number of blocks,
│       │       chosen and justified by the candidate
│       └── Burn the NFT
│           └── The burn of the NFT will send an amount of an ERC20 token.
│               After successfull burn, the ERC20 balance must be updated in the UI.
│
└── User Logout
    ├── User logs out
    ├── All the above data and UI elements disappear
    └── Only the option to log in with the wallet remains
```

- **Blockchain and Network Choice:**

  - The candidate will have to use the Polygon Amoy testnet, utilizing any public RPCs available.
  - ERC20 Token Address in the Polygon Amoy Chain `0xf02f35bF1C8D2c3a1e7255FD9AddC8F2182e0627`
  - ERC721 NFT Address in the Polygon Amoy Chain `0x8E1096fd5C8Ca1EFdC1BC2F64Ae439E0888b1A46`

- **Web3 Configuration:**

  - Proper Web3 configuration and setup will be highly evaluated. Candidates are encouraged to demonstrate good practices using tools like the WalletConnect SDK and Wagmi.

- **Unit Tests:**

  - Implement unit tests for key components to demonstrate a solid understanding of testing in Next.js. Focus on correctness and coverage of essential functionality.

## Bonus Points

This section contains ways to enhance your project outside of the required scope. Consider these, or others that you come up with, to demonstrate your advanced skills!
Any extra functionalities added to demonstrate a good understanding of Next.js advanced features and functionalities will be highly considered and positively evaluated.

- **UI and Design Flexibility:**

  - There are no strict design requirements or component restrictions. The candidate can choose to use libraries like Material UI or similar. However, good UI decisions will be positively evaluated.

- **Rate Limiter Implementation:**

  - Make use of a rate limiter according to candidate's need's. It is not strictly requested to make usage of Redis or any other database, but it will be positively evaluated if so.
    For the sake of evaluation, the candidate can use the following as inspiration and example:

    ```typescript
    const rateLimitMap = a Map();

    export default function rateLimitMiddleware(handler) {
      // TO DO: Build some rate limiting logic;
    }
    ```

- **Hooks Usage:**
  - Good usage of React hooks is highly recommended and will be positively evaluated. Candidates should demonstrate effective and efficient state management and lifecycle handling using hooks.

## Implementation Guidelines

1. **Server Functions and SSR:**

   - Implement the core API logic using Next.js API routes, ensuring that all user interactions with the blockchain are handled securely and efficiently.
   - Server-side rendering should be utilized for the main pages of the application. Demonstrate an understanding of when to use SSR versus static site generation (SSG).

2. **Security Considerations:**

   - Secure all API endpoints to ensure data integrity. Use server-side components to validate and protect the integrity of data passed through URLs.
   - Implement rate limiting on sensitive API routes using the provided code structure, without relying on external databases.

3. **State Management:**

   - Demonstrate effective state management throughout the app, ensuring consistency, especially when dealing with blockchain state and user sessions.

4. **Performance Optimization:**

   - Optimize the application for performance, focusing on load times and minimizing unnecessary server calls.
   - Implement lazy loading for non-critical components and code splitting where appropriate.

5. **Documentation:**

   - Provide clear documentation on how to set up and run the project.
   - Include comments within the code explaining key decisions, particularly around web3 integration, security, SSR, and blockchain interactions.
   - Add a README that explains the architectural choices, particularly around session management, server-side rendering, and blockchain interactions.

6. **Testing:**
   - Write unit and integration tests for the key components, API routes, and blockchain interactions.
   - Demonstrate an understanding of testing in a Next.js and blockchain-integrated environment.

## Submission

- Provide a GitHub repository with a clear commit history that reflects the development process.
- Include any necessary environment setup instructions, such as environment variables and external services used.

## Evaluation Criteria

- **Fulfillment of Assignment Requirements:** The extent to which the candidate meets the outlined requirements, including user authentication, to-do list functionality, and web3 interactions.
- **Code Quality:** Evaluation of code structure, readability, and adherence to best practices in TypeScript, Next.js, and web3. Thoughtful use of comments to explain key technical decisions and overall project structure will be highly regarded.
- **Bonus Implementations:** Consideration of additional features or advanced techniques that demonstrate a deep understanding of Next.js and web3, showcasing the candidate's seniority.
- **Documentation:** The clarity, detail, and completeness of the project documentation, including setup instructions, explanations of architectural choices, and reasoning behind technical decisions.
- **Testing:** The breadth and effectiveness of unit and integration tests, particularly for critical components, API routes, and blockchain interactions. A strong understanding of testing methodologies within a Next.js and web3 environment will be assessed.
