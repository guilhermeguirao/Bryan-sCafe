      fetch('data/branches.xml')
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(data, 'text/xml');
          const branchList = document.getElementById('branchList');
  
          const branches = xmlDoc.getElementsByTagName('branch');
          for (let i = 0; i < branches.length; i++) {
            const address = branches[i].getElementsByTagName('address')[0].textContent;
            const contact = branches[i].getElementsByTagName('contact')[0].textContent;
            const openingHours = branches[i].getElementsByTagName('openingHours')[0].textContent;
  
            const listItem = document.createElement('li');
            listItem.innerHTML = `
              <p class="branch-address">${address}</p>
              <p class="branch-contact">${contact}</p>
              <p class="branch-opening-hours">${openingHours}</p>
              <p><a href="https://maps.google.com/maps?q=${encodeURIComponent(address)}" target="_blank" class="branch-map-link">View on Google Maps</a></p>
            `;
            branchList.appendChild(listItem);
          }
        })
        .catch(error => console.log(error));
  
      const contactForm = document.getElementById('contactForm');
      contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        alert('Message sent!');
        contactForm.reset();
      });

