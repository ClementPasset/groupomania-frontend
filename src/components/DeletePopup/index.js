const DeletePopup = ({ question, handleYes, handleNo }) => {
    return (
        <div className='popup'>
            <p className='popup__question'>{question ?? 'Voulez-vous supprimer ?'}</p>
            <div className="popup__btnContainer">
                <button onClick={handleYes} className='popup__btn popup__btn--yes'>Oui</button>
                <button onClick={handleNo} className='popup__btn popup__btn--no'>Non</button>
            </div>
        </div>
    );
};

export default DeletePopup;