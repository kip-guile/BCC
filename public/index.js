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
      repositories(last: 20, privacy: PUBLIC, orderBy: {field: PUSHED_AT, direction: DESC}) {
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