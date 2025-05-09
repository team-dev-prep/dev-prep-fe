const redirectToGithubAuthorize = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error("[GitHubLogin] OAuth 설정 누락");
    return;
  }

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email`;
  window.location.href = githubAuthUrl;
};

export default redirectToGithubAuthorize;
