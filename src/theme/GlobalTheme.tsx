import { createTheme, responsiveFontSizes } from "@mui/material";

export const lightTheme = responsiveFontSizes(createTheme({
     palette: {
        mode: "light",
        primary: {
            main: "#2563eb",         // azul mais suave
            contrastText: "#fff",
        },
        secondary: {
            main: "#f59e42",         // laranja suave
            contrastText: "#fff",
        },
        background: {
            default: "#f3f6fc",      // cinza-azulado bem claro
            paper: "#ffffff",        // branco puro para cards
        },
        text: {
            primary: "#1e293b",      // azul escuro
            secondary: "#475569",    // cinza azulado
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
}));

export const darkTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#60a5fa",         // azul claro
            contrastText: "#1e293b",
        },
        secondary: {
            main: "#fbbf24",         // amarelo suave
            contrastText: "#1e293b",
        },
        background: {
            default: "#181f2a",      // azul escuro para fundo
            paper: "#232b3b",        // azul/cinza escuro para cards
        },
        text: {
            primary: "#f3f6fc",      // quase branco
            secondary: "#cbd5e1",    // cinza claro
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
}));

// Exporte o tema padrão (claro, por exemplo)
export default lightTheme;