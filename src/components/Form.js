import React from 'react';

function Form(props) {
    return (
      <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder="Місто" />
        <button>Пошук</button>
      </form>
    );
}

export default Form;