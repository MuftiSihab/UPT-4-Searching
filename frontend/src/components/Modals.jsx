import React from 'react';

const Modals = (props) => {
    const { active, title, content, toggle, children, handleSave} = props
  return (
    <div className={`modal ${active ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={toggle}></div>
        <div className="modal-card">
        <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={toggle}></button>
        </header>
        <section className="modal-card-body">
            {children}
            {content}
        </section>
        <footer className="modal-card-foot">
            <button className="button is-success" onClick={handleSave}>Save</button>
            <button className="button" onClick={toggle}>Cancel</button>
        </footer>
        </div>
    </div>
  )
}

export default Modals;
