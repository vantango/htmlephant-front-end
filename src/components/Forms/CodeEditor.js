import React, { useState } from "react";
import AceEditor from "react-ace";
import { useHistory } from "react-router-dom";
import API from "../../utils/API";
import store from "../../config/store";
import "./CodeEditor.css";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"



function Editor() {
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
        switch (level) {
            case 1:
                // API call for easy algorithm, parse arguments and output
                API.easyAlgo().then(res => {
                    const info = JSON.parse(res.data.argsAndOutput);
                    // Create and call a new function to run the code written into the editor
                    const testFunction = new Function("str", editorState.editorText);
                    const result = testFunction(info.args)
                    console.log(`Here's what we get back: ${result}`);
                    console.log(`Here's what we expect: ${info.output}`);

                        if (result === info.output) {
                            resetKeys()
                            showWinDialogue()
                            history.push("/winscreen")
                        }
                        else {
                            showWrongDialogue()
                        }
                }).catch(err => {
                    showWrongDialogue()
                    console.log(`Due to your idiocy, ${err}`);
                })
                break;
            case 2:
                // API call for easy algorithm, parse arguments and output
                API.medAlgo().then(res => {
                    const info = JSON.parse(res.data.argsAndOutput);
                    // Create and call a new function to run the code written into the editor
                    const testFunction = new Function("str", editorState.editorText);
                    const result = testFunction(info.args)
                    console.log(`Here's what we get back: ${result}`);
                    console.log(`Here's what we expect: ${info.output}`);

                        if (result === info.output) {
                            resetKeys()
                            showWinDialogue()
                            history.push("/winscreen")
                        }
                        else {
                            showWrongDialogue()
                        }
                }).catch(err => {
                    showWrongDialogue()
                    console.log(`Due to your idiocy, ${err}`);
                })
                break;
            case 3:
                // API call for easy algorithm, parse arguments and output
                API.hardAlgo().then(res => {
                    const info = JSON.parse(res.data.argsAndOutput);
                    // Create and call a new function to run the code written into the editor
                    const testFunction = new Function("str", editorState.editorText);
                    const result = testFunction(info.args)
                    console.log(`Here's what we get back: ${result}`);
                    console.log(`Here's what we expect: ${info.output}`);

                    // API call for NPCs
                    API.allNPC().then(data => {
                        // Luther will evaluate your answer and judge you
                        if (result === info.output) {
                            resetKeys()
                            showWinDialogue()
                            history.push("/endscreen")
                        }
                        else {
                            showWrongDialogue()
                        }
                    })
                }).catch(err => {
                    showWrongDialogue()
                    console.log(`Due to your idiocy, ${err}`);
                })
                break;

            default:
                break;
        }
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
