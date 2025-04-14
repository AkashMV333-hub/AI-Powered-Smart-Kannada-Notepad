document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('inputId');
    const form = document.getElementById('myForm');
  
    // Prevent form from reloading the page
    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  
    // Send data on every input change
    inputField.addEventListener('input', () => {
      sendData();
    });
  });
  
  async function sendData() {
      const backtoinp = document.getElementById('inputId');
      const inpvar = backtoinp.value.trim();
      const displayinp = document.getElementById('userinput');
      displayinp.textContent = inpvar;
  
      const words = inpvar.split(' ');
      let lastWord = "";
  
      if (words.length >= 1) {
          lastWord = words.slice(-Math.min(4, words.length)).join(' ');
      }
  
      const data = { data: lastWord };
  
      try {
          const response = await fetch('http://localhost:3212/sendData', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });
  
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
          const result = await response.json();
          const displaynxt = document.getElementById('response');
  
          if (result.receivedData !== "ಫಲವಿಲ್ಲ" && result.receivedData !== "ಮರಿ") {
              displaynxt.textContent = result.receivedData;
          } else {
              displaynxt.textContent = "";
          }
  
          let displayinpvar = inpvar;
          let displaynxtvar = result.receivedData;
  
          document.addEventListener("keyup", event => {
              if (event.key === "ArrowRight") {
                  displayinpvar = displayinpvar + " " + displaynxtvar;
                  displayinp.textContent = displayinpvar;
                  backtoinp.value = displayinpvar;
              }
          });
  
      } catch (error) {
          console.error('Error:', error);
      }
  }
  
  