# Reeinvent Tech Test

Please remember that the application should be production-ready with a user-friendly UX/UI.

The system should have both backend and frontend components with the given limitations:
    1. .NET or Node.js for the backend (let us know if you have other preferences).
    2. ReactJS framework for the frontend (let us know if you have other preferences).

Write the program in a way that you would do if you should build something for a product that should be used in production for a client.
Think of all aspects like user-friendly, testing, readability, maintenance, memory consumption, performance, etc.
Comment essential part of the code so we understand your reasoning.
Upload the source code to a public repository (e.g. GitHub).
Deployed so we can test the solution online.
Problem description
Implement a system that works as a synonyms search tool with the following requirements
The user should be able to add new words with synonyms.
The user should be able to ask for synonyms for a word and lookup should work in both directions. For example, If "wash" is a synonym to "clean", then I should be able to look up both words and get the respective synonyms.
A word may have multiple synonyms and all should be returned at a user request.
Make the solution with simple, but fast, data structures in the backend's memory - no persistence needed.
Implement the solution in the best possible way, as if it were production code.
Transitive rule implementation, i.e. if "B" is a synonym to "A" and "C" a synonym to "B", then "C" should automatically, by transitive rule, also be the synonym for "A".