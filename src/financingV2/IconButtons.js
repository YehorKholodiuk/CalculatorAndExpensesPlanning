import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import React from "react";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);


export default function IconButtons(props) {

    const {updateIcon, addIcon, deleteIcon, row} = props;
    return (
        <span>
            {/*карандаш "редактировать"*/}
            { updateIcon &&
            <LightTooltip title="редактировать" placement="left-start">
                <IconButton>
                    <CreateOutlinedIcon
                        onClick={() => props.editButtonHandler(row, row.name === 'Income' ? 'editIncome' : 'editExpenses')}
                        fontSize={'small'}
                        color={'grey'}
                    />
                </IconButton>
            </LightTooltip>}

            {/*плюсик "добавить"*/}
            {addIcon &&
            <LightTooltip title="добавить пункт" placement="left-start">
                <IconButton>
                    <AddOutlinedIcon fontSize={'small'} color={'grey'}/>
                </IconButton>
            </LightTooltip>}

            {/*корзина "удалить"*/}
            {deleteIcon &&
            <LightTooltip title="удалить пункт" placement="left-start">
                <IconButton>
                    <DeleteOutlineOutlinedIcon fontSize={'small'} color={'grey'}/>
                </IconButton>
            </LightTooltip>
            }
</span>
    );
}