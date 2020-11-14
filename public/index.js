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

const profileData = (data) => {
    const pictures = document.querySelectorAll(".picture");
    pictures.forEach((picture) => {
        picture.src = data.avatarUrl;
    });
    const names = document.querySelectorAll(".name");
    names.forEach((name) => {
        name.innerHTML = data.name;
    });
    const usernames = document.querySelectorAll(".username");
    usernames.forEach((username) => {
        username.innerHTML = data.login;
    });
    const bios = document.querySelectorAll(".bio");
    bios.forEach((bio) => {
        bio.innerHTML = data.bio;
    });
    const focus = document.querySelector(".focus")
    focus.innerHTML = data.status.emojiHTML
    // const website = document.querySelector("#website");
    // website.href = "//" + user.websiteUrl;
}

const setData = (data) => {
    profileData(data.user);
    console.log(data.user);
}

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
        .then(res => {
            setData(res.data)
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

getDataFromGithub()