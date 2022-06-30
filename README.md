# 🧮 JUMP Math

This repository is a digital math assessment tool made to be used by the [JUMP Math](https://jumpmath.org/) team, an award-winning charitable organization dedicated to helping students globally develop an understanding and appreciation of math. As of 2021, the JUMP Math program reached 250,000 students worldwide.

Made with React, GraphQL & Node.js.

## Getting Started 🎬
1. Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)). Ensure that it is running.
2. Pull secrets from Vault: `vault kv get -format=json kv/jump-math | python update_secret_files.py`
3. Run the application: `docker-compose up --build`

The backend runs at http://localhost:5000 and the frontend runs at http://localhost:3000.

## References 📚
- [Engineering Documentation](https://www.notion.so/uwblueprintexecs/Engineering-637f85d8ff4b4e87a507171927beb38d)
- [Starter Code Repository](https://github.com/uwblueprint/starter-code-v2)
- [Starter Code Documentation](https://uwblueprint.github.io/starter-code-v2/docs/getting-started)
- [Vault Documentation](https://www.notion.so/uwblueprintexecs/Secret-Management-2d5b59ef0987415e93ec951ce05bf03e#d6b60b9cd5694ffbb2dbb265d03048ce)

## Workflow Management 🛠
- **Branching**: To begin any feature work or bug fixes, branch off of `staging`. Prefix your branch name with the contributor name and name your branch in a way that is relevant and meaningful. For example, `joyce/readme-update`. 
- **Commits**: When working on your branch, commit early and often. Make your commit messages descriptive and meaningful. 
- **Pull Requests**: Upon completing and testing your changes locally, open a PR. At least one reviewer must approve your PR for you to merge your branch into `staging`. 
- **Main**: After your PR has been approved and you have merged your change into `staging`, please test your changes accordingly. If all works as expected, please open a PR to merge into `main`. Do not merge directly to `main`.

*TODO: add descriptions for testing (code coverage tools, unit tests, end-to-end tests)*

## Helpful Commands ⛑

**Linting Locally**: 

    # linting & formatting warnings only
    $ docker exec -it <container-name> /bin/bash -c "yarn lint"

    # linting with fix & formatting
    $ docker exec -it <container-name> /bin/bash -c "yarn fix"

**Updating Vault Secrets**:

    vault kv patch kv/jump-math YOUR_SECRET_KEY=@filename 
`filename` corresponds to the name of the `.env` file you are looking to update. `YOUR_SECRET_KEY` corresponds to the key for the same file in your `secret.config`.
