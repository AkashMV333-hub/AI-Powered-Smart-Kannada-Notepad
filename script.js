async function sendData(event) {
    // Prevent default action if event is present
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    //Step 1: Getting input value from html and displaying it
    let backtoinp = document.getElementById('inputId');
    let inpvar = document.getElementById('inputId').value;
    let displayinp = document.getElementById('userinput');
    displayinp.textContent = inpvar;

    //Step 2: Defining lastWord and wordCnt
    let lastWord = "";
    const wordcnt = inpvar.split(' ');

    //Step 3: Get the number of words
    const wordCount = wordcnt.length;
    console.log("Number of Words:", wordCount);


    //Step 4: Getting number of lastWords based on wordCout
    if(wordCount == 1){
         
        const words = inpvar.trim().split(' ');
        lastWord = words[words.length - 1];  
         
    } else if(wordCount == 2){

        const words = inpvar.trim().split(' ');
        lastWord = words[words.length - 2] + " " + words[words.length - 1];  
         

    } else if(wordCount == 3){

        const words = inpvar.trim().split(' ');
        lastWord = words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1];  
         

    } else {

        const words = inpvar.trim().split(' ');
        lastWord = words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1];  

    }

    console.log(`Got last word successfully ${lastWord}`);


    //Step 5: Convert into JSON
    const data = { data: lastWord };
    console.log(data);

    try {
        //Step 6: Sending request
        const response = await fetch('http://localhost:3212/sendData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        //Step 7: Receiving and Handling response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const result = await response.json();
        console.log('Received response from backend');
        console.log(result);
        let displaynxt = document.getElementById('response');

        if(result.receivedData != "ಫಲವಿಲ್ಲ" && result.receivedData != "ಮರಿ"){
            displaynxt.textContent = result.receivedData;
        }
        else{
            displaynxt.textContent = "";
        }
                
        let displayinpvar = inpvar;
        let displaynxtvar = result.receivedData;

        document.addEventListener("keyup", event => {
            if(event.key == "ArrowRight"){
                displayinpvar = displayinpvar + displaynxtvar;
                displayinp.textContent = displayinpvar;
                backtoinp.value = displayinpvar;
            }
        
        })
    } catch (error) {
        console.error('Error:', error);
    }
    return false; // Prevents default form submission behavior
}