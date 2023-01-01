# 🧮 JUMP Math

This repository is a digital math assessment tool made to be used by the [JUMP Math](https://jumpmath.org/) team, an award-winning charitable organization dedicated to helping students globally develop an understanding and appreciation of math. As of 2021, the JUMP Math program reached 250,000 students worldwide.

Made with React, GraphQL & Node.js.

## Getting Started 🎬
1. Install Docker Desktop ([MacOS](https://docs.docker.com/docker-for-mac/install/) | [Windows (Home)](https://docs.docker.com/docker-for-windows/install-windows-home/) | [Windows (Pro, Enterprise, Education)](https://docs.docker.com/docker-for-windows/install/) | [Linux](https://docs.docker.com/engine/install/#server)). To test that it is running properly, check that these commands give you error-free output.
```
docker info
docker-compose --version
```
2. Clone this repository and cd into the project folder
```
git clone https://github.com/uwblueprint/jump-math.git
cd jump-math
```
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
- **Commits**: When working on your branch, commit early and often. Make your commit messages descriptive and meaningful. By default, the linter will run - you must fix all linting errors before merging.
- **Pull Requests**: While working on a ticket, open a draft PR. Upon completing and testing your changes locally, click `Ready for Review` to publish your PR for review. Please tag @carissa-tang, @joyce-shi and any other team members who are working on related tickets as reviewers. **Anyone else is also welcome to leave PR reviews!** At least one reviewer must approve your PR for you to merge your branch into `staging`.

## Helpful Commands ⛑

**Running Tests**
    
    # running frontend tests
    $ docker exec -it ts-frontend "yarn test"
    
    # running backend tests
    $ docker exec -it ts-backend "yarn test"

**Linting Manually**: 

    # linting & formatting warnings only
    $ docker exec -it jump_math_ts_backend /bin/bash -c "yarn lint"

    # linting with fix & formatting
    $ docker exec -it jump_math_ts_backend /bin/bash -c "yarn fix"
