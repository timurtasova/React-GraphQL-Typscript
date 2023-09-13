import Country from "./Country";
import { useState } from "react";
import { CountryType } from "../types/CountryType";

function CountryFilter(props: CountryType) {
    const [term, setTerm] = useState<string>('');
    const [countriesToShare, setCountriesToShire] = useState(props.countries);

    const handleChange = (e: React.SyntheticEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        const updatedCountries: any = props.countries.filter(country => {
            if (country.name.toLowerCase().indexOf(target.value.toLowerCase()) > -1) {
                return country;
            }
        });
        setCountriesToShire(updatedCountries);
        setTerm(target.value);
    };

    return (
        <div className="filter">
            <label htmlFor="filter">
                Filter:
                <input className="filter-input" id="filter" value={term} onChange={handleChange} />
            </label>
            <div className="list-header">
                <h3>Country</h3>
                <h3>Languages</h3>
            </div>
            <Country countries={countriesToShare} />
        </div>
    );
}

export default CountryFilter;