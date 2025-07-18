export type AppTheme = {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
};

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    background: "#dad5cb",
    text: "#0e2532",
    primary: "#e02929",
    card: "#e9e6e0",
    border: "#3e515b",
    notification: "#000000",
  },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    background: "#121212",
    text: "#ffffff",
    primary: "#1e90ff",
    card: "#1e1e1e",
    border: "#333333",
    notification: "#333333",
  },
};
