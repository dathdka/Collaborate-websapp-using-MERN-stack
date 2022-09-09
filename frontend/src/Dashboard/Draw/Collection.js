import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import { getDrawActions, setDraw } from "../../store/actions/drawAction";
import Button from "@mui/material/Button";
import store from "../../store/store";
import { fabric } from "fabric";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#6a6a6a",
  marginTop: "50px",
  display: "flex",
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
    for (let i = page-1; i < page + 2 && i < collection.length; i++)
      setCollections(collections => [...collections, collection.at(i)])
      // collections.push(collection.at(i));
      console.log(collection)
      console.log(collections)
  }, [page,isDraw]);
  useEffect(() => {
    console.log(collections);
    collections.map(f => {
      var canvas = new fabric.Canvas(f._id, {
        backgroundColor: "white",
      });
      canvas.setWidth(240);
      canvas.setHeight(151);
      canvas.isDrawingMode = false;
      canvas.loadFromJSON(JSON.parse(f.data));
      canvas.calcOffset();
    });
  }, [collections, page]);
  const select = (_id, data) => {
    store.dispatch(setDraw({ _id, data }));
  };
  return (
    <MainContainer>
      <Stack>
        {collections.map(f => (
          <>
            <canvas
              id={f._id}
              width={240}
              height={151}
              onClick={() => select(f._id, f.data)}
            />
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
          </>
        ))}
        <Pagination
          count={Math.ceil((collection.length / 3)+1)}
          page={page}
          onChange={changePage}
          color="secondary"
        />
      </Stack>
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
