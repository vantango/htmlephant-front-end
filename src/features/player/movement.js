import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";
import Modal from "../../components/Modal/index";
import _debounce from 'lodash.debounce';
import API from "../../utils/API"
import { tiles1 } from "../../data/maps/1";
import { tiles2 } from "../../data/maps/2";
import { tiles3 } from "../../data/maps/3";
import { tiles4 } from "../../data/maps/4";
import { ANIMATION_SPEED } from '../../config/constants'

const ANIMATION_WITH_PADDING = ANIMATION_SPEED * 1.25

export default function handleMovement(player) {
  // const stepSize =
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 2 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    console.log(newPos)
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  function observeImpassable(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 10;
  }

  // function showModal() {
  //   store.dispatch({
  //     type: "SHOW_MODAL",
  //     payload: {
  //       show: true,
  //     },
  //   });
  // }

  function observeAction(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    console.log(x, y);
    const nextTile = tiles[y][x];
    console.log(tiles[y][x]);
    switch (nextTile) {
      case 18:
        API.allNPC().then(res => {
          store.dispatch({
            type: "SHOW_MODAL",
            payload: {
              show: true,
              name: `${res.data[0].name}`,
              dialogue: `${res.data[0].usefulDialogue[0]}`,
              form: "mc",
            },
          })
        });
        // showModal();
        return true;
      case 17:
        API.easyAlgo().then(res => {
          const hints = JSON.parse(res.data.hints)
          console.log(hints)
          store.dispatch({
            type: "ASK_QUESTION",
            payload: {
              hints: hints[0],
              question: `${res.data.question}`,
              // dialogue: `${res.data[0].dialogue}`,
              form: "mc",
            },
          })
        });
        // showModal();
        return true;
      case 3:
        alert("Leaving Room");
        changeRoom();
      case 21:
        // alert ("Leaving main Room to WEST")
        changeRoom(tiles2);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [576, 128],
            direction: "WEST",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("WEST", 0),
          },
        });
        return true;
      case 22:
        // alert ("Leaving Main Room to NORTH")
        changeRoom(tiles3);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [288, 256],
            direction: "NORTH",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("NORTH", 0),
          },
        });
        return true;
      case 23:
        // alert ("Leaving Main Room to EAST")
        changeRoom(tiles4);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [32, 128],
            direction: "EAST",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("EAST", 0),
          },
        });
        return true;

      case 24:
        // alert ("Leaving WEST Room")
        changeRoom(tiles1);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [32, 128],
            direction: "EAST",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("EAST", 0),
          },
        });
        return true;
      case 25:
        // alert ("Leaving NORTH Room")
        changeRoom(tiles1);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [288, 32],
            direction: "SOUTH",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("SOUTH", 0),
          },
        });
        return true;
      case 26:
        // alert ("Leaving EAST Room")
        changeRoom(tiles1);
        store.dispatch({
          type: "MOVE_PLAYER",
          payload: {
            position: [576, 128],
            direction: "WEST",
            walkIndex: 0,
            spriteLocation: getSpriteLocation("WEST", 0),
          },
        });
        return true;

      default:
        return false;
    }
  }

  function changeRoom(tiles) {
    // take out player animation transition
    document.querySelector('.player_animation').classList.add('notransition')
    // console.log(room)
    store.dispatch({
      type: "ADD_TILES",
      payload: {
        tiles: tiles,
      },
    });
  }

  const dispatchMove = _debounce((direction, newPos) => {
    document.querySelector('.player_animation').classList.remove('notransition')
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction: direction,
        walkIndex: walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      },
    });
  },
    ANIMATION_WITH_PADDING,
    {
      maxWait: ANIMATION_WITH_PADDING, leading: true, trailing: false
    })

  function attemptMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    if (observeBoundaries(oldPos, newPos)) {
      if (!observeAction(oldPos, newPos)) {
        if (
          observeImpassable(oldPos, newPos)
        ) {
          dispatchMove(direction, newPos);
        }
      }
    }
  }

  const handleKeyDown = (e => {
    if (e.target !== "userAns") {


      switch (e.keyCode) {
        case 37:
        case 65:
          e.preventDefault();
          return attemptMove("WEST");

        case 38:
        case 87:

          e.preventDefault();
          return attemptMove("NORTH");

        case 39:
        case 68:

          e.preventDefault();
          return attemptMove("EAST");

        case 40:
        case 83:

          e.preventDefault();
          return attemptMove("SOUTH");

        default:
          console.log(e.keyCode);
      }
    }
  })

  window.addEventListener("keydown", (e) => {
    handleKeyDown(e);
  });

  return player;
}
