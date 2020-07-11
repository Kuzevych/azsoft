import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { getPossibleIPs } from './utils/getPossibleIPs';
import { filterDigits } from './utils/filterDigits';
import { useStyles } from './style/useStyles';

const App = () => {
    const [value, setValue] = useState('');
    const handleInput = ({ target: { value } }) => {
        const val = filterDigits(value);
        setValue(val);
    };

    const classes = useStyles();
    const ips = getPossibleIPs(value);
    return (
        <Container maxWidth="sm" className={classes.container}>
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '75vh' }}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        onChange={handleInput}
                        id="outlined-basic"
                        value={value}
                        label="Input numbers"
                        variant="outlined"
                    />
                </form>
                {ips.length === 0 && value ? (
                    <Typography variant="h6" className={classes.title}>
                        No IPs can be formed with this input
                    </Typography>
                ) : (
                    <List>
                        {ips.map((el, idx) => (
                            <ListItem key={idx} className={classes.listItem}>
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
