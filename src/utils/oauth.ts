const redirectToGithubAuthorize = () => {
  const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    console.error("[GitHubLogin] OAuth 설정 누락");
    return;
  }

  // CSRF 방지를 위한 state
  const state = crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem("oauth_state", state);

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user user:email&state=${state}`;
  window.location.href = githubAuthUrl;
};

export default redirectToGithubAuthorize;
