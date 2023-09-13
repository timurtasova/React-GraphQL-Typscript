import { useState, useEffect } from 'react';
import { CountryType } from '../types/CountryType';

function Country(props: CountryType) {
    const [selected, setSelected] = useState<number | null>(9);
    const [colorNum, setColorNum] = useState<number | null>(0);

    const colors = [
        '#16a085',
        '#27ae60',
        '#36587a',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#61000f',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
    ];

    useEffect(() => {
        props.countries.length < 10 ? setSelected(props.countries.length - 1) : setSelected(9);
        if (colorNum !== null) {
            colorNum < colors.length - 1
                ? setColorNum(prev => prev !== null ? prev + 1 : 0)
                : setColorNum(0);
        }
    }, [props.countries]);

    useEffect(() => {
        const items = document.querySelectorAll('.list-item');
        const selectedItem = document.getElementById(selected !== null ? selected.toString() : '');
        if (items.length > 0) {
            if (selected !== null) {
                items.forEach(el => el.classList.add('inactive'));
                selectedItem?.classList.remove('inactive');
                if (colorNum !== null)
                    selectedItem !== null
                        ? selectedItem.style.backgroundColor = colors[colorNum]
                        : selectedItem;
            } else {
                items.forEach(el => el.classList.add('inactive'));
            }
        }
    }, [selected]);

    const handleChange = (i: number) => {
        setSelected(prev => i === prev ? null : i);
        selected === null ? setColorNum(null) : colorNum;
        if (colorNum !== null) {
            if (colorNum < colors.length - 1) {
                setColorNum(prev => prev !== null ? prev + 1 : 0)
            } else {
                setColorNum(0);
            }
        }
    }

    const renderedCountry = props.countries.map((country, i) => {
        return (
            <label className="list-item" id={i.toString()} key={i}>
                <div className="country-header">
                    <div>
                        <input
                            type="checkbox"
                            checked={i === selected}
                            onChange={() => handleChange(i)}
                        />
                        <h3 className="country-name">{i + 1}- {country.name}</h3>
                    </div>
                    {'=>'}
                </div>
                <div className="languages">
                    {
                        country.languages.map((lang, i) =>
                            <span className="country-languages" key={lang.name}>{i + 1}- {lang.name}</span>
                        )
                    }
                </div>
            </label>
        );
    });

    return (
        <div className="list">
            {renderedCountry}
        </div>
    );
}

export default Country;