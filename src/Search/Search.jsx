import React from "react";

function Search() {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          name="mobile_number"
          value={formData.mobile_number}
          onChange={changeHandler}
          placeholder="Enter a customer's phone number"
          required={true}
          className="search-input"
        ></input>
        <button className="search-button" type="submit">
          Find
          <FontAwesomeIcon className="margin-left-5" icon={faArrowRight} />
        </button>
      </form>
    </div>
  );
}

export default Search;
