import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(4),
            width: '25vh',
        },
    },
    container: {
        textAlign: 'center',
        marginTop: '50px'
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