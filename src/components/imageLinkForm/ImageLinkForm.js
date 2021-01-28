import React from 'react';


const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div >
            <p className='f3'>
                {'This app will detect faces in any picture, give it a try!'}
            </p>
            <div className='form center'>
                <div className='center pa4 br3 shadow-5'>
                    <input
                        type='text'
                        className='f4 pa2 w-70 center'
                        onChange={onInputChange} />
                    <button
                        className='f4 w-30 grow link ph3 pv2 did'
                        onClick={onButtonSubmit}>Detect.</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;