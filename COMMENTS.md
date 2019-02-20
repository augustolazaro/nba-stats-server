# Comments and Project Decisions

### The project
The project is a basic server for NBA stats, including team and players data. 

### Technologies in use
- Node: it's the technology I'm more confident about. Node is basically JS, so I could use the same syntax for both backend and frontend.

- Express: it has a very simple setup. It also has some plugins to enable cors and allow your cliente to access the server from browser.

- GraphQL: it represents one of the biggest changes of mindset in software development. I combined GraphQL and API to calls to serve the client, so the usage gets easier. 

- Jest: jest is really simple to use and has a lot of helpers to make assumptions about your code. It also has a good doc and a big community.

- TypeScript: it forces you to write concise code and avoid typos/bugs. I could also learn more about TypeScript.

- Jest: very simple to use and make assumptions about your code. 

### Comments
Basically each type has two files: one for types itself and one for data loaders. It lets you to reuse code for fetching data. For example, we have two places where a list of players is needed: PlayerType and TeamType, so both can be served by a loader located in a separated file.
TypeScript was really helpful to type the API responses. It works well as a documentation of the API, since there is no oficial docs.
When testing, I had to mock some data, like teams and players, so my tests don't depend on external factors. 
This server is running on a private host so I can use some endpoints of the API. 

