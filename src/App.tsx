import React, { useContext, useState } from "react";
import { ContextApp } from "./context/Context";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

function App(props: any) {
  const { todos, onClickAddTodo, onClickDeleteTodo, onClickCompleteTodo } =
    useContext(ContextApp);
  const { window } = props;

  const [inContent, setInContent] = useState("");
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Progetti
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="-To Do List" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Paper
      elevation={6}
      sx={{
        bgcolor: "##D9AFD9",
        backgroundImage: "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
        width: "100%",
      }}
    >
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Salvatore Polizzotti
          </Typography>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Inserisci la task"
            variant="filled"
            value={inContent}
            onChange={(e) => setInContent(e.target.value)}
          />
          <Button
            variant="text"
            onClick={() => {
              if (inContent !== "") {
                onClickAddTodo(inContent);
                setInContent("");
              } else {
                alert("Inserisci una task!");
              }
            }}
          >
            Aggiungi la task!
          </Button>
          <Box>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {todos.map((todo) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "10px",
                  }}
                >
                  <ListItem
                    sx={{
                      color: todo.isCompleted === true ? "gray" : "#cfe8fc",
                      textAlign: "center",
                      bgcolor: "#8BC6EC",
                      backgroundImage:
                        "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
                      borderRadius: "10px",
                      width: "700px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    key={todo.id}
                  >
                    {todo.isCompleted === true ? "Fatto!" : todo.content}
                    <Box>
                      <Button
                        variant="text"
                        onClick={() => {
                          onClickDeleteTodo(todo.id);
                        }}
                      >
                        Cancella task
                      </Button>
                      <Checkbox
                        {...label}
                        onClick={() => {
                          onClickCompleteTodo(todo.id);
                        }}
                      ></Checkbox>
                    </Box>
                  </ListItem>
                </Box>
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}

export default App;
