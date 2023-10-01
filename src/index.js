// Your code here
document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const characterBar = document.getElementById('character-bar');
    const detailedInfo = document.getElementById('detailed-info');
    const votesForm = document.getElementById('votes-form');
  
    // Fetch characters data from the server
    fetch('http://localhost:3000/characters')
      .then(function(resp) {
        return resp.json();
      })
      .then(function(characters) {
        // Display character names in the character-bar
        characters.forEach(function(character) {
          const characterSpan = document.createElement('span');
          characterSpan.textContent = character.name;
          characterSpan.dataset.characterId = character.id; // Store character id as a data attribute
          characterBar.appendChild(characterSpan);
  
          // Add click event listener to show character details
          characterSpan.addEventListener('click', function() {
            // Fetch character details based on character id
            fetch(`http://localhost:3000/characters/${character.id}`)
              .then(function(resp) {
                return resp.json();
              })
              .then(function(characterDetails) {
                // Display character details in detailed-info
                document.getElementById('name').textContent = characterDetails.name;
                document.getElementById('image').src = characterDetails.image;
                document.getElementById('vote-count').textContent = characterDetails.votes;
              });
          });
        });
      });
  
    // Add submit event listener to votes-form
    votesForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const votesInput = document.getElementById('votes');
      const votesCount = parseInt(votesInput.value);
      const currentVotes = parseInt(document.getElementById('vote-count').textContent);
      const updatedVotes = currentVotes + votesCount;
      document.getElementById('vote-count').textContent = updatedVotes;
      votesInput.value = ''; // Clear input field
    });
  });
  
