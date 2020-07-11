import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {getPossibleIPs} from "./utils/getPossibleIPs";
import { onlyNumberValidation } from './utils/validate';
import {useStyles} from "./style/useStyles";



const App = () => {
    const [str, setStr] = useState(null);
    const [ips, setIps] = useState([]);

    const handleInput = ({ target: { value } }) => {
        const val = onlyNumberValidation(value);
        setStr(val);
        const ips = getPossibleIPs(val);
        setIps(ips)
    };

    const classes = useStyles();

    return (
            <Container maxWidth="sm" className={classes.container}>
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
    );
};

export default App;
