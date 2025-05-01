let isLoggingIn = false;

export const getIsLoggingIn = () => isLoggingIn;

export const markLoginStarted = () => {
  isLoggingIn = true;
};

export const markLoginFinished = () => {
  isLoggingIn = false;
};
