//Atualiza os sliders
const rangeInput = document.getElementById("password-lengh");
const lenghValue = document.getElementById("lengh-value");

rangeInput.addEventListener("input", () => {
    lenghValue.textContent = rangeInput.value;
});

//Gera senha
const generateButton = document.getElementById("generate-password");

//Exibir a senha
const passwordOutput = document.getElementById("password-output");
const copyButton = document.getElementById("copy-password");

//Gerando caracteres aleatórios
const getRandomLower = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getRandomNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getRandomSpecial = () => "!@#$%^&*()_+[]{}<>?,.".charAt(Math.floor(Math.random() * 20));

generateButton.addEventListener("click", ()=> {
    //Captura os valores do checkbox e do slider
    const useLowerCase = document.getElementById("lowercase").checked;
    const useUpperCase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSpecial = document.getElementById("special").checked;
    const passwordLengh = parseInt(rangeInput.value, 10);

    //Validação
    if(!useLowerCase && !useUpperCase && !useNumbers && !useSpecial){
        passwordOutput.textContent = "Selecione pelo menos uma opção para gerar a senha!";
        return;
    }

    //Listando funções ativas
    const activeFunctions = [];
    if(useLowerCase) activeFunctions.push(getRandomLower);
    if(useUpperCase) activeFunctions.push(getRandomUpper);
    if(useNumbers) activeFunctions.push(getRandomNumber);
    if(useSpecial) activeFunctions.push(getRandomSpecial);

    //Gera a senha
    let generatedPassword = "";
    for (let i = 0; i < passwordLengh; i++){
        const randomFunc = activeFunctions[Math.floor(Math.random() * activeFunctions.length)];
        generatedPassword += randomFunc();
    }

    //Exibir a senha
    passwordOutput.textContent = generatedPassword;
});

//Copiar a senha
copyButton.addEventListener('click', () => {
    const password = passwordOutput.textContent;
    
    // Verificar se o texto não é o padrão ou uma mensagem de erro
    if (
        !password || 
        password === "Clique em \"Gerar senha\" para criar uma senha nova" || 
        password === "Selecione pelo menos uma opção para gerar a senha!"
      ) {
        alert('Nenhuma senha válida para copiar!');
        return;
      }
      
  
    // Copiar a senha gerada para a área de transferência
    navigator.clipboard.writeText(password).then(() => {
      alert('Senha copiada para a área de transferência!');
    }).catch(() => {
      alert('Ocorreu um erro ao copiar a senha.');
    });
  });
  


