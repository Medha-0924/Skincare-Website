import React, { useState } from 'react';
import "../App.css"
export default function Form() {
  const [formData, setFormData] = useState({
    skinType: '',
    acneFrequency: '',
    skinFeel: '',
    skinConcern: '',
    skinIrritationFrequency: '',
    moisturizerType: '',
    sunReaction: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData);
    
    alert('Thank you for conducting the quiz , we will take care of your skin and will contact you soon!');
  };

  return (
    <div className='outerfo'>
      <header className='headerf'>
        <h1>FiND YOUR PERFECT SKiN CARE PRODUCTS:</h1>
      </header>
      
      <main>
        <form id="quizForm" className='formfo' onSubmit={handleSubmit}>
          <fieldset>
            <legend>1. How would you describe your skin type?</legend>
            <label><input type="radio" name="skinType" value="Oily" onChange={handleInputChange} /> Oily</label><br />
            <label><input type="radio" name="skinType" value="Dry" onChange={handleInputChange} /> Dry</label><br />
            <label><input type="radio" name="skinType" value="Combination" onChange={handleInputChange} /> Combination</label><br />
            <label><input type="radio" name="skinType" value="Normal" onChange={handleInputChange} /> Normal</label><br />
            <label><input type="radio" name="skinType" value="Sensitive" onChange={handleInputChange} /> Sensitive</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>2. Do you experience acne or breakouts?</legend>
            <label><input type="radio" name="acneFrequency" value="Frequently" onChange={handleInputChange} /> Frequently</label><br />
            <label><input type="radio" name="acneFrequency" value="Occasionally" onChange={handleInputChange} /> Occasionally</label><br />
            <label><input type="radio" name="acneFrequency" value="Rarely" onChange={handleInputChange} /> Rarely</label><br />
            <label><input type="radio" name="acneFrequency" value="Never" onChange={handleInputChange} /> Never</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>3. How does your skin feel after cleansing?</legend>
            <label><input type="radio" name="skinFeel" value="Tight and dry" onChange={handleInputChange} /> Tight and dry</label><br />
            <label><input type="radio" name="skinFeel" value="Oily and shiny" onChange={handleInputChange} /> Oily and shiny</label><br />
            <label><input type="radio" name="skinFeel" value="Balanced" onChange={handleInputChange} /> Balanced</label><br />
            <label><input type="radio" name="skinFeel" value="Red or irritated" onChange={handleInputChange} /> Red or irritated</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>4. What is your primary skin concern?</legend>
            <label><input type="radio" name="skinConcern" value="Aging signs" onChange={handleInputChange} /> Aging signs (wrinkles, fine lines)</label><br />
            <label><input type="radio" name="skinConcern" value="Acne and blemishes" onChange={handleInputChange} /> Acne and blemishes</label><br />
            <label><input type="radio" name="skinConcern" value="Dryness and flakiness" onChange={handleInputChange} /> Dryness and flakiness</label><br />
            <label><input type="radio" name="skinConcern" value="Redness and sensitivity" onChange={handleInputChange} /> Redness and sensitivity</label><br />
            <label><input type="radio" name="skinConcern" value="Uneven skin tone" onChange={handleInputChange} /> Uneven skin tone</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>5. How often do you experience skin irritation or redness?</legend>
            <label><input type="radio" name="skinIrritationFrequency" value="Daily" onChange={handleInputChange} /> Daily</label><br />
            <label><input type="radio" name="skinIrritationFrequency" value="Weekly" onChange={handleInputChange} /> Weekly</label><br />
            <label><input type="radio" name="skinIrritationFrequency" value="Monthly" onChange={handleInputChange} /> Monthly</label><br />
            <label><input type="radio" name="skinIrritationFrequency" value="Rarely" onChange={handleInputChange} /> Rarely</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>6. What type of moisturizer do you prefer?</legend>
            <label><input type="radio" name="moisturizerType" value="Gel-based" onChange={handleInputChange} /> Gel-based</label><br />
            <label><input type="radio" name="moisturizerType" value="Cream-based" onChange={handleInputChange} /> Cream-based</label><br />
            <label><input type="radio" name="moisturizerType" value="Oil-based" onChange={handleInputChange} /> Oil-based</label><br />
            <label><input type="radio" name="moisturizerType" value="None" onChange={handleInputChange} /> None</label>
          </fieldset>
          <br /><br />
        
          <fieldset>
            <legend>7. How does your skin typically react to sun exposure?</legend>
            <label><input type="radio" name="sunReaction" value="Burns easily and rarely tans" onChange={handleInputChange} /> Burns easily and rarely tans</label><br />
            <label><input type="radio" name="sunReaction" value="Burns sometimes, tans gradually" onChange={handleInputChange} /> Burns sometimes, tans gradually</label><br />
            <label><input type="radio" name="sunReaction" value="Tans easily and rarely burns" onChange={handleInputChange} /> Tans easily and rarely burns</label><br />
            <label><input type="radio" name="sunReaction" value="Tans quickly and never burns" onChange={handleInputChange} /> Tans quickly and never burns</label>
          </fieldset>
          <br /><br />

          <button className='buttonfo' type="submit">Submit</button>
        </form>
        <div id="result"></div>
      </main>
    </div>
  );
}