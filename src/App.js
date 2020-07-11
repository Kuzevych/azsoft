import React, { useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { onlyNumberValidation } from './utils/validate';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(4),
            width: '25vh',
        },
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        textAlign: 'center',
        fontStyle: 'italic',
    },
}));

const App = () => {
    const [str, setStr] = useState(null);
    const [ips, setIps] = useState([]);
    const getPossibleIPs = (rawIpStr) => {
        const possibleDotsIndexes = [];
        const length = rawIpStr.length;

        for (let i = 1; i <= length - 3; i++) {
            for (let j = 2; j <= length - 2; j++) {
                for (let k = 3; k <= length - 1; k++) {
                    if (j - i >= 2 && k - j >= 2) {
                        possibleDotsIndexes.push([i, j, k]);
                    }
                }
            }
        }
        setIps(
            possibleDotsIndexes
                .map(([dot1I, dot2I, dot3I]) => [
                    rawIpStr.slice(0, dot1I),
                    rawIpStr.slice(dot1I, dot2I),
                    rawIpStr.slice(dot2I, dot3I),
                    rawIpStr.slice(dot3I),
                ])
                .filter((ipParts) =>
                    ipParts.every((part) => {
                        if (part[0] === '0' && part.length > 1) {
                            // '01'/'012' part is invalid
                            return false;
                        }

                        return parseInt(part, 10) <= 255;
                    })
                )
                .map((ipParts) => ipParts.join('.'))
        );
    };

    const handleInput = ({ target: { value } }) => {
        const val = onlyNumberValidation(value);
        setStr(val);
        getPossibleIPs(value);
    };

    const classes = useStyles();

    return (
        <div className="App">
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '60vh' }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            onChange={handleInput}
                            id="outlined-basic"
                            value={str}
                            label="Input numbers"
                            variant="outlined"
                        />
                    </form>
                    {ips.length === 0 && str ? (
                        <Typography variant="h6" className={classes.title}>
                            Error, we haven't ipv4 variants
                        </Typography>
                    ) : (
                        <List>
                            {ips.map((el) => (
                                <ListItem key={Math.random()} className={classes.listItem}>
                                    <ListItemText primary={el} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Typography>
            </Container>
        </div>
    );
};

export default App;
