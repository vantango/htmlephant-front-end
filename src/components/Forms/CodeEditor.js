import React, { useState } from "react";
import AceEditor from "react-ace";
import API from "../../utils/API";
import store from "../../config/store";
import "./CodeEditor.css";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"



function Editor() {
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

    // On submit, grab text from code editor
    const onSubmit = event => {
        event.preventDefault();

        // API call for easy algorithm, parse arguments and output
        API.easyAlgo().then(res => {
            const info = JSON.parse(res.data.argsAndOutput);

            // Create and call a new function to run the code written into the editor
            const testFunction = new Function("str", editorState.editorText);
            const result = testFunction(info.args)

            // API call for NPCs
            API.allNPC().then(data => {
                const luther = data.data[0]

                // Luther will evaluate your answer and judge you
                if(result===info.output) {
                    store.dispatch({
                        type: "SHOW_MODAL",
                        payload: {
                            ...store.getState().modal, dialogue: luther.usefulDialogue[3]
                        }
                    })
                } else if (!result) {
                    store.dispatch({
                        type: "SHOW_MODAL",
                        payload: {
                            ...store.getState().modal, dialogue: luther.usefulDialogue[4]
                        }
                    })
                }
                else {
                    store.dispatch({
                        type: "SHOW_MODAL",
                        payload: {
                            ...store.getState().modal, dialogue: luther.usefulDialogue[4]
                        }
                    })
                }
                
            })
        });
    }


    // Ace editor component
    return (
        <div>
            <AceEditor
                className="ace-editor"
                mode="javascript"
                theme="solarized-dark"
                onChange={onChange}
                name="test"
                width="50vw"
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
