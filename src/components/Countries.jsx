import countries from "../assets/content/countries";

export default function Countries({countryInput, setCountryInput}) {
    function handleCountryInput(event) {
        setCountryInput(event.target.value);
    }

    return (
        <div>
            <label htmlFor="countries">Country</label>
            <select name="countries" id="countries" value={countryInput} onChange={handleCountryInput}>
                <option defaultValue>Select Your Country</option>
                {countries.map((country) => {
                    return <option key={country.name} value={country.name}>{country.name}</option>
                })}
            </select>
        </div>
    )
}