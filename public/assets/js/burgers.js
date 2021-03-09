// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeEatBtn = document.querySelectorAll('.change-devour');

  if (changeEatBtn) {
    changeEatBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newEatenState = {
          devoured: true,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newEatenState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new burger
          if (response.ok) {
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  };

  // CREATE
  const createBurgerBtn = document.getElementById('create-form');

  // Set up the event listener for the create button
  if (createBurgerBtn) {
    createBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "burger_name"
      const newBurger = {
        burger_name: document.getElementById('newBurgerForm').value.trim(),
        devoured: false,
      };

      // Send POST request to create a new burger
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('newBurgerForm').value = '';

        // Reload the page so the user can see the new burger
        console.log('Ordered a new burger');
        location.reload();
      });
    });
  };

  // DELETE
  const deleteBurgerBtn = document.querySelectorAll('.delete-burger');


  // Set up the event listener for the delete button
  if (deleteBurgerBtn) {
    deleteBurgerBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        console.log(id);

        // Sends delete request
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((response) => {
          console.log(response);
          console.log(`Deleted burger: ${id}`);

          location.reload();
        });
      });
    });
  };
});