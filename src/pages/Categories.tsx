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
  Button,
  PaperProps,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core';
import { ExpandLess, ExpandMore, DoneAll, Delete } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import EditIcon from '@material-ui/icons/Edit';
import { ICategories, genTextFieldInput } from '../utils';
import Axios from '../utils/axiosBase';
import GenFormInputFields from '../common/GenFormInputFields';
import AddIcon from '@material-ui/icons/Add';
import { TextFieldInput } from '../common/SearchInput';

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

  const getCategories = () => {
    Axios.get('shop/categories', {
      _id: sessionStorage.getItem('_id'),
    }).subscribe((res) => {
      persistCategories = res;
      setCategories(persistCategories);
    });
  };

  const deleteCategories = (id: string, index: number) => {
    Axios.delete('shop/categories', id).subscribe((res) => {
      if (res.result['n'] == 1) {
        const t = [...categories];
        t.splice(index, 1);
        setCategories(t);
      }
    });
  };

  const pushCategories = (cat: ICategories) =>
    setCategories([...categories, cat]);

  useEffect(getCategories, []);

  return (
    <div className="container">
      <CategoriesDialog pushCategories={pushCategories} />
      <List>
        {categories.map((cat, ind) => {
          const toggleListOpen = () => {
            setExpandedIndex(ind === expandedIndex ? null : ind);
          };

          return (
            <React.Fragment key={cat.name}>
              <ListItem button onClick={toggleListOpen}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={cat.name} />
                <IconButton onClick={() => deleteCategories(cat['_id'], ind)}>
                  <Delete />
                </IconButton>
                <IconButton>
                  {expandedIndex === ind ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItem>
              <CollapsableList
                isOpen={expandedIndex === ind}
                tmpCategories={cat}
                classes={classes}
              />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}




// ==================Collapsable sub-categories===============









const CollapsableList = ({
  isOpen,
  tmpCategories,
  classes,
}: {
  isOpen: boolean;
  tmpCategories: ICategories;
  classes: any;
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(
    tmpCategories.subCategories.length
  );
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const updateCategories = (subCat?: string[]) => {
    Axios.patch('shop/categories', {
      ...tmpCategories,
      subCategories: subCat
        ? subCat.filter((a) => a)
        : subCategories.filter((a) => a),
    }).subscribe(console.log);
  };

  useEffect(() => {
    setSubCategories([...tmpCategories.subCategories, '']);
  }, [tmpCategories]);

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subCategories.map((scat, scatIndex) => (
          <React.Fragment key={scat}>
            <Divider />
            <ListItem className={classes.nested}>
              {editIndex === scatIndex ? (
                <GenFormInputFields
                  formJson={[
                    genTextFieldInput(
                      '',
                      tmpCategories.subCategories.length === editIndex
                        ? 'Add Sub-category'
                        : 'Sub-category',
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
              {scatIndex + 1 !== subCategories.length ? (
                <IconButton
                  onClick={() => {
                    const t = [...subCategories];
                    t.splice(scatIndex, 1);
                    setSubCategories(t);
                    setEditIndex(t.length - 1);
                    console.log(t);
                    updateCategories(t);
                  }}
                >
                  <Delete />
                </IconButton>
              ) : null}
              {editIndex === scatIndex ? (
                <IconButton
                  disabled={isBtnDisabled}
                  onClick={(e) => {
                    e.preventDefault();
                    if (scatIndex + 1 === subCategories.length) {
                      setSubCategories([...subCategories, '']);
                      setEditIndex(subCategories.length);
                      setIsBtnDisabled(true);
                    } else {
                      setEditIndex(null);
                    }
                    updateCategories();
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
          </React.Fragment>
        ))}
      </List>
    </Collapse>
  );
};

// ===================Add Category Modal=========================

function CategoriesDialog({ pushCategories }: { pushCategories: Function }) {
  const [open, setOpen] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [catNm, setcatNm] = useState('');

  const createCategories = () => {
    Axios.post('shop/categories', {
      name: catNm,
      shopId: sessionStorage.getItem('_id'),
      subCategories: [],
    }).subscribe((res) => {
      console.log(res);
      pushCategories(res);
      handleClose();
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        color="primary"
        className="mb-4"
        variant="contained"
      >
        <AddIcon /> Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Add New Category
        </DialogTitle>
        <DialogContent>
          <TextFieldInput
            formControlName=""
            placeholder="Category name"
            cb={(fname: string, value: string) => {
              setBtnDisabled(value && value.length > 2 ? false : true);
              setcatNm(value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            disabled={btnDisabled}
            onClick={createCategories}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
