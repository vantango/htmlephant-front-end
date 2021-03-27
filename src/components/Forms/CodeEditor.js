import React, { useState } from "react";
import AceEditor from "react-ace";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import store from "../../config/store";
import "./CodeEditor.css";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"



const Editor = () => {
    let history = useHistory()
    // Create state for text in code editor
    const [editorState, setEditorState] = useState({
        editorText: ""
    });

    // On change, update editorText state
    const onChange = newValue => {
        setEditorState({
            editorText: newValue
        });
    };

    function resetKeys() {
        store.dispatch({
            type: "ADD_KEY",
            payload: {
                ...store.getState().key, amount: 0
            }
        })
    }

    function showWinDialogue() {
        store.dispatch({
            type: "SHOW_MODAL",
            payload: {
                ...store.getState().modal, dialogue: store.getState().modal.winDialogue
            }
        })
    }

    function showWrongDialogue() {
        store.dispatch({
            type: "SHOW_MODAL",
            payload: {
                ...store.getState().modal, dialogue: store.getState().modal.wrongDialogue
            }
        })
    }

    // On submit, grab text from code editor
    const onSubmit = event => {
        event.preventDefault();
        const level = store.getState().user.level
        // API call for NPCs
        API.allNPC().then(data => {
            // Create and call a new function to run the code written into the editor
            const info = JSON.parse(store.getState().editor.text);
            const testFunction = new Function("str", editorState.editorText);
            const result = testFunction(info.args)
            // Joe will evaluate your answer and judge you
            if (result === info.output) {
                resetKeys()
                showWinDialogue()
                level = 3 ? history.push("/endscreen") : history.push("/winscreen")
            }
            else {
                showWrongDialogue()
            }
        }).catch(err => {
            err ? showWrongDialogue() : history.push("/endscreen")
        });
    }

    // Ace editor component
    return (
        <div>
            <AceEditor
                className="ace-editor"
                mode="javascript"
                onChange={onChange}
                name="test"
                width="100%"
                height="50vh"
                fontSize="20"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
            />
            <button onClick={onSubmit}>Submit</button>
        </div>
    )

}

export default Editor;
