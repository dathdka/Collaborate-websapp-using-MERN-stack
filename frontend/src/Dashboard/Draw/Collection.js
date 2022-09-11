import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { deleteCollection, getDrawActions, setDraw } from "../../store/actions/drawAction";
import Button from "@mui/material/Button";
import store from "../../store/store";
import { fabric } from "fabric";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
const MainContainer = styled("div")({
  backgroundColor: "#6a6a6a",
  marginTop: "50px",
});

const Collection = ({
  chosenChatDetails,
  isDraw,
  getCollection,
  collection,
  selectCollection,
}) => {
  const [page, setPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const changePage = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if (chosenChatDetails) {
      getCollection({ receiverId: chosenChatDetails.id });
    }
  }, [chosenChatDetails]);
  useEffect(() => {
    setCollections([]);
    var temp = (page-1)*3;
    for (let i = temp; i < temp + 3; i++){
      if(i < collection.length)
        setCollections(collections => [...collections, collection.at(i)]);
      else
        return;
    }
  }, [page, collection]);
  useEffect(() => {
    collections.map(f => {
      var canvas = new fabric.Canvas(f._id, {
        backgroundColor: "white",
      });
      canvas.isDrawingMode = false;
      canvas.loadFromJSON(JSON.parse(f.data));
      canvas.setWidth(240);
      canvas.setHeight(151);
      canvas.setZoom(0.2)
      canvas.calcOffset();
    });
  }, [collections, page]);
  const select = (_id, data) => {
    store.dispatch(setDraw({ _id, data }));
  };

  const deleteCollec = (_id, receiverId) =>{
    store.dispatch(deleteCollection({collectionId: _id, receiverId: receiverId}));
  }
  return (
    <MainContainer>
      <div>
        {collections.map(f => (
          <div key = {f._id}>
            <canvas
              id={f._id}
              width={240}
              height={151}
              onClick={() => select(f._id, f.data)}
            />
            <p>
            <Button
              style={{
                width: "100%",
                height: "42px",
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                textTransform: "none",
                color: "yellow",
                position: "relative",
              }}
              onClick={() => select(f._id, f.data)}
            >
              {f.name}
            </Button>
            <DeleteIcon onClick={()=> deleteCollec(f._id, chosenChatDetails.id)}/>
            </p>
          </div>
        ))}
        <Pagination
          count={Math.ceil((collection.length / 3))}
          page={page}
          onChange={changePage}
          color="secondary"
        />
      </div>
    </MainContainer>
  );
};
const mapStoreStateToProps = ({ chat, draw }) => {
  return {
    ...chat,
    ...draw,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getDrawActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Collection);
