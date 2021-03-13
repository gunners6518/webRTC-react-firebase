import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/gunners6518">
        てりー
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function InputFormRemote({
  remotePeerName,
  setRemotePeerName,
  localPeerName,
}) {
  const classes = useStyles();
  const label = "相手の名前";
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState("");
  const [isComposed, setIsComposed] = useState(false);

  // 文字入力があるか判定
  useEffect(() => {
    const disabled = name === "";
    setDisabled(disabled);
  }, [name]);

  const initializeRemotePeer = useCallback(
    (e) => {
      setRemotePeerName(name);
      e.preventDefault();
    },
    [name, setRemotePeerName]
  );

  if (localPeerName === "") return <></>;
  if (remotePeerName !== "") return <></>;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {label}を入力してください
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            autoFocus
            fullWidth
            label={label}
            margin="normal"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
            onCompositionEnd={() => setIsComposed(false)}
            onCompositionStart={() => setIsComposed(true)}
            onKeyDown={(e) => {
              console.log({ e });
              if (isComposed) return; //変換中のenter押下はreturn
              if (e.target.value === "") return; //入力空でのenterはreturn
              if (e.key === "Enter") initializeRemotePeer(e);
            }}
            value={name}
            variant="outlined"
          />
          <Button
            className={classes.submit}
            color="primary"
            fullWidth
            type="submit"
            variant="contained"
            disabled={disabled}
            onClick={(e) => initializeRemotePeer(e)}
          >
            決定
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
