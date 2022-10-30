import React from "react";
import Dialog from "./Dialog/Dialog";
import s from './Dialogs.module.css';
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogs = props.dialogsPage.dialogs.map((d, id) => <Dialog key={id} id={d.id} dialog={d.dialog} />)
    let messages = props.dialogsPage.messages.map((m, id) => <Message key={id} message={m.message} />)

    const onUpdateMessage = (event) => {
        props.updateMessage(event.target.value)
    }

    const onAddMessage = () => {
        props.addMessage()
    }

    return (
        <div className={s.content}>
            <div className={s.dialogs}>
                <div><h2>Dialogs</h2></div>
                {dialogs}
            </div>

            <div className={s.messages}>
                <div><h2>Messages</h2></div>
                {messages}
                <div>
                    <input onChange={onUpdateMessage} value={props.dialogsPage.newMessageText} />
                </div>
                <div>
                    <button onClick={onAddMessage}>Add Message</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs