const graphqlQuery = `{
    user(login: "kip-guile") {
      avatarUrl
      login
      bio
      name
      websiteUrl
      twitterUsername
      status {
        emojiHTML
        message
      }
      repositories(first: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
        totalCount
        nodes {
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            edges {
                node {
                    name
                    color
                }
            }
          }
          description
          homepageUrl
          name
          updatedAt
          url
          forkCount
          watchers {
            totalCount
          }
          stargazers {
            totalCount
          }
          licenseInfo {
            name
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
              url
            }
          }
        }
      }
    }
}`

const getDataFromGithub = () => {
    fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "bearer " + "d6e9b8cf7d79e4524d54ce6138b5ebdb0e554faa"
        },
        body: JSON.stringify({query: graphqlQuery}),
    })
        .then(res => res.json())
        .then(res => console.log(res.data))
        .catch(err => {
            console.log(err)
        })
}

getDataFromGithub()