import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Badge,
  Chip,
  Button,
  Tooltip,
  Drawer,
  ListItemButton,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Groups";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import RoomIcon from "@mui/icons-material/MeetingRoom";

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const formatTime = (ts) =>
  new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(ts);

const randomColor = (seed) => {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue} 70% 85%)`;
};

function Chat() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState("");
  const [askName, setAskName] = useState(true);
  const [rooms, setRooms] = useState(["general"]);
  const [room, setRoom] = useState("general");
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const listEndRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    const s = io(SOCKET_URL, {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      autoConnect: false,
    });

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));
    s.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    s.on("typing", ({ name: n, isTyping }) => {
      if (isTyping) {
        setTypingUser(n);
        clearTimeout(typingTimeout.current);
        typingTimeout.current = setTimeout(() => setTypingUser(null), 1500);
      } else setTypingUser(null);
    });
    s.on("onlineUsers", (arr) => setUsers(arr));
    s.on("roomList", (arr) => setRooms(arr));

    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const joinRoom = (r) => {
    if (!socket) return;
    setRoom(r);
    socket.emit("joinRoom", r);
    setMessages([messages]);
  };

  const sendMessage = () => {
    if (!input.trim() || !socket) return;
    setSending(true);
    socket.emit("message", input.trim());
    setInput("");
    setSending(false);
  };

  const emitTyping = (val) => {
    socket?.emit("typing", !!val);
  };

  const handleNameConfirm = () => {
    const trimmed = name.trim() || `User_${Math.floor(Math.random() * 999)}`;
    setName(trimmed);
    setAskName(false);
    socket?.connect();
    socket?.emit("join", { name: trimmed });
  };

  const onlineInRoom = useMemo(
    () => users.filter((u) => u.room === room),
    [users, room]
  );

  return (
    <Box sx={{ height: "100vh", bgcolor: (t) => t.palette.background.default }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <ChatIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Shinelight – Live Chat
          </Typography>
          <Chip
            icon={<RoomIcon />}
            label={room}
            color="secondary"
            sx={{ mr: 2 }}
            aria-label={`Current room: ${room}`}
          />
          <Tooltip title={connected ? "Connected" : "Disconnected"}>
            <Badge
              variant={connected ? "dot" : "standard"}
              color={connected ? "success" : "error"}
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar>{name ? name[0]?.toUpperCase() : "?"}</Avatar>
            </Badge>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {!connected && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 1,
            bgcolor: "warning.light",
          }}
        >
          <WifiOffIcon />
          <Typography variant="body2">
            You are offline or disconnected. Messages may not send.
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          height: "calc(100vh - 64px)",
          overflow: "hidden",
        }}
      >
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              position: "fixed",
              top: "100px",
              width: 280,
              p: 2,
              bgcolor: "background.paper",
            },
          }}
        >
          <Typography variant="overline" gutterBottom>
            Rooms
          </Typography>
          <List dense>
            {rooms.map((r) => (
              <ListItem key={r} disablePadding>
                <ListItemButton
                  selected={r === room}
                  onClick={() => joinRoom(r)}
                  sx={{
                    borderRadius: 1,
                    transition: "background 0.3s",
                    "&:hover": { bgcolor: "action.hover" },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={r}
                    secondary={`${
                      users.filter((u) => u.room === r).length
                    } online`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />
          <Typography variant="overline" gutterBottom>
            Online
          </Typography>
          <List dense sx={{ overflowY: "auto" }}>
            {onlineInRoom.map((u) => (
              <ListItem key={u.id}>
                <ListItemAvatar>
                  <Badge
                    color="success"
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  >
                    <Avatar sx={{ bgcolor: randomColor(u.name) }}>
                      {u.name[0]?.toUpperCase()}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={u.name}
                  secondary={u.id === socket?.id ? "You" : "Online"}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Chat Area */}
        <Box
          sx={{ display: "grid", gridTemplateRows: "1fr auto", height: "100%" }}
        >
          {/* Messages */}
          <Box
            sx={{
              p: { xs: 1, md: 2 },
              overflowY: "auto",
              bgcolor: (t) =>
                t.palette.mode === "light" ? "#f7f7fb" : "background.default",
            }}
          >
            <List sx={{ maxWidth: 900, mx: "auto" }}>
              {messages.map((m) => (
                <React.Fragment key={m.id}>
                  {m.system ? (
                    <ListItem>
                      <Box sx={{ mx: "auto", px: 1, py: 0.5 }}>
                        <Chip size="small" label={m.text} variant="outlined" />
                      </Box>
                    </ListItem>
                  ) : (
                    <ListItem
                      alignItems="flex-start"
                      sx={{
                        justifyContent:
                          m.user === name ? "flex-end" : "flex-start",
                      }}
                    >
                      {m.user !== name && (
                        <Avatar sx={{ mr: 1, bgcolor: randomColor(m.user) }}>
                          {m.user[0]?.toUpperCase()}
                        </Avatar>
                      )}
                      <Paper
                        elevation={1}
                        sx={{
                          px: 1.5,
                          py: 1,
                          bgcolor:
                            m.user === name
                              ? "primary.main"
                              : "background.paper",
                          color:
                            m.user === name
                              ? "primary.contrastText"
                              : "text.primary",
                          maxWidth: "75%",
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {m.user} • {formatTime(m.at)}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ whiteSpace: "pre-wrap", mt: 0.5 }}
                        >
                          {m.text}
                        </Typography>
                      </Paper>
                      {m.user === name && (
                        <Avatar sx={{ ml: 1, bgcolor: randomColor(m.user) }}>
                          {m.user[0]?.toUpperCase()}
                        </Avatar>
                      )}
                    </ListItem>
                  )}
                </React.Fragment>
              ))}
              {typingUser && (
                <ListItem>
                  <Typography variant="caption">
                    <em>{typingUser} is typing…</em>
                  </Typography>
                </ListItem>
              )}
            </List>
            <div ref={listEndRef} />
          </Box>

          {/* Composer */}
          <Box sx={{ borderTop: 1, borderColor: "divider", p: 1 }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ maxWidth: 900, mx: "auto" }}
            >
              <TextField
                fullWidth
                size="medium"
                placeholder={`Message #${room}`}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  emitTyping(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                multiline
                minRows={1}
                maxRows={4}
              />
              <Tooltip title="Send">
                <span>
                  <IconButton
                    color="primary"
                    onClick={sendMessage}
                    disabled={!input.trim() || sending || !connected}
                  >
                    {sending ? <CircularProgress size={24} /> : <SendIcon />}
                  </IconButton>
                </span>
              </Tooltip>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Name Prompt */}
      <Dialog open={askName}>
        <DialogTitle>Choose a display name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Others in the room will see this name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Your name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<LogoutIcon />}
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button variant="contained" onClick={handleNameConfirm}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Chat;
