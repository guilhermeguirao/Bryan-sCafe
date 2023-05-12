function createMenuItem(name, price, description, image, isBeverage = false) {
    const menuItem = document.createElement('div');
    menuItem.className = 'card mb-3';
  
    const menuItemImage = document.createElement('img');
    menuItemImage.src = image;
    menuItemImage.alt = name;
    menuItemImage.className = 'card-img-top';
    menuItem.appendChild(menuItemImage);
  
    const menuItemDescription = document.createElement('div');
    menuItemDescription.className = 'card-body';

    if (isBeverage) {
      price.forEach((priceItem) => {
        const menuItemPrice = document.createElement('p');
        menuItemPrice.textContent = priceItem;
        menuItemPrice.className = 'card-price';
        menuItemDescription.appendChild(menuItemPrice);
      });
    } else {
      const menuItemPrice = document.createElement('p');
      menuItemPrice.textContent = price;
      menuItemPrice.className = 'card-price';
      menuItemDescription.appendChild(menuItemPrice);
    }
  
    const menuItemDescriptionText = document.createElement('p');
    menuItemDescriptionText.textContent = description;
    menuItemDescriptionText.className = 'card-text';
    menuItemDescription.appendChild(menuItemDescriptionText);
  
    menuItem.appendChild(menuItemDescription);
  
    return menuItem;
  }
  
  function isCoffeeOrHotChocolate(name) {
    const coffeeAndHotChocolates = ["Coffee and hot chocolates"];
    return coffeeAndHotChocolates.includes(name);
  }
  
  fetch('data/menu.xml')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');
  
    const mealsMenuItems = document.getElementById('mealsMenuItems');
    const meals = xmlDoc.getElementsByTagName('category')[0].getElementsByTagName('item');
  
    for (let i = 0; i < meals.length; i++) {
      const name = meals[i].getElementsByTagName('name')[0].textContent;
      const price = meals[i].getElementsByTagName('price')[0].textContent;
      const description = meals[i].getElementsByTagName('description')[0].textContent;
      const image = meals[i].getElementsByTagName('image')[0].textContent;
  
      const menuItem = createMenuItem(name, price, description, image);
      mealsMenuItems.appendChild(menuItem);
    }
  
    const coffeeHotChocolateItems = document.getElementById('coffeeHotChocolateItems');
    const otherBeveragesItems = document.getElementById('otherBeveragesItems');
    const beverages = xmlDoc.getElementsByTagName('category')[1].getElementsByTagName('item');
  
    for (let i = 0; i < beverages.length; i++) {
      const name = beverages[i].getElementsByTagName('name')[0].textContent;
      const prices = Array.from(beverages[i].getElementsByTagName('price')[0].getElementsByTagName('size')).map((node) => {
        return `${node.getAttribute('type')} .......... ${node.textContent}`;
      });
      const description = beverages[i].getElementsByTagName('description')[0].textContent;
      const image = beverages[i].getElementsByTagName('image')[0].textContent;
  
      const menuItem = createMenuItem(name, prices, description, image, true);
  
      if (isCoffeeOrHotChocolate(name)) {
        coffeeHotChocolateItems.appendChild(menuItem);
      } else {
        otherBeveragesItems.appendChild(menuItem);
      }
    }
  })
  .catch(error => console.error(error));
  