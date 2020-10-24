import React, {useState} from 'react';

const Zipcode_Input = (props) => {
    const [zipcode, setZipcode] = useState('');

    //extra protection to make sure number is an integer
    const isInt = currentZip => {
        return (parseFloat(currentZip) === parseInt(currentZip) && !isNaN(currentZip))
    };

    const onFormSubmit = e => {
        e.preventDefault();
        const currentZip = zipcode;
        if ((currentZip.length === 5) && (isInt(currentZip))) {
            props.onSubmit(currentZip, false);
            setZipcode('');
        } else {
            props.onSubmit(currentZip, true);
        }
    };
    return (
        <div className="ui segement">
            <form className="ui form" onSubmit={onFormSubmit}>
                <div className="field">
                    <label>Enter ZIP Code</label>
                    <input
                        type="text"
                        pattern="[0-9]*"
                        maxLength="5"
                        value={zipcode}
                        onChange={(e)=>setZipcode(e.target.value )}
                    />
                </div>
            </form>
        </div>
    );
};

export default Zipcode_Input;