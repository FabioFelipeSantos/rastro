import { AppBar, Toolbar, Typography, Container, Box, Paper, Button, Card, CardContent, Stack } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const { mode } = useColorScheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Material UI - Redux Theme{" "}
            {mode && ["( ", mode!.slice(0, 1).toUpperCase(), mode!.slice(1).toLowerCase(), " )"].join("")}
          </Typography>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, mb: 4, flex: "1 0 auto" }}>
        <Paper sx={{ p: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
          >
            Material UI com Redux Toolkit
          </Typography>

          <Typography
            variant="body1"
            component="p"
            textAlign="justify"
          >
            Esta aplicação demonstra como usar o Redux Toolkit para gerenciar o tema do Material UI. O estado do tema é gerenciado
            centralmente através do Redux.
          </Typography>

          <Box
            component="ul"
            sx={{ pl: 4 }}
          >
            <Typography component="li"> Estado gerenciado com Redux Toolkit</Typography>
            <Typography component="li">Persistência no localstorage</Typography>
            <Typography component="li">Detecção automática do tema do sistema.</Typography>
          </Box>

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3 }}
          >
            <Button variant="contained">Botão Primário</Button>
            <Button variant="outlined">Botão Outline</Button>
            <Button variant="text">Botão Texto</Button>
          </Stack>

          <Box sx={{ display: "flex", gap: 2, mt: 4, flexWrap: "wrap" }}>
            <Card sx={{ minWidth: 275, flex: "1 1 300px" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                >
                  Redux Toolkit
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                >
                  O Redux Toolkit simplifica o uso do Redux com menos código boilerplate, facilitando o gerenciamento de estados
                  complexos.
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ minWidth: 275, flex: "1 1 300px" }}>
              <CardContent>
                <Typography variant="h6">Estado centralizado</Typography>
                <Typography variant="body2">
                  Com o Redux, o estado do tema é centralizado e facilmente acessível em qualquer componente da aplicação
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Paper>
      </Container>

      <Box
        component="footer"
        sx={{ py: 3, mt: "auto", textAlign: "center", bgcolor: "background.paper" }}
      >
        <Typography>Material UI v7.1.0 com Redux Toolkit - {new Date().getFullYear()}</Typography>
      </Box>
    </Box>
  );
}
