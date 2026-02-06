
function isPalindrome(str) {
  const cleanedStr = str.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
  const reversedStr = cleanedStr.split("").reverse().join("");
  return cleanedStr === reversedStr;
}

  function checkPalindrome() {
    const input = document.getElementById("palindromeInput").value;
    const resultEl = document.getElementById("palindromeResult");

    const ok = isPalindrome(input);

    resultEl.textContent = ok ? "Palindrome!" : "Not a palindrome.";
    resultEl.style.color = ok ? "green" : "red";
  }


console.log(isPalindrome("A man, a plan, a canal, Panama!")); // true
console.log(isPalindrome("Hello, World!")); // false
