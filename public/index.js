const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

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
}

const repoData = (data) => {
  const count = document.querySelectorAll('#total-repos')
  count.forEach(number => {
    number.innerHTML = data.totalCount
  })
  const projectsBox = document.querySelector('.projects')
  data.nodes.forEach(project => {
    const singleProject = document.createElement('li')
    const projectHTML = `
    <div class="project-box">
      <div class="left-project-box">
        <h2>
          <a href="${project.url}">${project.name}</a>
        </h2>
        ${project.description ? "<p>" + project.description + "</p>" : ""}


        <div class="bottom-list">
          <div class="elements" style="${!project.languages.edges[0] ? "display: none;" : ""}">
          <span class="notch" style="background: ${project.languages.edges[0]
            ? project.languages.edges[0].node.color
            : ""}">
              </span>
                ${project.languages.edges[0]
            ? "<span>" +
                project.languages.edges[0].node.name +
                "</span>"
            : ""}
          </div>


        <div class="elements">
          <ion-icon name="star-outline"></ion-icon> 
            <span>
              ${project.stargazers.totalCount}
          </span>
        </div>

        <div class="elements">
            <ion-icon name="git-network-outline"></ion-icon> 
            <span>${project.forkCount}</span>
          </div>

        <div class="elements">
            Updated on ${new Date(project.updatedAt).getDate() +
            " " +
            monthArray[new Date(project.updatedAt).getMonth()]}
        </div>
        </div>

      </div>
      <div class="star-box">
        <button>
          <ion-icon name="star-outline" class="mr-1"></ion-icon> <span> Star </span>
        </button>
      </div>
    </div>
    `
    singleProject.innerHTML = projectHTML
    projectsBox.append(singleProject)
  })
}

const setData = (data) => {
    profileData(data.user);
    repoData(data.user.repositories)
}

const getDataFromGithub = () => {
    fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "bearer " + `${MY_TOKEN}`
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