import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Collapse,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
  StarBorder,
  DoneAll,
} from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import EditIcon from '@material-ui/icons/Edit';
import { ICategories, genTextFieldInput } from '../utils';
import Axios from '../utils/axiosBase';
import GenFormInputFields from '../common/GenFormInputFields';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

let persistCategories: ICategories[] = [];

export default function Categories() {
  const classes = useStyles();

  const [categories, setCategories] = useState<ICategories[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    Axios.get('shop/categories', {
      _id: sessionStorage.getItem('_id'),
    }).subscribe((res) => {
      persistCategories = res;
      setCategories(persistCategories);
    });
  }, []);

  return (
    <div className="container">
      <List>
        {categories.map((cat, ind) => (
          <React.Fragment key={cat.name}>
            <ListItem
              button
              onClick={() => {
                setExpandedIndex(ind === expandedIndex ? null : ind);
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={cat.name} />
              {expandedIndex === ind ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <CollapsableList
              isOpen={expandedIndex === ind}
              tmpSubCategories={cat.subCategories}
              classes={classes}
            />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

const CollapsableList = ({
  isOpen,
  tmpSubCategories,
  classes,
}: {
  isOpen: boolean;
  tmpSubCategories: ICategories['subCategories'];
  classes: any;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState(tmpSubCategories);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {subCategories.map((scat, scatIndex) => (
            <>
          <ListItem key={scat} button className={classes.nested}>
            {editIndex === scatIndex ? (
              <GenFormInputFields
                formJson={[
                  genTextFieldInput(
                    '',
                    'Enter Sub-category',
                    'subCat',
                    (value) => value,
                    scat
                  ),
                ]}
                cb={(key: string, value: string) => {
                  console.log(value);

                  if (!value || value.length < 3) {
                    setIsBtnDisabled(true);
                    console.log(isBtnDisabled);
                  } else {
                    subCategories[scatIndex] = value;
                    setSubCategories(subCategories);
                    setIsBtnDisabled(false);
                  }
                }}
              />
            ) : (
              <ListItemText primary={scat} />
            )}

            {editIndex === scatIndex ? (
              <IconButton
                disabled={isBtnDisabled}
                onClick={(e) => {
                  e.preventDefault();
                  setEditIndex(null);
                }}
              >
                <DoneAll />
              </IconButton>
            ) : (
              <IconButton onClick={() => setEditIndex(scatIndex)}>
                <EditIcon />
              </IconButton>
            )}
          </ListItem>
          <Divider />
          </>
        ))}
      </List>
    </Collapse>
  );
};
